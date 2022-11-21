const IndividualTrainee = require("../models/IndividualTrainee");
const jwt = require('jsonwebtoken');
require('dotenv').config();
function verifyItraineeJWT (authHeader) {
  //const authHeader = req.headers['authorization'];
  if (!authHeader) return true;
  const token = authHeader.split(' ')[1];
  jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET_ITRAINEE,
      (err, decoded) => {
          if (err) return err; 
          
      }
  );
}
const getTraineebyID = async (req,res) => {
  const id = req.params["id"];
  const Itrainee =await IndividualTrainee.findById(id);;
  return res.status(200).json(Itrainee);
};
const InprogressCourses = async(req , res) =>{
    let verficationerror = verifyItraineeJWT(req.headers['authorization']);
    if (verficationerror){
        return res.status(401).json({msg:"Invalid Token"});
    }
    else{
    const id = req.params["id"];
    if (!id) return res.status(400).json({ msg: "bad request" });
    const courses = await IndividualTrainee.findById(id,{registered_courses:1}).populate('registered_courses.id');
    return res.status(200).json(courses);
    }
}


const getExerciseGrade = async (req,res) => {
  const studentId =  req.params["id"];
  const exerciseId = req.params["exerciseId"];
  const exercise = await ExamResult.findOne({
    studentId: studentId,
    exerciseId: exerciseId
  },{result: 1}).exec();
  try{
  res.status(200).json(exercise);
  }
  catch(error){
    res.status(400).json({error:error.message})
  }
}

const compareAnswers = async (req,res) => {
  const studentId =  req.params["id"];
  const exerciseId = req.params["exerciseId"];
  const exerciseChoices = await ExamResult.findOne({
    studentId: studentId,
    exerciseId: exerciseId
  },{studentChoices: 1}).exec();
  
  const exercise = await Exam.findById
  (exerciseId,{answers:1});
  try{
    res.status(200).json({exerciseChoices,exercise});
  }
  catch(error){
    res.status(400).json({error:error.message})
  }
}



module.exports = {getTraineebyID,InprogressCourses,getExerciseGrade,compareAnswers};

