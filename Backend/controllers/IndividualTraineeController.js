const IndividualTrainee = require("../models/IndividualTrainee");

const getTraineebyID = async () => {
  const id = req.params["id"];
  return await IndividualTrainee.findById(id);
};



module.exports = getTraineebyID;
