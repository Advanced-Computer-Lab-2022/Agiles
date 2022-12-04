const express = require("express");
const courserouter = express.Router();
const {
  addCoursePromotion,
  coursesDetails,
  coursePrice,
  filterCourses,
  courseSearch,
  getCourseById,
  getLink,
  rateCourse,
  findCourseById,
} = require("../controllers/CourseController");

courserouter.get("/listCourses/details", coursesDetails);
courserouter.get("/listCourses/prices", coursePrice);
courserouter.get("/:id", getCourseById);
courserouter.get("/listCourses/filter", filterCourses);
courserouter.get("/listCourses/search", courseSearch);
courserouter.get("/findCourseById", findCourseById);
courserouter.patch("/addPromotion", addCoursePromotion);
courserouter.get("/link/view", getLink);
courserouter.post("/setRating", rateCourse);


module.exports = courserouter;
