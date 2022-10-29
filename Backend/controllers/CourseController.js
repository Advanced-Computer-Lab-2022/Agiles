const Course = require("../models/Course");

const filterCourses = async (req, res) => {
  const lowerBound = req.query["lowerBound"];
  const upperBound = req.query["upperBound"];
  const subjects = req.query["subject"];
  const ratings = req.query["rating"];
  let courses = await Course.find({
    $or: [
      {
        $and: [
          { price: { $gte: lowerBound } },
          { price: { $lte: upperBound } },
        ],
      },
      { rating: ratings },
      { subject: { $regex: new RegExp(subjects, "i") } },
    ],
  })
    .sort({ price: 1 })
    .exec();

  if (subjects && lowerBound && ratings) {
     courses = await Course.find({
      price: { $gte: lowerBound },
      price: { $lte: upperBound },
      rating: ratings,
      subject: { $regex: new RegExp(subjects, "i") },
    })
      .sort({ price: 1 })
      .exec();
  } else if (subjects && lowerBound) {
     courses = await Course.find({
      price: { $gte: lowerBound },
      price: { $lte: upperBound },
      subject: { $regex: new RegExp(subjects, "i") },
    })
      .sort({ price: 1 })
      .exec();
  } else if (lowerBound && ratings) {
     courses = await Course.find({
      price: { $gte: lowerBound },
      price: { $lte: upperBound },
      rating: ratings,
    })
      .sort({ price: 1 })
      .exec();
  } else if (subjects && ratings) {
     courses = await Course.find({
      rating: ratings,
      subject: { $regex: new RegExp(subjects, "i") },
    })
      .sort({ price: 1 })
      .exec();
  }
  else if( subjects){
     courses = await Course.find({
      subject: { $regex: new RegExp(subjects, "i") }
    })
  }
  else if (ratings){
     courses = await Course.find({
      rating: ratings
    })
  }
  else if (lowerBound){
     courses = await Course.find({
      price: { $gte: lowerBound },
      price: { $lte: upperBound }      
    })
  }
  

  if (!courses) {
    res.status(400).json({ error: "Empty" });
  } else {
    res.status(200).json(courses);
  }
};

const courseSearch = async (req, res) => {
  const search = req.query["search"];
  console.log(req.query["search"]);

  courses = await Course.find({
    $or: [
      { subject: { $regex: new RegExp(search, "i") } },
      { title: { $regex: new RegExp(search, "i") } },
      { instructor: { $regex: new RegExp(search, "i") } },
    ],
  });

  if (!courses) {
    res.status(400).json({ error: "Empty" });
  } else {
    res.status(200).json(courses);
  }
};

const createCourse = async (req, res) => {
  const {
    instructor,
    title,
    subtitles,
    price,
    description,
    subject,
    totalHoursOfCourse,
    totalHoursOfSubtitles,
    language,
    discount,
    rating,
    exercises,
  } = req.body;
  // const { title, subTitles, price, description } = req.body;
  const newCourse = new Course({
    //exercise and promotion ? not required

    instructor: instructor,
    title: title,
    subtitles: subtitles,
    price: price,
    description: description,
    subject: subject,
    totalHoursOfCourse: totalHoursOfCourse,
    totalHoursOfSubtitles: totalHoursOfSubtitles,
    language: language,
    discount: discount,
    rating: rating,
    exercises: exercises,
  });
  try {
    const course = await Course.create(newCourse);
    res.status(200).json(course);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//get all the titles of the courses available including the total hours of the course and course rating

const coursesDetails = async (req, res) => {
  try {
    const courseAttr = await Course.find(
      {},
      { title: 1, totalHourseOfCourse: 1, price: 1, rating: 1, _id: 1 }
    );
    res.status(200).send(courseAttr);
  } catch (err) {
    res.status(500).json({ mssg: "can't find courses" });
  }
};

const oneCoursesDetails = async (req, res) => {
  const cid = req.query["id"];
  try {
    const courseAttr = await Course.findOne(
      { _id: cid },
      { title: 1, totalHourseOfCourse: 1, rating: 1, _id: 1 }
    );
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
    const coursePrice = await Course.find(
      {},
      { title: 1, price: 1, _id: 0 }
    ).exec();
    res.status(200).send(coursePrice);
  } catch (err) {
    res.status(500).json({ mssg: "can't find prices of courses" });
  }
 // console.log(window.sessionStorage.getItem("country"));
};

const getCourseById = async (req, res) => {
  const id = req.params["id"];
  try {
    const course = await Course.findById(id).exec();
    res.status(200).send(course);
  } catch (err) {
    res.status(500).json({ mssg: "no such Id" });
  }
};
module.exports = {
  createCourse,
  coursePrice,
  coursesDetails,
  oneCoursesDetails,
  filterCourses,
  courseSearch,
  getCourseById,
};

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
