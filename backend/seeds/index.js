const sequelize = require("../config/config");
const { User, Service, Booking, Slot } = require("../models");
const bcrypt = require("bcrypt");

sequelize.sync({ force: false }).then(async () => {
	const hash = await bcrypt.hash("test123", 10);
	await User.bulkCreate([
		{
			email: "customer@email.com",
			password: hash,
			name: "Customer",
			image: "image.png",
			about: "I am a customer",
			address: "23 Paris Road, CPT",
			role: "customer",
			isActive: true,
		},
		{
			email: "john@email.com",
			password: hash,
			name: "John",
			image: "image.png",
			about: "I am a customer",
			address: "23 Paris Road, CPT",
			role: "customer",
		},
		{
			email: "thami@email.com",
			password: hash,
			name: "Thami",
			image: "image.png",
			about: "I am a customer",
			address: "23 Paris Road, CPT",
			role: "customer",
		},
		{
			email: "provider@email.com",
			password: hash,
			name: "Provider",
			image: "image.png",
			about: "I am a service provider",
			address: "18 Durban Street, CPT",
			role: "provider",
			isActive: true,
		},
		{
			email: "jane@email.com",
			password: hash,
			name: "Jane's Studio",
			image:
				"https://res.cloudinary.com/dhrftaik2/image/upload/v1695548399/beauty-shop/Site%20Images/Elegant_Hair_and_Beauty_Business_Logo_dehwdn.png",
			about:
				"Discover the perfect fusion of style and artistry at our hair salon. From trendy haircuts to mesmerizing braids, we've got your unique look covered. Step in and let us turn your hair into a masterpiece that speaks to your style.",
			address: "18 Durban Street, CPT",
			role: "provider",
			isActive: true,
		},
		{
			email: "thandi@email.com",
			password: hash,
			name: "Thandi",
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
	]);

	await Service.bulkCreate([
		{
			category: "hair",
			title: "Pixie Haircut",
			description: "This is a haircutting service",
			images:
				"https://res.cloudinary.com/dhrftaik2/image/upload/c_crop/v1691516540/beauty-shop/Site%20Images/mehran-biabani-GOpYcd6Y7CM-unsplash_vl5w7v.jpg,https://res.cloudinary.com/dhrftaik2/image/upload/v1691700448/beauty-shop/Site%20Images/mohammadreza-babaei-nIp8LJKxntA-unsplash_kthtw5.jpg",
			price: 100,
			visible: true,
			UserId: 4,
		},
		{
			category: "hair",
			title: "Braiding by Jane",
			description: "This is a hairbraiding service",
			images:
				"https://res.cloudinary.com/dhrftaik2/image/upload/c_crop/v1691516873/beauty-shop/Site%20Images/gift-habeshaw-ptyj_QoPRsQ-unsplash-starbraids_g7tviz.jpg,https://res.cloudinary.com/dhrftaik2/image/upload/v1691492262/beauty-shop/Site%20Images/knotless_braids_d7c0qh.jpg,https://res.cloudinary.com/dhrftaik2/image/upload/v1691748547/beauty-shop/Site%20Images/high-bun_iw3ca6.jpg",
			price: 300,
			visible: true,
			UserId: 5,
		},
		{
			category: "skin",
			title: "Winter Facial Special",
			description: "This is a service for facials in winter.",
			images:
				"https://res.cloudinary.com/dhrftaik2/image/upload/v1691492825/beauty-shop/Site%20Images/karelys-ruiz-PqyzuzFiQfY-unsplash_qzlyyv.jpg",
			price: 300,
			visible: true,
			UserId: 4,
		},
		{
			category: "skin",
			title: "Facials by Jane",
			description: "This is a facials service",
			images:
				"https://res.cloudinary.com/dhrftaik2/image/upload/v1689847249/beauty-shop/Site%20Images/gxjtwiwzinfwzmlurzba.jpg,https://res.cloudinary.com/dhrftaik2/image/upload/v1691492700/beauty-shop/Site%20Images/emiliano-vittoriosi-qTu9DppC3mM-unsplash_hd0zm9.jpg,https://res.cloudinary.com/dhrftaik2/image/upload/v1691492816/beauty-shop/Site%20Images/reuben-mansell-nwOip8AOZz0-unsplash_xyngob.jpg",
			price: 300,
			visible: true,
			UserId: 5,
		},
		{
			category: "body",
			title: "Body Massages",
			description: "This is a body massages service",
			images:
				"https://res.cloudinary.com/dhrftaik2/image/upload/v1691493901/beauty-shop/Site%20Images/alan-caishan-cU53ZFBr3lk-unsplash_ikgsmy.jpg,https://res.cloudinary.com/dhrftaik2/image/upload/v1691493867/beauty-shop/Site%20Images/emiliano-vittoriosi-dsy_ILnH69A-unsplash_quchha.jpg,https://res.cloudinary.com/dhrftaik2/image/upload/v1691494415/beauty-shop/Site%20Images/engin-akyurt-SMwCQZWayj0-unsplash_vaditi.jpg",
			price: 300,
			visible: true,
			UserId: 6,
		},
		{
			category: "body",
			title: "Eyebrow Wax Parlour",
			description: "This is a parlour for eyebrow waxing",
			images:
				"https://res.cloudinary.com/dhrftaik2/image/upload/v1691493069/beauty-shop/Site%20Images/istockphoto-1219595426-612x612_mp5gmz.jpg,https://res.cloudinary.com/dhrftaik2/image/upload/v1691493067/beauty-shop/Site%20Images/eyebrow-wax_trfbwe.jpg",
			price: 300,
			visible: true,
			UserId: 6,
		},
	]);

	await Slot.bulkCreate([
		{
			ServiceId: 1,
			startTime: "2023-10-01 10:00",
			booked: false,
		},
		{
			ServiceId: 1,
			startTime: "2023-10-02 08:00",
			booked: false,
		},
		{
			ServiceId: 2,
			startTime: "2023-10-03 13:00",
			booked: true,
		},
		{
			ServiceId: 2,
			startTime: "2023-10-04 15:00",
			booked: true,
		},

		{
			ServiceId: 2,
			startTime: "2023-10-05 17:00",
			booked: true,
		},
		{
			ServiceId: 3,
			startTime: "2023-10-06 10:00",
			booked: false,
		},
		{
			ServiceId: 3,
			startTime: "2023-10-07 08:00",
			booked: false,
		},
		{
			ServiceId: 3,
			startTime: "2023-10-08 17:00",
			booked: true,
		},
		{
			ServiceId: 4,
			startTime: "2023-10-09 08:00",
			booked: false,
		},
		{
			ServiceId: 4,
			startTime: "2023-10-10 17:00",
			booked: true,
		},
		{
			ServiceId: 5,
			startTime: "2023-10-11 08:00",
			booked: false,
		},
		{
			ServiceId: 5,
			startTime: "2023-10-12 17:00",
			booked: true,
		},
		{
			ServiceId: 5,
			startTime: "2023-10-13 08:00",
			booked: false,
		},
		{
			ServiceId: 5,
			startTime: "2023-10-14 17:00",
			booked: true,
		},
		{
			ServiceId: 6,
			startTime: "2023-10-15 08:00",
			booked: false,
		},
		{
			ServiceId: 6,
			startTime: "2023-10-16 17:00",
			booked: true,
		},
		{
			ServiceId: 2,
			startTime: "2023-08-05 17:00",
			booked: true,
		},
		{
			ServiceId: 2,
			startTime: "2023-07-05 11:00",
			booked: true,
		},
	]);

	await Booking.bulkCreate([
		{
			UserId: 4,
			ServiceId: 2,
			SlotId: 1,
			fulfilled: false,
			totalPaid: 300,
		},
		{
			UserId: 4,
			ServiceId: 2,
			SlotId: 2,
			fulfilled: false,
			totalPaid: 300,
		},
		{
			UserId: 5,
			ServiceId: 2,
			SlotId: 5,
			fulfilled: true,
			totalPaid: 300,
		},
		{
			UserId: 5,
			ServiceId: 2,
			SlotId: 17,
			fulfilled: true,
			totalPaid: 120,
		},
		{
			UserId: 5,
			ServiceId: 2,
			SlotId: 18,
			fulfilled: true,
			totalPaid: 150,
		},
	]);
});
