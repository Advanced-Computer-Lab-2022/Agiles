const express = require("express");
const instructorRouter = express.Router();

const { createCourse } = require("../controllers/CourseController");
const {
  filterCoursesByInstructor,
  courseSearchByInstructor,
  listAllInstructorCoursesTitles,
} = require("../controllers/InstructorController");

//create Course
instructorRouter.post("/addCourse", createCourse);

instructorRouter.get("/listCourseTitles", listAllInstructorCoursesTitles);
instructorRouter.get("/filterCourses", filterCoursesByInstructor);
instructorRouter.get("/searchCourses", courseSearchByInstructor);

module.exports = instructorRouter;
