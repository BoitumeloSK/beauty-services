const {
	getAllServiceSlots,
	unbookedSlots,
	createSlot,
	editSlot,
	deleteSlot,
	deleteSlotsByService,
} = require("../controllers/slot-controller");
const router = require("express").Router();
router.get("/:id", getAllServiceSlots);
router.get("/unbookedSlots/:id", unbookedSlots);
router.post("/", createSlot);
router.put("/:id", editSlot);
router.delete("/:id", deleteSlot);
router.delete("/service/:id", deleteSlotsByService);
module.exports = router;
