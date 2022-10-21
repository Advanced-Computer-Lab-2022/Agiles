const express = require('express');
const adminrouter = express.Router();

const Admin = require ("../models/Admin")
 
//add another admin 
adminrouter.post('/addAdmin', async (req,res)=>{
    const {userName , password} = req.body;
    try {
      const admin = await  Admin.create({userName,password})
      res.status(200).json(admin )
    } catch (error) {
        res.status(400).json ({error : error.message})
    }
});
//add instructor 
adminrouter.post('/addInstructor',(req,res)=>{
    res.json({mssg: 'add instructor course'})
});
//add corporate trainee
adminrouter.post('/addCorporate',(req,res)=>{
    res.json({mssg: 'add a  corprate'})
});
module.exports = adminrouter;  