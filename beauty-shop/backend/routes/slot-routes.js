const {
	getAllServiceSlots,
	createSlot,
	editSlot,
	deleteSlot,
} = require("../controllers/slot-controller");
const router = require("express").Router();
router.get("/:id", getAllServiceSlots);
router.post("/", createSlot);
router.put("/:id", editSlot);
router.delete("/:id", deleteSlot);
module.exports = router;
