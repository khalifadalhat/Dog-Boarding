const Petsitter = require('../models/petsittermodel');
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

const petsitterauthMiddleware = asyncHandler(async (req, res, next) => {
  let token;
  if (req?.headers?.authorization?.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
    try {
      if(token) {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const petsitter = await Petsitter.findById(decoded?.id);
        req.petsitter = petsitter;
        
        next();
      }
    } catch (error) {
      throw new Error("Not Authorized token expired, please Login again");
    }
  } else {
    throw new Error("There is no token attached to header");
  }
});
const IsAdmin = asyncHandler(async (req, res, next) => {
  const {email} =req.petsitter;
  const adminPetsitter = await Petsitter.findOne({ email });
  if (adminPetsitter.role !== "admin") {
    throw new Error("You are not an admin");
  } else {
    next();
  }
});
module.exports = {petsitterauthMiddleware, IsAdmin};