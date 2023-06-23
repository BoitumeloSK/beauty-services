const sequelize = require("../config/config");
const User = require("./user");
const Service = require("./Service");
const { DataTypes } = require("sequelize");
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
    bookingDate: {
      type: DataTypes.DATE,
    },
    totalPaid: {
      type: DataTypes.DOUBLE(10, 2),
    },
    fulfilled: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    freezeTableName: true,
  }
);
module.exports = Booking;
