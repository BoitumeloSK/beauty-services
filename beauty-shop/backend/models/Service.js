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
		title: {
			type: DataTypes.STRING,
		},
		description: {
			type: DataTypes.STRING,
		},
		images: {
			type: DataTypes.STRING,
		},
		price: {
			type: DataTypes.DOUBLE(10, 2),
		},
		approved: {
			type: DataTypes.BOOLEAN,
			defaultValue: false,
		},
	},
	{
		freezeTableName: true,
	}
);
module.exports = Service;
