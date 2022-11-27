const express = require("express");
const corporaterouter = express.Router();
const {getExerciseGrade,createCorporate,compareAnswers,getTraineebyID} = require("../controllers/CorporateController");
const {courseExam} = require("../controllers/CourseController");
corporaterouter.get("/getCorporateTraineebyId", getTraineebyID);
corporaterouter.get("/getCorporateExerciseGrade",getExerciseGrade);
corporaterouter.get("/getCorporateAnswers",compareAnswers)
corporaterouter.get("/courseExam", courseExam);


module.exports = corporaterouter;


