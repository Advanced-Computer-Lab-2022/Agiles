const express = require("express");
const IndividualTraineeRouter = express.Router();
const {courseExam} = require("../controllers/CourseController");
const {
  getTraineebyID,
  InprogressCourses,
  getExerciseGrade,
  compareAnswers,
  updateITraineeUsername,
  updateITraineePassword,
} = require("../controllers/IndividualTraineeController");
IndividualTraineeRouter.get("/getIndividualTraineebyId", getTraineebyID);
IndividualTraineeRouter.get("/inprogress/:id", InprogressCourses);
IndividualTraineeRouter.get("/getIndividualExerciseGrade", getExerciseGrade);
IndividualTraineeRouter.get("/getIndividualAnswers", compareAnswers);
IndividualTraineeRouter.patch("/updateUsername", updateITraineeUsername);
IndividualTraineeRouter.patch("/updatePassword", updateITraineePassword);

IndividualTraineeRouter.get("/courseExam", courseExam);

module.exports = IndividualTraineeRouter;
