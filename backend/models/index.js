const User = require("./user");
const Service = require("./Service");
const Booking = require("./Booking");
const Slot = require("./Slot");
Service.belongsTo(User, { foreignKey: "UserId" });
User.hasMany(Service);

Booking.belongsTo(User, { foreignKey: "UserId" });
User.hasMany(Booking);

Booking.belongsTo(Service, { foreignKey: "ServiceId" });
Service.hasMany(Booking);

Slot.belongsTo(Service, { foreignKey: "ServiceId" });
Service.hasMany(Slot);

Slot.hasOne(Booking);
Booking.belongsTo(Slot, { foreignKey: "SlotId" });

module.exports = {
	User,
	Booking,
	Service,
	Slot,
};
