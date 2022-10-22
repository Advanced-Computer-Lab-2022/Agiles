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
      res.status(200).json(course)
    } catch (error) {
        res.status(400).json ({error : error.message})
    }
}; 

//get all the titles of the courses available including the total hours of the course and course rating

const coursesDetails = async (req, res) => {
    try {
        const courseAttr = await Course.find({}, { title: 1, totalHourseOfCourse: 1, rating: 1, _id: 0 });
        res.status(200).send(courseAttr);
    } catch (err) {
        res.status(500).json({ mssg: "can't find courses" });
    }
};

//module.exports = coursesDetails;


//view the price of each course
//Should i use title also or not?


const coursePrice = async (req, res) => {
    try {
        const coursePrice = await Course.find({}, { title: 1, price: 1, _id: 0 });
        res.status(200).send(coursePrice);
    } catch (err) {
        res.status(500).json({ mssg: "can't find prices of courses" });
    }
};
module.exports = {createCourse , coursePrice, coursesDetails };

/*
//select country
courserouter.post("/users", async (req, res) => {
  try {
    const country = req.query.country;
    res.cookie("country", country)
    console.log(cookie["country"]);
  } catch (err) {
    res.status(500).json({ mssg: "can't find prices of courses" });
  }
});
*/
