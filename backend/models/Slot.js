const { DataTypes } = require("sequelize");
const sequelize = require("../config/config");
const Service = require("./Service");
const Slot = sequelize.define(
	"Slot",
	{
		ServiceId: {
			type: DataTypes.INTEGER,
			references: {
				model: Service,
				key: "id",
			},
			allowNull: false,
		},
		booked: {
			type: DataTypes.BOOLEAN,
			defaultValue: false,
		},
		startTime: {
			type: DataTypes.DATE,
		},
	},
	{
		freezeTableName: true,
		hooks: {
			beforeUpdate: async (instance) => {
				console.log("hey");
				const startTime = instance.startTime;
				const newTime = await add2hours(startTime);
				instance.startTime = newTime;
			},
			beforeCreate: async (instance) => {
				const startTime = instance.startTime;
				const newTime = await add2hours(startTime);
				instance.startTime = newTime;
			},
		},
	}
);
async function add2hours(startTime) {
	console.log("add2hours function called with startTime:", startTime);
	const newStartTime = new Date(startTime);
	newStartTime.setHours(newStartTime.getHours() + 2);
	return newStartTime;
}
module.exports = Slot;
