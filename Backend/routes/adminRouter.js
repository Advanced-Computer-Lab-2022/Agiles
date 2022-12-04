const express = require("express");
const adminrouter = express.Router();
const {createCorporate,createInstructor,createAdmin,logIn,signUp,logOut} = require("..//controllers/AdminController");

adminrouter.post("/addAdmin", createAdmin);
adminrouter.post("/addInstructor", createInstructor);
adminrouter.post("/addCorporate", createCorporate);
adminrouter.post("/login",logIn);
adminrouter.post("/logout",logOut);
adminrouter.post("/signUp",signUp);

module.exports = adminrouter;
