const { DataTypes } = require("sequelize");
const sequelize = require("../config/config");
const User = require("./user");
const Service = sequelize.define(
	"Service",
	{
		UserId: {
			type: DataTypes.INTEGER,
			references: {
				model: User,
				key: "id",
			},
			allowNull: false,
		},
		category: {
			type: DataTypes.STRING,
		},
		title: {
			type: DataTypes.STRING,
		},
		description: {
			type: DataTypes.STRING,
		},
		images: {
			type: DataTypes.TEXT,
		},
		price: {
			type: DataTypes.DOUBLE(10, 2),
		},
		visible: {
			type: DataTypes.BOOLEAN,
		},
	},
	{
		freezeTableName: true,
	}
);
module.exports = Service;
