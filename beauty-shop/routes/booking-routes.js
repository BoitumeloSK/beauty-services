const {
  getAllBookings,
  getBookingById,
  getFulfilledBookings,
  getUnfulfilledBookings,
  getUserBookings,
  createBooking,
  updateBooking,
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
router.put("/:id", auth, updateBooking);
router.delete("/:id", auth, deleteBooking);

module.exports = router;
