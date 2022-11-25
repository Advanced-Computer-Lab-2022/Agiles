const express = require("express");
const courserouter = express.Router();
const {
  addCoursePromotion,
  coursesDetails,
  coursePrice,
  filterCourses,
  courseSearch,
  getCourseById,
} = require("../controllers/CourseController");

//get all the titles of the courses available including the total hours of the course and course rating

courserouter.get("/listCourses/details", coursesDetails);
//view the price of each course
courserouter.get("/listCourses/prices", coursePrice);
//Get single Course by id
courserouter.get("/:id", getCourseById);

courserouter.get("/listCourses/filter", filterCourses);

courserouter.get("/listCourses/search", courseSearch);
courserouter.patch("/addPromotion", addCoursePromotion);
// courserouter.patch("/updateRating", updateRating);

module.exports = courserouter;
