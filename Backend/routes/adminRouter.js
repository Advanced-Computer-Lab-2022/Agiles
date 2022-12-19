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
adminrouter.post("/addCorporate", createCorporate);
adminrouter.get("/accessRequests", accessRequests);
adminrouter.post("/grantAccess", grantAccess);
adminrouter.post("/acceptRefund", acceptRefund);
adminrouter.get("/getReports", getReports);
adminrouter.get("/refundRequests", refundRequests);

///Authentication/autherization routes
adminrouter.post("/login", logIn);
adminrouter.post("/logout", logOut);
adminrouter.post("/signUp", signUp);
adminrouter.get("/isAuth", isAuthAdmin);
adminrouter.post("/viewReport", viewReport);
adminrouter.post("/resolveReport", resolveReport);

module.exports = adminrouter;
