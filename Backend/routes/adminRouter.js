const express = require('express');
const adminrouter = express.Router();

const Admin = require ("../models/Admin")
const Instructor = require ("../models/Instructor")
const Corporate = require ("../models/CorporateTrainee")

 
//add another admin 
adminrouter.post('/addAdmin', async (req,res)=>{
    const {username , password} = req.body;
    try {
      const admin = await  Admin.create({username,password})
      res.status(200).json(admin )
    } catch (error) {
        res.status(400).json ({error : error.message})
    }
});
//add instructor 
adminrouter.post('/addInstructor', async (req,res)=>{
    const {username , password} = req.body;
    try {
      const instructor = await  Instructor.create({username,password})
      res.status(200).json(instructor )
    } catch (error) {
        res.status(400).json ({error : error.message})
    }
});
//add corporate trainee
adminrouter.post('/addCorporate', async (req,res)=>{
    const {username , password} = req.body;
    try {
      const corporate = await  Corporate.create({username,password})
      res.status(200).json(corporate)
    } catch (error) {
        res.status(400).json ({error : error.message})
    }
});
module.exports = adminrouter;  