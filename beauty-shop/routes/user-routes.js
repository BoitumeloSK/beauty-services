const {
  getAllUsers,
  getUserById,
  signup,
  login,
  logout,
  updatePassword,
  updateUser,
  deleteUser,
} = require("../controllers/user-controller");
const { auth, provider, admin } = require("../middleware/auth");
const router = require("express").Router();

router.get("/", provider, getAllUsers);
router.get("/logout", logout);
router.get("/:id", getUserById);
router.post("/login/user", login);
router.post("/", signup);
router.put("/password/:id", auth, updatePassword);
router.put("/:id", auth, updateUser);
router.delete("/:id", auth, deleteUser);

module.exports = router;
