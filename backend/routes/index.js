const router = require("express").Router();
const userRoutes = require("./user-routes");
const serviceRoutes = require("./service-routes");
const bookingRoutes = require("./booking-routes");
const slotRoutes = require("./slot-routes");

router.use("/users", userRoutes);
router.use("/services", serviceRoutes);
router.use("/bookings", bookingRoutes);
router.use("/slots", slotRoutes);

module.exports = router;
