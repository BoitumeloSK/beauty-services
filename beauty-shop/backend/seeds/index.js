const sequelize = require("../config/config");
const { User, Service, Booking } = require("../models");
const bcrypt = require("bcrypt");

sequelize.sync({ force: false }).then(async () => {
	const hash = await bcrypt.hash("test123", 10);
	await User.bulkCreate([
		{
			email: "customer@email.com",
			password: hash,
			firstName: "Customer",
			lastName: "Customer",
			image: "image.png",
			about: "I am a customer",
			address: "23 Paris Road, CPT",
			role: "customer",
			isActive: true,
		},
		{
			email: "provider@email.com",
			password: hash,
			firstName: "Provider",
			lastName: "Provider",
			image: "image.png",
			about: "I am a service provider",
			address: "18 Durban Street, CPT",
			role: "provider",
			isActive: true,
		},
		{
			email: "admin@email.com",
			password: hash,
			firstName: "Admin",
			lastName: "Admin",
			image: "image.png",
			about: "I am an admin",
			address: "18 Durban Street, CPT",
			role: "admin",
			isActive: true,
		},
		{
			email: "doe@email.com",
			password: hash,
			firstName: "John",
			lastName: "Doe",
			image: "image.png",
			about: "I am a customer",
			address: "23 Paris Road, CPT",
			role: "customer",
		},
		{
			email: "cena@email.com",
			password: hash,
			firstName: "John",
			lastName: "Cena",
			image: "image.png",
			about: "I am a customer",
			address: "23 Paris Road, CPT",
			role: "customer",
		},
	]);

	await Service.bulkCreate([
		{
			title: "Haircut",
			description: "This is a haircutting service",
			images:
				"http://res.cloudinary.com/dhrftaik2/image/upload/v1688577706/beauty-shop/s8rwkqfjdefjr66hwrei.png",
			price: 100,
			approved: false,
			UserId: 2,
		},
		{
			title: "Braiding",
			description: "This is a hairbraiding service",
			images:
				"http://res.cloudinary.com/dhrftaik2/image/upload/v1688577741/beauty-shop/n1qq5npy7spnoboif8ws.png",
			price: 300,
			approved: true,
			UserId: 2,
		},
	]);

	await Booking.bulkCreate([
		{
			UserId: 4,
			ServiceId: 2,
			bookingDate: "2023-05-05",
			fulfilled: false,
			totalPaid: 300,
		},
		{
			UserId: 4,
			ServiceId: 2,
			bookingDate: "2023-05-05",
			fulfilled: false,
			totalPaid: 300,
		},
		{
			UserId: 1,
			ServiceId: 2,
			bookingDate: "2023-05-05",
			fulfilled: false,
			totalPaid: 300,
		},
		{
			UserId: 1,
			ServiceId: 2,
			bookingDate: "2023-05-05",
			fulfilled: false,
			totalPaid: 300,
		},
		{
			UserId: 5,
			ServiceId: 2,
			bookingDate: "2023-05-05",
			fulfilled: false,
			totalPaid: 300,
		},
	]);
});
