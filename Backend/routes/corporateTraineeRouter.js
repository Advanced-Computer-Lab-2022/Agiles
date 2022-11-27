const express = require("express");
const corporaterouter = express.Router();
const {
  getExerciseGrade,
  createCorporate,
  compareAnswers,
  getTraineebyID,
} = require("../controllers/CorporateController");
const {
  courseExam,
  courseFinalExam,
} = require("../controllers/CourseController");

corporaterouter.get("/getCorporateExerciseGrade", getExerciseGrade);
corporaterouter.get("/getCorporateAnswers", compareAnswers);
corporaterouter.get("/getCorporateTraineebyId", getTraineebyID);
corporaterouter.get("/courseExam", courseExam);
corporaterouter.get("/courseFinalExam", courseFinalExam);

module.exports = corporaterouter;
