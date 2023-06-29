const {
  getAllServices,
  getApprovedServices,
  getService,
  getUserServices,
  createService,
  updateService,
  deleteService,
} = require("../controllers/service-controller");
const { auth, provider } = require("../middleware/auth");
const router = require("express").Router();

router.get("/", getAllServices);
router.get("/approved", getApprovedServices);
router.get("/:id", getService);
router.get("/my/services", provider, getUserServices);
router.post("/", provider, createService);
router.put("/:id", provider, updateService);
router.delete("/:id", provider, deleteService);

module.exports = router;
