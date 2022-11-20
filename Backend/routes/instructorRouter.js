const express = require("express");
const instructorRouter = express.Router();

const { createCourse } = require("../controllers/CourseController");
const {
  filterCoursesByInstructor,
  courseSearchByInstructor,
  listAllInstructorCoursesTitles,
  getInstructorbyId,
  updateInstructorBio,
  updateInstructorEmail,
} = require("../controllers/InstructorController");

//create Course
instructorRouter.post("/addCourse", createCourse);

instructorRouter.get("/listCourseTitles", listAllInstructorCoursesTitles);
instructorRouter.get("/filterCourses", filterCoursesByInstructor);
instructorRouter.get("/searchCourses", courseSearchByInstructor);
instructorRouter.get("/instructorbyid", getInstructorbyId);
instructorRouter.patch("/updateBio", updateInstructorBio);
instructorRouter.patch("/updateEmail", updateInstructorEmail);

module.exports = instructorRouter;
