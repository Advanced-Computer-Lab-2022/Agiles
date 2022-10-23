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

instructorRouter.post("/listCourseTitles", listAllInstructorCoursesTitles);
instructorRouter.post("/filterCourses", filterCoursesByInstructor);
instructorRouter.post("/searchCourses", courseSearchByInstructor);

module.exports = instructorRouter;
