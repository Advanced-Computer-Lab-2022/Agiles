const express = require('express');
const courserouter = express.Router();
const {filterCourses} = require("../controllers/courseController")
//GET ALL COURSES
courserouter.get('/',(req,res)=>{
    res.json({mssg: 'Get all courses'})
});
//Get single Course by id 
courserouter.get('/:id',(req,res)=>{
    res.json({mssg: 'Get single course'})
});
//post a course 
courserouter.post('/:id',(req,res)=>{
    res.json({mssg: 'post a single course'})
});

courserouter.get('/listCourses/filter',filterCourses )

module.exports = courserouter;    