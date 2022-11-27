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
  updateITraineeUsername,
  updateITraineePassword,
  submitExam
} = require("../controllers/IndividualTraineeController");
IndividualTraineeRouter.get("/getIndividualTraineebyId", getTraineebyID);
IndividualTraineeRouter.get("/inprogress/:id", InprogressCourses);
IndividualTraineeRouter.get("/getIndividualExerciseGrade", getExerciseGrade);
IndividualTraineeRouter.get("/getIndividualAnswers", compareAnswers);
IndividualTraineeRouter.patch("/updateUsername", updateITraineeUsername);
IndividualTraineeRouter.patch("/updatePassword", updateITraineePassword);
IndividualTraineeRouter.post("/submitExam", submitExam)
IndividualTraineeRouter.get("/courseExam", courseExam);
IndividualTraineeRouter.get("/courseFinalExam", courseFinalExam);

module.exports = IndividualTraineeRouter;
