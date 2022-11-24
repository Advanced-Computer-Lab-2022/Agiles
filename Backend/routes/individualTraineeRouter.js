const express = require("express");
const IndividualTraineeRouter = express.Router();
const getTraineebyID = require("../controllers/IndividualTraineeController");
const {courseExam} = require("../controllers/CourseController");
IndividualTraineeRouter.get("/getIndividualTraineebyId", getTraineebyID);

IndividualTraineeRouter.get("/courseExam", courseExam);

module.exports = IndividualTraineeRouter;
