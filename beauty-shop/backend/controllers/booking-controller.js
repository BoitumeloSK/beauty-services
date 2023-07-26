const { Booking, Service, Slot } = require("../models");
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
	Booking.findAll({ where: { id }, include: [{ model: Service }] })
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
	const { userId } = JWT.verify(req.cookies.access_token, process.env.SECRET);
	Booking.findAll({ where: { UserId: userId }, include: [{ model: Service }] })
		.then((data) => {
			if (data.length == 0) {
				return res
					.status(400)
					.json({ success: false, error: "No bookings found for user" });
			}
			return res.status(200).json({ success: true, data: data });
		})
		.catch((error) => {
			return res.status(400).json({ success: false, error: error });
		});
}

function getProviderBookings(req, res) {
	const { userId } = JWT.verify(req.cookies.access_token, process.env.SECRET);
	Booking.findAll({ include: [{ model: Service }] })
		.then((data) => {
			const providerBookings = data.filter((x) => x.Service.Userid == userId);
			if (providerBookings.length == 0) {
				return res.status(400).json({
					success: false,
					error: "No bookings made for posted services yet",
				});
			}
			return res.status(200).json({ success: true, data: providerBookings });
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
			return res.status(200).json({ success: true, data: data });
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
	const { ServiceId, SlotId } = req.body;
	const { userId } = JWT.verify(req.cookies.access_token, process.env.SECRET);
	Service.findAll({ where: { id: ServiceId } }).then((result) => {
		if (result.length == 0) {
			return res
				.status(400)
				.json({ success: false, error: "Service does not exist" });
		}
		if (userId == result[0].UserId) {
			return res
				.status(400)
				.json({ success: false, error: "Cannot book own service" });
		}
		Booking.findAll({ where: { ServiceId } }).then((data) => {
			const incompleteBookings = data.filter((x) => x.fulfilled == false);
			if (incompleteBookings.length >= 5) {
				return res.status(400).json({
					success: false,
					error: "Service has a max of 5 unfulfilled bookings",
				});
			}
			Booking.findAll({ where: { UserId: userId } }).then((data) => {
				const incompleteBookings = data.filter((x) => x.fulfilled == false);
				if (incompleteBookings.length >= 2) {
					return res.status(400).json({
						success: false,
						error: "User has a max of 2 unfulfilled bookings",
					});
				}
				Booking.findAll({ where: { SlotId } }).then((data) => {
					if (data.length > 0) {
						return res.status(400).json({
							success: false,
							error: "Slot already booked",
						});
					}
					Slot.update({ booked: true }, { where: { id: SlotId } }).then(
						(data) => {
							Booking.create({
								SlotId,
								ServiceId,
								UserId: userId,
							})
								.then((data) => {
									return res.status(200).json({ success: true, data: data });
								})
								.catch((error) => {
									return res.status(400).json({ success: false, error: error });
								});
						}
					);
				});
			});
		});
	});
}

function rescheduleBooking(req, res) {
	const { id } = req.params;
	const { SlotId } = req.body;
	const { userId } = JWT.verify(req.cookies.access_token, process.env.SECRET);
	Booking.findAll({ where: { id } }).then((data) => {
		if (data.length == 0) {
			return res
				.status(400)
				.json({ success: false, error: "Booking does not exist" });
		}
		if (userId != data[0].UserId) {
			return res.status(400).json({
				success: false,
				error: "Not authorised to make change to booking",
			});
		}
		Slot.update({ booked: false }, { where: { id: data[0].SlotId } }).then(
			(data) => {
				Slot.update({ booked: true }, { where: { id: SlotId } }).then(
					(data) => {
						Booking.update({ SlotId }, { where: { id } })
							.then((data) => {
								return res.status(200).json({ success: true, data: data });
							})
							.catch((error) => {
								return res.status(400).json({ success: false, error: error });
							});
					}
				);
			}
		);
	});
}

function completeBooking(req, res) {
	const { id } = req.params;
	const { fulfilled } = req.body;
	const { userId } = JWT.verify(req.cookies.access_token, process.env.SECRET);

	Booking.findAll({ where: { id } }).then((data) => {
		if (data.length == 0) {
			return res
				.status(400)
				.json({ success: false, error: "Booking does not exist" });
		}
		Service.findAll({ where: { id: data[0].ServiceId } }).then((data) => {
			if (userId != data[0].UserId) {
				return res.status(400).json({
					success: false,
					error: "Not authorised to make change to booking",
				});
			}

			Booking.update({ fulfilled }, { where: { id } })
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
	const { userId } = JWT.verify(req.cookies.access_token, process.env.SECRET);
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
		Slot.update({ booked: false }, { where: { id: data[0].SlotId } }).then(
			(data) => {
				Booking.destroy({ where: { id } })
					.then((data) => {
						return res.status(200).json({ success: false, data: data });
					})
					.catch((error) => {
						return res.status(400).json({ success: false, error: error });
					});
			}
		);
	});
}

module.exports = {
	getAllBookings,
	getBookingById,
	getFulfilledBookings,
	getUnfulfilledBookings,
	getUserBookings,
	getProviderBookings,
	createBooking,
	completeBooking,
	rescheduleBooking,
	deleteBooking,
};
