const { Slot, Service, Booking } = require("../models");
const moment = require("moment");
const JWT = require("jsonwebtoken");
require("dotenv").config();
function getAllServiceSlots(req, res) {
	const { id } = req.params;
	Slot.findAll({ where: { ServiceId: id } })
		.then((data) => {
			if (data.length == 0) {
				return res.status(400).json({
					success: false,
					error: "Service does not have slots or does not exist",
				});
			}
			return res.status(200).json({ success: true, data: data });
		})
		.catch((error) => {
			return res.status(400).json({ success: false, error: error });
		});
}

function unbookedSlots(req, res) {
	const { id } = req.params;
	Booking.findAll({ where: { ServiceId: id } }).then((data) => {
		Slot.findAll({ where: { ServiceId: id, booked: false } }).then((result) => {
			if (data.length == 0) {
				return res.status(200).json({ success: true, data: result });
			} else {
				let ids = [];
				data.forEach((x) => {
					ids.push(x.SlotId);
				});
				let bookingSlotIds = new Set(ids);
				let unbooked = result.filter((x) => !bookingSlotIds.has(x.id));
				return res.status(200).json({ success: true, data: unbooked });
			}
		});
	});
}
function createSlot(req, res) {
	const { ServiceId, startTime } = req.body;
	Slot.findAll({
		where: {
			ServiceId: ServiceId,
			startTime: moment(startTime, "YYYY-MM-DD HH:mm:ss").format(
				"YYYY-MM-DD HH:mm:ss"
			),
		},
	}).then((data) => {
		if (data.length > 0) {
			return res
				.status(400)
				.json({ success: false, error: "Service slot already created" });
		}

		Slot.create({
			ServiceId: ServiceId,
			startTime,
		})
			.then((data) => {
				return res.status(200).json({ success: true, data: data });
			})
			.catch((error) => {
				return res.status(400).json({ success: false, error: error });
			});
	});
}
function editSlot(req, res) {
	const { id } = req.params;
	const { startTime } = req.body;
	const { userId } = JWT.verify(req.cookies.access_token, process.env.SECRET);
	Slot.findAll({ where: { id } }).then((data) => {
		if (data.length == 0) {
			return res
				.status(400)
				.json({ success: false, error: "Time slot does not exist" });
		}
		Service.findAll({ where: { id: data[0].ServiceId } }).then((data) => {
			if (userId != data[0].UserId) {
				return res.status(400).json({ success: false, error: "Access denied" });
			}
			Slot.update({ startTime }, { where: { id }, individualHooks: true })
				.then((data) => {
					return res.status(200).json({ success: true, data: data });
				})
				.catch((error) => {
					return res.status(400).json({ success: false, error: error });
				});
		});
	});
}

function deleteSlot(req, res) {
	const { id } = req.params;
	const { userId } = JWT.verify(req.cookies.access_token, process.env.SECRET);
	Slot.findAll({ where: { id } }).then((data) => {
		if (data.length == 0) {
			return res
				.status(400)
				.json({ success: false, error: "Time slot does not exist" });
		}
		Service.findAll({ where: { id: data[0].ServiceId } }).then((data) => {
			if (userId != data[0].UserId) {
				return res.status(400).json({ success: false, error: "Access denied" });
			}
			Slot.destroy({ where: { id } })
				.then((data) => {
					return res.status(200).json({ success: true, data: data });
				})
				.catch((error) => {
					return res.status(400).json({ success: false, error: error });
				});
		});
	});
}

function deleteSlotsByService(req, res) {
	const { id } = req.params;
	const { userId } = JWT.verify(req.cookies.access_token, process.env.SECRET);
	Slot.findAll({ where: { ServiceId: id } }).then((data) => {
		if (data.length == 0) {
			return res
				.status(400)
				.json({ success: false, error: "Time slots not found" });
		}
		Service.findAll({ where: { id: data[0].ServiceId } }).then((data) => {
			if (userId != data[0].UserId) {
				return res.status(400).json({ success: false, error: "Access denied" });
			}
			Slot.destroy({ where: { ServiceId: id } })
				.then((data) => {
					return res.status(200).json({ success: true, data: data });
				})
				.catch((error) => {
					return res.status(400).json({ success: false, error: error });
				});
		});
	});
}
module.exports = {
	getAllServiceSlots,
	unbookedSlots,
	createSlot,
	editSlot,
	deleteSlot,
	deleteSlotsByService,
};
