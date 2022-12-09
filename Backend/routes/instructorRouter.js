const express = require("express");
const instructorRouter = express.Router();

const {
  createCourse,
  setExam,
  setFinalExam,
  reportProblem,
  viewReportedProblems,
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
} = require("../controllers/InstructorController");
const { verifyInstructorJWT } = require("../middleware/authMiddleware");
instructorRouter.post("/addCourse", verifyInstructorJWT, createCourse);
instructorRouter.post("/setExam", verifyInstructorJWT, setExam);
instructorRouter.post("/setFinalExam", verifyInstructorJWT, setFinalExam);
instructorRouter.get("/listCourseTitles",verifyInstructorJWT,listAllInstructorCoursesTitles);
instructorRouter.get("/listCourseTitles/:id",verifyInstructorJWT,listAllInstructorCoursesTitles);
instructorRouter.get("/filterCourses",verifyInstructorJWT,filterCoursesByInstructor);
instructorRouter.get("/searchCourses",verifyInstructorJWT,courseSearchByInstructor);
instructorRouter.get("/instructorbyid", verifyInstructorJWT, getInstructorbyId);
instructorRouter.patch("/updateBio", verifyInstructorJWT, updateInstructorBio);
instructorRouter.patch("/updateEmail",verifyInstructorJWT,updateInstructorEmail);
instructorRouter.patch("/updatePassword",verifyInstructorJWT,updateInstructorPassword);
instructorRouter.patch("/updateSubtitle", verifyInstructorJWT, uploadSubLink);
instructorRouter.patch("/deletSubtitle", verifyInstructorJWT, uploadSubLink);
instructorRouter.delete("/deletSubtitle", verifyInstructorJWT, deletLink);
instructorRouter.patch("/updatePreview", verifyInstructorJWT, uploadPreLink);
instructorRouter.post("/reportProblem", verifyInstructorJWT, reportProblem);
instructorRouter.get("/viewReportedProblems",verifyInstructorJWT,viewReportedProblems);

module.exports = instructorRouter;
