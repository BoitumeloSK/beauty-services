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

function getServicesByCategory(req, res) {
	const { category } = req.params;
	Service.findAll({ where: { category, visible: true } })
		.then((data) => {
			if (data.length == 0) {
				return res.status(400).json({
					success: false,
					error: "This category has no services right now",
				});
			}
			return res.status(200).json({ success: true, data: data });
		})
		.catch((error) => {
			return res.status(400).json({ success: false, error: error });
		});
}

function getVisibleServices(req, res) {
	Service.findAll({ where: { visible: true } })
		.then((data) => {
			if (data.length == 0) {
				return res
					.status(400)
					.json({ success: false, error: "No visible services found" });
			}
			return res.status(200).json({ success: true, data: data });
		})
		.catch((error) => {
			return res.status(400).json({ success: false, error: error });
		});
}

function getUserServices(req, res) {
	const { id } = req.params;
	Service.findAll({ where: { UserId: id } })
		.then((data) => {
			const { userId } = JWT.verify(
				req.cookies.access_token,
				process.env.SECRET
			);
			if (userId != id) {
				return res.status(400).json({ success: false, error: "Access denied" });
			}
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
	const { title, description, images, price, visible } = req.body;
	const { userId } = JWT.verify(req.cookies.access_token, process.env.SECRET);
	Service.findAll({ where: { description, UserId: userId } }).then((data) => {
		if (data.length > 0) {
			return res.status(400).json({
				success: false,
				error: "You have already posted this service",
			});
		}
		Service.create({
			title,
			description,
			images,
			price,
			visible,
			UserId: userId,
		})
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
	const { title, description, images, price, visible } = req.body;
	const updates = {};
	Service.findAll({ where: { id } }).then((data) => {
		if (data.length == 0) {
			return res
				.status(400)
				.json({ success: false, error: "Service does not exist" });
		} else {
			const { userId } = JWT.verify(
				req.cookies.access_token,
				process.env.SECRET
			);

			if (data[0].UserId != userId) {
				return res.status(400).json({
					success: false,
					error: "Not authorised to make chnages to this service",
				});
			}

			if (title) {
				updates["title"] = title;
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
			if (visible) {
				updates["visible"] = visible;
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
			const { userId } = JWT.verify(
				req.cookies.access_token,
				process.env.SECRET
			);

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
	getVisibleServices,
	getServicesByCategory,
	getService,
	getUserServices,
	createService,
	updateService,
	deleteService,
};
