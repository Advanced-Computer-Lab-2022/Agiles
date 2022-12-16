const express = require("express");
const courserouter = express.Router();
const {
  addCoursePromotion,
  coursesDetails,
  filterCourses,
  courseSearch,
  getCourseById,
  getLink,
  rateCourse,
  findCourseById,
  popularCourses
} = require("../controllers/CourseController");

courserouter.get("/listCourses/details", coursesDetails);
courserouter.get("/:id", getCourseById);
courserouter.get("/listCourses/filter", filterCourses);
courserouter.get("/most/popular", popularCourses);
courserouter.get("/listCourses/search", courseSearch);
courserouter.get("/findCourseById", findCourseById);
courserouter.patch("/addPromotion", addCoursePromotion);
courserouter.get("/link/view", getLink);
courserouter.post("/setRating", rateCourse);


module.exports = courserouter;
