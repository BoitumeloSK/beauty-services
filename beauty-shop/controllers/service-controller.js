const { Service } = require("../models");
const JWT = require("jsonwebtoken");
require("dotenv").config();

function getAllServices(req, res) {
  Service.findAll()
    .then((data) => {
      return res.status(200).json({ success: true, data: data });
    })
    .catch((error) => {
      return res.status(400).json({ success: false, error: error });
    });
}

function getService(req, res) {
  const { id } = req.params;
  Service.findAll({ where: { id } })
    .then((data) => {
      if (data.length == 0) {
        return res
          .status(400)
          .json({ success: false, error: "Service does not exist" });
      }
      return res.status(200).json({ success: true, data: data });
    })
    .catch((error) => {
      return res.status(400).json({ success: false, error: error });
    });
}

function getApprovedServices(req, res) {
  Service.findAll({ where: { approved: true } })
    .then((data) => {
      if (data.length == 0) {
        return res
          .status(400)
          .json({ success: false, error: "No approved services found" });
      }
      return res.status(200).json({ success: true, data: data });
    })
    .catch((error) => {
      return res.status(400).json({ success: false, error: error });
    });
}

function getUserServices(req, res) {
  const { userId } = JWT.verify(req.header("token"), process.env.SECRET);
  Service.findAll({ where: { UserId: userId } })
    .then((data) => {
      if (data.length == 0) {
        return res
          .status(400)
          .json({ success: false, error: "No services found" });
      }
      return res.status(200).json({ success: true, data: data });
    })
    .catch((error) => {
      return res.status(400).json({ success: false, error: error });
    });
}

function createService(req, res) {
  const { description, images, price, approved } = req.body;
  const { userId } = JWT.verify(req.header("token"), process.env.SECRET);
  Service.findAll({ where: { description, UserId: userId } }).then((data) => {
    if (data.length > 0) {
      return res.status(400).json({
        success: false,
        error: "You have already posted this service",
      });
    }
    Service.create({ description, images, price, approved, UserId: userId })
      .then((data) => {
        return res.status(200).json({ success: true, data: data });
      })
      .catch((error) => {
        return res.status(400).json({ success: false, error: error });
      });
  });
}

function updateService(req, res) {
  const { id } = req.params;
  const { description, images, price, approved } = req.body;
  const updates = {};
  Service.findAll({ where: { id } }).then((data) => {
    if (data.length == 0) {
      return res
        .status(400)
        .json({ success: false, error: "Service does not exist" });
    } else {
      const { userId } = JWT.verify(req.header("token"), process.env.SECRET);

      if (data[0].UserId != userId) {
        return res.status(400).json({
          success: false,
          error: "Not authorised to make chnages to this service",
        });
      }

      if (description) {
        updates["description"] = description;
      }
      if (images) {
        updates["images"] = images;
      }
      if (price) {
        updates["price"] = price;
      }
      if (approved) {
        updates["approved"] = approved;
      }

      Service.update(updates, { where: { id } })
        .then((data) => {
          return res.status(200).json({ success: true, data: data });
        })
        .catch((error) => {
          return res.status(400).json({ success: false, error: error });
        });
    }
  });
}

function deleteService(req, res) {
  const { id } = req.params;
  Service.findAll({ where: { id } }).then((data) => {
    if (data.length == 0) {
      return res
        .status(400)
        .json({ success: false, error: "Service does not exist" });
    } else {
      const { userId } = JWT.verify(req.header("token"), process.env.SECRET);

      if (data[0].id != userId) {
        return res.status(400).json({
          success: false,
          error: "Not authorised to delete this service",
        });
      }

      Service.destroy({ where: { id } })
        .then((data) => {
          return res.status(200).json({ success: true, data: data });
        })
        .catch((error) => {
          return res.status(400).json({ success: false, error: error });
        });
    }
  });
}

module.exports = {
  getAllServices,
  getApprovedServices,
  getService,
  getUserServices,
  createService,
  updateService,
  deleteService,
};
