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
			type: DataTypes.DATE,
		},
		endTime: {
			type: DataTypes.DATE,
		},
	},
	{
		freezeTableName: true,
		hooks: {
			beforeCreate: async (instance) => {
				const startTime = instance.startTime;
				const endTime = await addHour(startTime);
				instance.endTime = endTime;
			},
		},
	}
);
async function addHour(startTime) {
	// const [date, time] = startTime.split(" ");
	// const [hours, minutes, seconds] = time.split(":");
	// const newHours = (Number(hours) + 1).toString().padStart(2, "0");
	// return `${date} ${newHours}:${minutes}:${seconds}`;
	const newStartTime = new Date(startTime);
	newStartTime.setHours(newStartTime.getHours() + 1);
	return newStartTime;
}
module.exports = Slot;
