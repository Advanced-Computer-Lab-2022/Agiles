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
  acceptRefund,
  getReports,
  refundRequests,
  viewReport,
  resolveReport,
} = require("..//controllers/AdminController");
const { verifyAdminJWT } = require("../middleware/authMiddleware");
const { isAuthAdmin } = require("../controllers/authContext");
adminrouter.post("/addAdmin", verifyAdminJWT, createAdmin);
adminrouter.post("/addInstructor", verifyAdminJWT, createInstructor);
adminrouter.post("/addCorporate",verifyAdminJWT, createCorporate);
adminrouter.get("/accessRequests",verifyAdminJWT, accessRequests);
adminrouter.post("/grantAccess",verifyAdminJWT, grantAccess);
adminrouter.post("/acceptRefund",verifyAdminJWT, acceptRefund);
adminrouter.get("/getReports",verifyAdminJWT, getReports);
adminrouter.get("/refundRequests",verifyAdminJWT, refundRequests);
adminrouter.post("/viewReport",verifyAdminJWT, viewReport);
adminrouter.post("/resolveReport",verifyAdminJWT, resolveReport);
///Authentication/autherization routes
adminrouter.post("/login", logIn);
adminrouter.post("/logout", logOut);
adminrouter.post("/signUp", signUp);
adminrouter.get("/isAuth", isAuthAdmin);

module.exports = adminrouter;
