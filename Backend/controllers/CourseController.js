const Course = require("../models/Course");

//create Course
const createCourse = async (req , res)=>{
   
    const {title,subTitles,price,description}=req.body;
    const newCourse = new Course({
        //exercise and promotion ? not required
        title:title,
        subTitles:subTitles,
        price:price,
        description:description
    })
    try {
      const course = await  Course.create(newCourse)
      res.status(200).json(course )
    } catch (error) {
        res.status(400).json ({error : error.message})
    }
};  


module.exports = createCourse;