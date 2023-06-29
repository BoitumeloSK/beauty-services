const User = require("./user");
const Service = require("./Service");
const Booking = require("./Booking");
const sequelize = require("../config/config");

Service.belongsTo(User, { foreignKey: "UserId" });
User.hasMany(Service, { foreignKey: "UserId" });

Booking.belongsTo(User, { foreignKey: "UserId" });
User.hasMany(Booking, { foreignKey: "UserId" });

Booking.belongsTo(Service, { foreignKey: "ServiceId" });
Service.hasMany(Booking, { foreignKey: "ServiceId" });

module.exports = {
  User,
  Booking,
  Service,
};
