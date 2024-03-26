const express = require("express");
const { 
  createPetsitter, 
  loginPetsitterCtrl, 
  getallPetsitter, 
  getaPetsitter, 
  deleteaPetsitter, 
  updatedPetsitter,
  blockPetsitter,
  unblockPetsitter,
  handleRefreshToken,
  logout,
} = require("../controllers/petsitterCtrl");
const {petsitterauthMiddleware, IsAdmin} = require("../middlewares/petsitterauthMiddlewares");
const router = express.Router();
router.post("/register", createPetsitter);
router.post("/login", loginPetsitterCtrl);
router.put("/edit-user", petsitterauthMiddleware, updatedPetsitter);
router.get("/refresh", handleRefreshToken);
router.get("/logout", logout);
router.put("/block-user/:id", petsitterauthMiddleware, IsAdmin, blockPetsitter);
router.put("/unblock-user/:id", petsitterauthMiddleware, IsAdmin, unblockPetsitter);
router.get("/all-petsitters", getallPetsitter);
router.get("/:id", petsitterauthMiddleware, IsAdmin, getaPetsitter); 
router.delete("/:id", deleteaPetsitter);

module.exports = router;
