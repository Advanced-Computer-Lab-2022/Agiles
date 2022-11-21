const express = require("express");
const corporaterouter = express.Router();
const {getExerciseGrade,createCorporate,compareAnswers} = require("../controllers/CorporateController");

corporaterouter.get("/getCorporateExerciseGrade",getExerciseGrade);
corporaterouter.get("/getCorporateAnswers",compareAnswers)

module.exports = corporaterouter;


