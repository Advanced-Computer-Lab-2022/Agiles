const express = require("express");
const courserouter = express.Router();
var cookieParser = require('cookie-parser');


const course = require("../models/Course");

//get all the titles of the courses available including the total hours of the course and course rating

courserouter.get("/getCourses", async (req, res) => {
  try {
    const courseAttr = await course.find({}, { title: 1, totalHourseOfCourse: 1, rating: 1, _id: 0 });
    res.status(200).send(courseAttr);
  } catch (err) {
    res.status(500).json({ mssg: "can't find courses" });
  }
});
//view the price of each course
//Should i use title also or not?
courserouter.get("/getCoursePrice", async (req, res) => {
  try {
    const coursePrice = await course.find({}, { title: 1, price: 1, _id: 0 });
    res.status(200).send(coursePrice);
  } catch (err) {
    res.status(500).json({ mssg: "can't find prices of courses" });
  }
});
/*
//select country
courserouter.post("/users", async (req, res) => {
  try {
    const country = req.query.country;
    res.cookie("country", country)
    console.log(cookie["country"]);
  } catch (err) {
    res.status(500).json({ mssg: "can't find prices of courses" });
  }
});
*/




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
