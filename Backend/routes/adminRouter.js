const express = require("express");
const adminrouter = express.Router();
const createAdmin = require("..//controllers/AdminController");
const { createInstructor } = require("..//controllers/InstructorController");
const createCorporate = require("..//controllers/CorporateController");
//add another admin
adminrouter.post("/addAdmin", createAdmin);
//add instructor
adminrouter.post("/addInstructor", createInstructor);
//add corporate trainee
adminrouter.post("/addCorporate", createCorporate);
module.exports = adminrouter;
