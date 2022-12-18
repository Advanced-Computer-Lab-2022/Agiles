const express = require("express");
const courserouter = express.Router();
const {
  addCoursePromotion,
  getCourses,
  filterCourses,
  courseSearch,
  getCourseById,
  getLink,
  rateCourse,
  popularCourses
} = require("../controllers/CourseController");

courserouter.get("/listCourses/details", getCourses);
courserouter.get("/:id", getCourseById);
courserouter.get("/listCourses/filter", filterCourses);
courserouter.get("/most/popular", popularCourses);
courserouter.get("/listCourses/search", courseSearch);
courserouter.patch("/addPromotion", addCoursePromotion);
courserouter.get("/link/view", getLink);
courserouter.post("/setRating", rateCourse);


module.exports = courserouter;
