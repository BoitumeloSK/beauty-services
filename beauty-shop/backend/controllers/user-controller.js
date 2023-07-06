const { User } = require("../models");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
require("dotenv").config();

function getAllUsers(req, res) {
  User.findAll()
    .then((data) => {
      return res.status(200).json({ success: true, data: data });
    })
    .catch((error) => {
      return res.status(400).json({ success: false, error: error });
    });
}

function getUserById(req, res) {
  const { id } = req.params;
  User.findAll({ where: { id } })
    .then((data) => {
      if (data.length == 0) {
        return res
          .status(400)
          .json({ success: false, error: `User with id ${id} does not exist` });
      }
      return res.status(200).json({ success: true, data: data });
    })
    .catch((error) => {
      return res.status(400).json({ success: false, error: error });
    });
}

function signup(req, res) {
  const {
    email,
    password,
    firstName,
    lastName,
    image,
    about,
    address,
    confirmPassword,
  } = req.body;
  User.findAll({ where: { email } }).then(async (data) => {
    if (data.length > 0) {
      return res
        .status(400)
        .json({ success: false, error: "Email not available" });
    }
    if (password != confirmPassword) {
      return res.status(400).json({
        success: false,
        error: "Password and confirm password do not match.",
      });
    }
    const hash = await bcrypt.hash(password, 10);
    User.create({
      email,
      password: hash,
      firstName,
      lastName,
      image,
      about,
      address,
    })
      .then((data) => {
        return res.status(200).json({ success: true, data: data });
      })
      .catch((error) => {
        return res.status(400).json({ success: false, error: error });
      });
  });
}

function login(req, res) {
  const { email, password } = req.body;
  User.findAll({ where: { email } }).then(async (data) => {
    if (data.length == 0) {
      return res
        .status(400)
        .json({ success: false, error: "Invalid credential" });
    }

    if (!data[0].isActive) {
      return res
        .status(400)
        .json({ success: false, error: "Invalid credentials" });
    }
    const match = await bcrypt.compare(password, data[0].password);

    if (!match) {
      return res
        .status(400)
        .json({ success: false, error: "Invalid credentials" });
    }

    const token = JWT.sign(
      { userId: data[0].id, role: data[0].role },
      process.env.SECRET,
      { expiresIn: "10h" }
    );

    return res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json({ success: true, data: data });
  });
}

function logout(req, res) {
  return res.clearCookie("access_token").json("Cookie cleared.");
}

function updateUser(req, res) {
  const { id } = req.params;
  const { firstName, lastName, image, about, address } = req.body;
  const updates = {};
  User.findAll({ where: { id } }).then((data) => {
    if (data.length == 0) {
      return res
        .status(400)
        .json({ success: false, error: "User does not exist" });
    }
    const { userId } = JWT.verify(req.cookies.access_token, process.env.SECRET);
    if (id != userId) {
      return res.status(400).json({
        success: false,
        error: "Not authorised to makes changes to user",
      });
    } else {
      if (firstName) {
        updates["firstName"] = firstName;
      }
      if (lastName) {
        updates["lastName"] = lastName;
      }
      if (image) {
        updates["image"] = image;
      }
      if (about) {
        updates["about"] = about;
      }
      if (address) {
        updates["address"] = address;
      }

      User.update(updates, { where: { id } })
        .then((data) => {
          return res.status(200).json({ success: true, data: data });
        })
        .catch((error) => {
          return res.status(400).json({ success: false, error: error });
        });
    }
  });
}

function updateRole(req, res) {
  const { id } = req.params;
  const { role } = req.body;

  User.findAll({ where: { id } }).then((data) => {
    if (data.length == 0) {
      return res
        .status(400)
        .json({ success: false, error: "User does not exist" });
    }
    const { role } = JWT.verify(req.cookies.access_token, process.env.SECRET);

    if (role != "admin") {
      return res.status(400).json({ success: false, error: "Access denied" });
    }

    User.update({ role: role }, { where: { id } })
      .then((data) => {
        return res.status(200).json({ success: true, data: data });
      })
      .catch((error) => {
        return res.status(400).json({ success: false, error: error });
      });
  });
}

function updatePassword(req, res) {
  const { id } = req.params;
  const { password, confirmPassword } = req.body;
  User.findAll({ where: { id } }).then(async (data) => {
    if (data.length == 0) {
      return res
        .status(400)
        .json({ success: false, error: "User does not exist" });
    }
    const { userId } = JWT.verify(req.cookies.access_token, process.env.SECRET);

    if (id != userId) {
      return res.status(400).json({
        success: false,
        error: "Not authorised to makes change to user password",
      });
    }

    if (password != confirmPassword) {
      return res.status(400).json({
        success: false,
        error: "Password and Confirm Password do not match",
      });
    }
    const hash = await bcrypt.hash(password, 10);
    User.update({ password: hash }, { where: { id } })
      .then((data) => {
        return res.status(200).json({ success: true, data: data });
      })
      .catch((error) => {
        return res.status(400).json({ success: false, error: error });
      });
  });
}

function deleteUser(req, res) {
  const { id } = req.params;
  User.findAll({ where: { id } }).then(async (data) => {
    if (data.length == 0) {
      return res
        .status(400)
        .json({ success: false, error: "User does not exist" });
    }
    const { userId } = JWT.verify(req.cookies.access_token, process.env.SECRET);

    if (id != userId) {
      return res.status(400).json({
        success: false,
        error: "Not authorised to makes change to user password",
      });
    }

    User.update({ isActive: false }, { where: { id } })
      .then((data) => {
        return res
          .status(200)
          .json({ success: true, data: data })
          .clearCookie("access_token");
      })
      .catch((error) => {
        return res.status(400).json({ success: false, error: error });
      });
  });
}

module.exports = {
  getAllUsers,
  getUserById,
  signup,
  login,
  logout,
  updateUser,
  updatePassword,
  updateRole,
  deleteUser,
};
