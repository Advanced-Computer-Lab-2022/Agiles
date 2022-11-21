const IndividualTrainee = require("../models/IndividualTrainee");

const getTraineebyID = async (req,res) => {
  const id = req.params["id"];
  const Itrainee =await IndividualTrainee.findById(id);;
  return res.status(200).json(Itrainee);
};
const InprogressCourses = async(req , res) =>{
     const id = req.params["id"];
     if (!id) return res.status(400).json({ msg: "bad request" });
     const courses = await IndividualTrainee.findById(id,{registered_courses:1}).populate('registered_courses.id');
     return res.status(200).json(courses);
}


module.exports = {getTraineebyID,InprogressCourses};

