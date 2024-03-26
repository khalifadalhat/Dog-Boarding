const express = require("express");
const { 
  createUser, 
  loginUserCtrl, 
  getallUser, 
  getaUser, 
  deleteaUser, 
  updatedUser,
  blockUser,
  unblockUser,
  handleRefreshToken,
  logout,
} = require("../controllers/userCtrl");
const {authMiddleware, IsAdmin} = require("../middlewares/authMiddlewares");
const router = express.Router();
router.post("/register", createUser);
router.post("/login", loginUserCtrl);
router.put("/edit-user", authMiddleware, updatedUser);
router.get("/refresh", handleRefreshToken);
router.get("/logout", logout);
router.put("/block-user/:id", authMiddleware, IsAdmin, blockUser);
router.put("/unblock-user/:id", authMiddleware, IsAdmin, unblockUser);
router.get("/all-users", getallUser);
router.get("/:id", authMiddleware, IsAdmin, getaUser); 
router.delete("/:id", deleteaUser);

module.exports = router;
