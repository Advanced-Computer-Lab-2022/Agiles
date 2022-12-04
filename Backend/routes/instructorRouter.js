const express = require("express");
const instructorRouter = express.Router();

const {
  createCourse,
  setExam,
  setFinalExam,
} = require("../controllers/CourseController");
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
  deletLink,
  rateInstructor,
} = require("../controllers/InstructorController");

instructorRouter.post("/addCourse", createCourse);
instructorRouter.post("/setExam", setExam);
instructorRouter.post("/setFinalExam", setFinalExam);
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
instructorRouter.post("/setRating", rateInstructor);

module.exports = instructorRouter;
