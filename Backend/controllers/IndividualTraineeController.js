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


//how to get exercise grade of individual trainee
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

//compare answers of individual trainee
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

