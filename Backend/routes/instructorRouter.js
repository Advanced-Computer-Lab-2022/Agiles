const express = require("express");
const instructorRouter = express.Router();

const { createCourse } = require("../controllers/CourseController");
const {
  createInstructor,
  listAllInstructorCoursesTitles,
} = require("../controllers/InstructorController");

//create Course
instructorRouter.post("/addCourse", createCourse);

instructorRouter.post("/listCourseTitles", listAllInstructorCoursesTitles);

module.exports = instructorRouter;
