const express = require("express");
const corporaterouter = express.Router();
const {getExerciseGrade,createCorporate,compareAnswers} = require("../controllers/CorporateController");
const {courseExam} = require("../controllers/CourseController");

corporaterouter.get("/getCorporateExerciseGrade",getExerciseGrade);
corporaterouter.get("/getCorporateAnswers",compareAnswers)
corporaterouter.get("/courseExam", courseExam);


module.exports = corporaterouter;

