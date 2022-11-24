const express = require("express");
const adminrouter = express.Router();
const {createAdmin,logIn,signUp,logOut} = require("..//controllers/AdminController");
const { createInstructor } = require("..//controllers/InstructorController");
const {createCorporate} = require("..//controllers/CorporateController");
//add another admin
adminrouter.post("/addAdmin", createAdmin);
//add instructor
adminrouter.post("/addInstructor", createInstructor);
//add corporate trainee
adminrouter.post("/addCorporate", createCorporate);
adminrouter.post("/login",logIn);
adminrouter.post("/logout",logOut);
adminrouter.post("/signUp",signUp);
module.exports = adminrouter;
