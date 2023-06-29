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
      description: "This is a haircutting service",
      images: "images.png",
      price: 100,
      approved: false,
      UserId: 2,
    },
    {
      description: "This is a hairbraiding service",
      images: "images.png",
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
