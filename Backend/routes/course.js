const express = require('express');
const courserouter = express.Router();
 
//GET ALL COURSES
router.get('/',(req,res)=>{
    res.json({mssg: 'Get all courses'})
});
//Get single Course by id 
router.get('/:id',(req,res)=>{
    res.json({mssg: 'Get single course'})
});
//post a course 
router.post('/:id',(req,res)=>{
    res.json({mssg: 'post a single course'})
});
module.exports = courserouter;    