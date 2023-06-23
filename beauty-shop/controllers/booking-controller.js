const { Booking, Service } = require("../models");
const JWT = require("jsonwebtoken");
require("dotenv").config();

function getAllBookings(req, res) {
  Booking.findAll()
    .then((data) => {
      return res.status(200).json({ success: false, data: data });
    })
    .catch((error) => {
      return res.status(400).json({ success: false, error: error });
    });
}

function getBookingById(req, res) {
  const { id } = req.params;
  Booking.findAll({ where: { id } })
    .then((data) => {
      if (data.length == 0) {
        return res
          .status(400)
          .json({ success: false, error: "Booking does not exist" });
      }
      return res.status(200).json({ success: false, data: data });
    })
    .catch((error) => {
      return res.status(400).json({ success: false, error: error });
    });
}

function getUserBookings(req, res) {
  const { userId } = JWT.verify(req.header("token"), process.env.SECRET);
  Booking.findAll({ where: { UserId: userId } })
    .then((data) => {
      if (data.length == 0) {
        return res
          .status(400)
          .json({ success: false, error: "No bookings found for user" });
      }
      return res.status(200).json({ success: false, data: data });
    })
    .catch((error) => {
      return res.status(400).json({ success: false, error: error });
    });
}

function getFulfilledBookings(req, res) {
  Booking.findAll({ where: { fulfilled: true } })
    .then((data) => {
      if (data.length == 0) {
        return res
          .status(400)
          .json({ success: false, error: "No fulfilled bookings found" });
      }
      return res.status(200).json({ success: false, data: data });
    })
    .catch((error) => {
      return res.status(400).json({ success: false, error: error });
    });
}

function getUnfulfilledBookings(req, res) {
  Booking.findAll({ where: { fulfilled: false } })
    .then((data) => {
      if (data.length == 0) {
        return res
          .status(400)
          .json({ success: false, error: "No unfulfilled bookings found" });
      }
      return res.status(200).json({ success: false, data: data });
    })
    .catch((error) => {
      return res.status(400).json({ success: false, error: error });
    });
}

function createBooking(req, res) {
  const { ServiceId } = req.body;
  const { userId } = JWT.verify(req.header("token"), process.env.SECRET);
  let totalPaid = 0;
  Service.findAll({ where: { id: ServiceId } }).then((data) => {
    if (data.length == 0) {
      return res
        .status(400)
        .json({ success: false, error: "Service does not exist" });
    }
    if (userId == data[0].UserId) {
      return res
        .status(400)
        .json({ success: false, error: "Cannot book own service" });
    }
    if (data[0].approved == false) {
      return res
        .status(400)
        .json({ success: false, error: "Cannot book service" });
    }
    totalPaid = data[0].price;

    Booking.findAll({ where: { ServiceId } }).then((data) => {
      const incompleteBookings = data.filter((x) => x.fulfilled == false);
      if (incompleteBookings.length == 5) {
        return res.status(400).json({
          success: false,
          error: "Service has a max of 5 unfulfilled bookings",
        });
      }

      Booking.findAll({ where: { UserId: userId } }).then((data) => {
        const incompleteBookings = data.filter((x) => x.fulfilled == false);
        if (incompleteBookings.length == 2) {
          return res.status(400).json({
            success: false,
            error: "User has a max of 2 unfulfilled bookings",
          });
        }
        Booking.create({
          totalPaid,
          ServiceId,
          UserId: userId,
        })
          .then((data) => {
            return res.status(200).json({ success: false, data: data });
          })
          .catch((error) => {
            return res.status(400).json({ success: false, error: error });
          });
      });
    });
  });
}

function updateBooking(req, res) {
  const { id } = req.params;
  const { fulfilled, bookingDate } = req.body;
  const { userId } = JWT.verify(req.header("token"), process.env.SECRET);
  let canUpdate = false;
  let updates = {};

  Booking.findAll({ where: { id } }).then((data) => {
    if (data.length == 0) {
      return res
        .status(400)
        .json({ success: false, error: "Booking does not exist" });
    }

    if (userId == data[0].UserId) {
      canUpdate = true;
    }

    Service.findAll({ where: { id: data[0].ServiceId } }).then((data) => {
      if (userId == data[0].UserId) {
        canUpdate = true;
      }

      if (!canUpdate) {
        return res.status(400).json({
          success: false,
          error: "Not authorised to make change to booking",
        });
      }

      if (fulfilled) {
        updates["fulfilled"] = fulfilled;
      }
      if (bookingDate) {
        updates["bookingDate"] = bookingDate;
      }

      Booking.update(updates, { where: { id } })
        .then((data) => {
          return res.status(200).json({ success: false, data: data });
        })
        .catch((error) => {
          return res.status(400).json({ success: false, error: error });
        });
    });
  });
}

function deleteBooking(req, res) {
  const { userId } = JWT.verify(req.header("token"), process.env.SECRET);
  const { id } = req.params;
  Booking.findAll({ where: { id } }).then((data) => {
    if (data.length == 0) {
      return res
        .status(400)
        .json({ success: false, error: "Booking does not exist" });
    }
    if (userId != data[0].UserId) {
      return res
        .status(400)
        .json({ success: false, error: "Not authorised to delete booking" });
    }
    Booking.destroy({ where: { id } })
      .then((data) => {
        return res.status(200).json({ success: false, data: data });
      })
      .catch((error) => {
        return res.status(400).json({ success: false, error: error });
      });
  });
}

module.exports = {
  getAllBookings,
  getBookingById,
  getFulfilledBookings,
  getUnfulfilledBookings,
  getUserBookings,
  createBooking,
  updateBooking,
  deleteBooking,
};
