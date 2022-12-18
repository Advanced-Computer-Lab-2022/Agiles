const express = require("express");
const instructorRouter = express.Router();
const {isAuthInstructor} = require("../controllers/authContext");

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
  courseByinst,
  getInstructorbyId,
  updateFieldUser,
  updateEmail,
  updateInstructorPassword,
  uploadSubLink,
  uploadPreLink,
  deletLink,
  profit
} = require("../controllers/InstructorController");
const { verifyInstructorJWT } = require("../middleware/authMiddleware");
instructorRouter.post("/addCourse", verifyInstructorJWT, createCourse);
instructorRouter.post("/setExam", verifyInstructorJWT, setExam);
instructorRouter.post("/setFinalExam", verifyInstructorJWT, setFinalExam);
instructorRouter.get("/listCourseTitles/:id",verifyInstructorJWT,courseByinst);
instructorRouter.get("/profit",verifyInstructorJWT,profit);
instructorRouter.get("/filterCourses",verifyInstructorJWT,filterCoursesByInstructor);
instructorRouter.get("/searchCourses",verifyInstructorJWT,courseSearchByInstructor);
instructorRouter.patch("/updateBasics", verifyInstructorJWT, updateFieldUser);
instructorRouter.patch("/updateEmail",verifyInstructorJWT,updateEmail);
instructorRouter.patch("/updatePassword",verifyInstructorJWT,updateInstructorPassword);
instructorRouter.patch("/updateSubtitle", verifyInstructorJWT, uploadSubLink);
instructorRouter.delete("/deletSubtitle", verifyInstructorJWT, deletLink);
instructorRouter.patch("/updatePreview", verifyInstructorJWT, uploadPreLink);
instructorRouter.post("/reportProblem", verifyInstructorJWT, reportProblem);
instructorRouter.get("/viewReportedProblems",verifyInstructorJWT,viewReportedProblems);
instructorRouter.get("/instructorbyid", getInstructorbyId);
instructorRouter.get("/isAuth",isAuthInstructor);
module.exports = instructorRouter;
