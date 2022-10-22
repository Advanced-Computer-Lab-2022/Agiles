const express = require('express');
const instructorRouter = express.Router();
const createCourse = require("../controllers/CourseController"); 
//create Course
instructorRouter.post('/addCourse',createCourse);

module.exports=instructorRouter;