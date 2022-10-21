const Instructor = require("../models/Instructor")

//create Instructor
const createInstructor = async (req , res)=>{
    const {username , password} = req.body;
    try {
      const instructor = await  Instructor.create({username,password})
      res.status(200).json(instructor )
    } catch (error) {
        res.status(400).json ({error : error.message})
    }
};  

module.exports = createInstructor;