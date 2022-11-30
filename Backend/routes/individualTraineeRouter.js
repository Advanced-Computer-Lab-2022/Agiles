const express = require("express");
const IndividualTraineeRouter = express.Router();
const {
  courseExam,
  courseFinalExam,
} = require("../controllers/CourseController");
const {
  getTraineebyID,
  InprogressCourses,
  getExerciseGrade,
  compareAnswers,
  updateITraineePassword,
  submitExam,
  updateFieldUser,
  updateEmail,
  forgetPassword,
  verifyCode,
  getFinalExamGrade,
  InprogressCoursebyId,
  changePassword
} = require("../controllers/IndividualTraineeController");
IndividualTraineeRouter.get("/getIndividualTraineebyId", getTraineebyID);
IndividualTraineeRouter.get("/inprogress/:id", InprogressCourses);
IndividualTraineeRouter.post("/inprogressCourse", InprogressCoursebyId);
IndividualTraineeRouter.get("/getIndividualExerciseGrade", getExerciseGrade);
IndividualTraineeRouter.get("/getIndividualAnswers", compareAnswers);
IndividualTraineeRouter.patch("/updateBasics", updateFieldUser);
IndividualTraineeRouter.patch("/updateEmail", updateEmail);
IndividualTraineeRouter.patch("/updatePassword", updateITraineePassword);
IndividualTraineeRouter.patch("/changePassword", changePassword);
IndividualTraineeRouter.post("/submitExam", submitExam)
IndividualTraineeRouter.post("/forgotpassword",forgetPassword)
IndividualTraineeRouter.post("/verifyCode",verifyCode)
IndividualTraineeRouter.get("/courseExam", courseExam);
IndividualTraineeRouter.get("/courseFinalExam", courseFinalExam);
IndividualTraineeRouter.get("/getFinalExamGrade", getFinalExamGrade);
//updateFieldUser
module.exports = IndividualTraineeRouter;
