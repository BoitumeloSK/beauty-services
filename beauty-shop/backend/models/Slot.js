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
		startTime: {
			type: DataTypes.TIME,
		},
		endTime: {
			type: DataTypes.TIME,
			// set() {
			// 	const startTime = this.getDataValue("startTime");
			// 	let updated = startTime.split(":");
			// 	updated[0] = (Number(updated[0]) + 1).toString();
			// 	updated = updated.join(":");
			// 	this.setDataValue("endTime", updated);
			// },
		},
	},
	{
		freezeTableName: true,
		hooks: {
			beforeCreate: (instance) => {
				const startTime = instance.startTime;
				const endTime = addHour(startTime);
				instance.endTime = endTime;
			},
		},
	}
);
function addHour(startTime) {
	const [hours, minutes] = startTime.split(":");
	const newHours = (Number(hours) + 1).toString().padStart(2, "0");
	return `${newHours}:${minutes}`;
}
module.exports = Slot;
