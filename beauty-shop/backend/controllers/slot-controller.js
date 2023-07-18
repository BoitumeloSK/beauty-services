const { Slot, Service } = require("../models");
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

function createSlot(req, res) {
	const { ServiceId, startTime } = req.body;
	Slot.findAll({ where: { ServiceId: ServiceId, startTime: startTime } }).then(
		(data) => {
			if (data.length > 0) {
				return res
					.status(400)
					.json({ success: false, error: "Service slot already created" });
			}
			Slot.create({ ServiceId: ServiceId, startTime: startTime })
				.then((data) => {
					return res.status(200).json({ success: true, data: data });
				})
				.catch((error) => {
					return res.status(400).json({ success: false, error: error });
				});
		}
	);
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
			Slot.update({ startTime }, { where: { id } })
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
module.exports = { getAllServiceSlots, createSlot, editSlot, deleteSlot };
