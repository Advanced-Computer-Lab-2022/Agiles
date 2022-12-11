const express = require("express");
const adminrouter = express.Router();
const {
  createCorporate,
  createInstructor,
  createAdmin,
  logIn,
  signUp,
  logOut,
  accessRequests,
  grantAccess,
} = require("..//controllers/AdminController");
const { verifyAdminJWT } = require("../middleware/authMiddleware");
adminrouter.post("/addAdmin", verifyAdminJWT, createAdmin);
adminrouter.post("/addInstructor", verifyAdminJWT, createInstructor);
adminrouter.post("/addCorporate", createCorporate);
adminrouter.post("/login", logIn);
adminrouter.post("/logout", logOut);
adminrouter.post("/signUp", signUp);
adminrouter.get("/accessRequests", accessRequests);
adminrouter.post("/grantAccess", grantAccess);

module.exports = adminrouter;
