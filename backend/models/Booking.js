const sequelize = require("../config/config");
const User = require("./user");
const Service = require("./Service");
const { DataTypes } = require("sequelize");
const Slot = require("./Slot");
const Booking = sequelize.define(
	"Booking",
	{
		UserId: {
			type: DataTypes.INTEGER,
			references: {
				model: User,
				key: "id",
			},
			allowNull: false,
		},
		ServiceId: {
			type: DataTypes.INTEGER,
			references: {
				model: Service,
				key: "id",
			},
			allowNull: false,
		},
		SlotId: {
			type: DataTypes.INTEGER,
			references: {
				model: Slot,
				key: "id",
			},
			allowNull: false,
		},
		totalPaid: {
			type: DataTypes.DOUBLE(10, 2),
			defaultValue: 0.0,
		},
		fulfilled: {
			type: DataTypes.BOOLEAN,
			defaultValue: false,
		},
	},
	{
		freezeTableName: true,
		timestamps: true,
	}
);
module.exports = Booking;
