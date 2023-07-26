const {
	getAllBookings,
	getBookingById,
	getFulfilledBookings,
	getUnfulfilledBookings,
	getUserBookings,
	createBooking,
	completeBooking,
	rescheduleBooking,
	deleteBooking,
} = require("../controllers/booking-controller");
const { auth } = require("../middleware/auth");
const router = require("express").Router();

router.get("/", getAllBookings);
router.get("/:id", getBookingById);
router.get("/completed/list", getFulfilledBookings);
router.get("/incomplete/list", getUnfulfilledBookings);
router.get("/mybookings/list", getUserBookings);
router.post("/", auth, createBooking);
router.put("/complete/:id", auth, completeBooking);
router.put("/reschedule/:id", auth, rescheduleBooking);
router.delete("/:id", auth, deleteBooking);

module.exports = router;
