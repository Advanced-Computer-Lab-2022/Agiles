const express = require("express");
const IndividualTraineeRouter = express.Router();
const getTraineebyID = require("../controllers/IndividualTraineeController");
IndividualTraineeRouter.get("/getIndividualTraineebyId", getTraineebyID);

module.exports = IndividualTraineeRouter;
