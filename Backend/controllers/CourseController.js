const Course = require("../models/Course");

const filterCourses = async (req, res) => {
  const lowerBound = req.query["lowerBound"];
  const upperBound = req.query["upperBound"];
  const subjects = req.query["subject"];
  const ratings = req.query["rating"];
  courses = await Course.find({
    $and: [
      {
        $and: [
          { price: { $gte: lowerBound } },
          { price: { $lte: upperBound } },
        ],
      },
      { rating: ratings },
      { subject: subjects },
    ],
  })
    .sort({ price: 1 })
    .exec();

  if (subjects && lowerBound && ratings) {
    courses = await Course.find({
      price: { $gte: lowerBound },
      price: { $lte: upperBound },
      rating: ratings,
      subject: subjects,
    })
      .sort({ price: 1 })
      .exec();
  } else if (subjects && lowerBound) {
    courses = await Course.find({
      price: { $gte: lowerBound },
      price: { $lte: upperBound },
      subject: subjects,
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
    courses = await Course.find({ rating: ratings, subject: subjects })
      .sort({ price: 1 })
      .exec();
  }

  if (!courses) {
    res.status(400).json({ error: "Empty" });
  } else {
    res.status(200).json(courses);
  }
};

const courseSearch = async (req, res) => {
  const type = req.query["type"];
  const search = req.query["query"];
  console.log(req.query["search"])

  
    courses = await Course.find({
      $or: [{subject: { $regex: new RegExp(search, "i") }},
      { title: { $regex: new RegExp(search, "i") } },
      {instructor: { $regex: new RegExp(search, "i") }}]
    });


  if (!courses) {
    res.status(400).json({ error: "Empty" });
  } else {
    res.status(200).json(courses);
  }
};

const createCourse = async (req, res) => {
  const { title, subTitles, price, description } = req.body;
  const newCourse = new Course({
    //exercise and promotion ? not required
    title: title,
    subTitles: subTitles,
    price: price,
    description: description,
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
      { title: 1, totalHourseOfCourse: 1, rating: 1, _id: 1 }
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
};
module.exports = {
  createCourse,
  coursePrice,
  coursesDetails,
  oneCoursesDetails,
  filterCourses,
  courseSearch,
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
