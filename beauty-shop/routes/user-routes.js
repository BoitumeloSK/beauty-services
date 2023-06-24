const {
  getAllUsers,
  getUserById,
  signup,
  login,
  logout,
  updatePassword,
  updateUser,
  updateRole,
  deleteUser,
} = require("../controllers/user-controller");
const { auth, provider, admin } = require("../middleware/auth");
const router = require("express").Router();

router.get("/", admin, getAllUsers);
router.get("/logout", logout);
router.get("/:id", getUserById);
router.post("/login/user", login);
router.post("/", signup);
router.put("/password/:id", auth, updatePassword);
router.put("/:id", auth, updateUser);
router.put("/role/:id", admin, updateRole);
router.delete("/:id", auth, deleteUser);

module.exports = router;
