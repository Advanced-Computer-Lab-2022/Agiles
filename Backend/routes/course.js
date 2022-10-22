const express = require("express");
const courserouter = express.Router();
var cookieParser = require('cookie-parser');
const { coursesDetails, coursePrice } = require("../controllers/CourseController")

//get all the titles of the courses available including the total hours of the course and course rating

courserouter.get("/listCourses/details", coursesDetails);
//view the price of each course
//Should i use title also or not?
courserouter.get("/listCourses/prices", coursePrice);


//GET ALL COURSES
courserouter.get("/", (req, res) => {
  res.json({ mssg: "Get all courses" });
});
//Get single Course by id
courserouter.get("/:id", (req, res) => {
  res.json({ mssg: "Get single course" });
});
//post a course
courserouter.post("/:id", (req, res) => {
  res.json({ mssg: "post a single course" });
});


module.exports = courserouter;
