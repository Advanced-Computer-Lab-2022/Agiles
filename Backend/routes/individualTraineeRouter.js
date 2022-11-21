const express = require("express");
const IndividualTraineeRouter = express.Router();
const {getTraineebyID,InprogressCourses} = require("../controllers/IndividualTraineeController");
IndividualTraineeRouter.get("/getIndividualTraineebyId", getTraineebyID);
IndividualTraineeRouter.get("/inprogress/:id",InprogressCourses);

module.exports = IndividualTraineeRouter;
