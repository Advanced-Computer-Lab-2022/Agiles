const express = require("express");
const IndividualTraineeRouter = express.Router();
const {getTraineebyID,InprogressCourses} = require("../controllers/IndividualTraineeController");
IndividualTraineeRouter.get("/getIndividualTraineebyId", getTraineebyID);
IndividualTraineeRouter.get("/inprogress/:id",InprogressCourses);
IndividualTraineeRouter.get("/getIndividualExerciseGrade",getExerciseGrade);
IndividualTraineeRouter.get("/getIndividualAnswers",compareAnswers)

module.exports = IndividualTraineeRouter;
