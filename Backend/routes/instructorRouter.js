const express = require("express");
const instructorRouter = express.Router();

const { createCourse , setExam } = require("../controllers/CourseController");
const {
  filterCoursesByInstructor,
  courseSearchByInstructor,
  listAllInstructorCoursesTitles,
  getInstructorbyId,
  updateInstructorBio,
  updateInstructorEmail,
  updateInstructorPassword,
  uploadSubLink,
  uploadPreLink,
  deletLink
} = require("../controllers/InstructorController");

//create Course
instructorRouter.post("/addCourse", createCourse);
//set Exam
instructorRouter.post("/setExam", setExam);
instructorRouter.get("/listCourseTitles", listAllInstructorCoursesTitles);
instructorRouter.get("/listCourseTitles/:id", listAllInstructorCoursesTitles);
instructorRouter.get("/filterCourses", filterCoursesByInstructor);
instructorRouter.get("/searchCourses", courseSearchByInstructor);
instructorRouter.get("/instructorbyid", getInstructorbyId);
instructorRouter.patch("/updateBio", updateInstructorBio);
instructorRouter.patch("/updateEmail", updateInstructorEmail);
instructorRouter.patch("/updatePassword", updateInstructorPassword);
instructorRouter.patch("/updateSubtitle", uploadSubLink);
instructorRouter.patch("/deletSubtitle", uploadSubLink);
instructorRouter.delete("/deletSubtitle", deletLink);
instructorRouter.patch("/updatePreview", uploadPreLink);


module.exports = instructorRouter;
