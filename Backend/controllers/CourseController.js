const Course = require("../models/Course");
const jwt = require('jsonwebtoken');
require('dotenv').config();
const filterCourses = async (req, res) => {
  const lowerBound = req.query["lowerBound"];
  const upperBound = req.query["upperBound"];
  const subjects = req.query["subject"];
  const ratings = req.query["rating"];

  let courses = [];

  if (subjects && lowerBound && ratings) {
    courses = await Course.find({
      $and: [{ price: { $gte: lowerBound } }, { price: { $lte: upperBound } }],
      rating: ratings,
      subject: { $regex: new RegExp(subjects, "i") },
    })
      .sort({ price: 1 })
      .exec();
  } else if (subjects && lowerBound) {
    courses = await Course.find({
      $and: [{ price: { $gte: lowerBound } }, { price: { $lte: upperBound } }],
      subject: { $regex: new RegExp(subjects, "i") },
    })
      .sort({ price: 1 })
      .exec();
  } else if (lowerBound && ratings) {
    courses = await Course.find({
      $and: [{ price: { $gte: lowerBound } }, { price: { $lte: upperBound } }],
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
  } else if (subjects) {
    courses = await Course.find({
      subject: { $regex: new RegExp(subjects, "i") },
    }).exec();
  } else if (ratings) {
    courses = await Course.find({
      rating: ratings,
    }).exec();
  } else if (lowerBound) {
    courses = await Course.find({
      $and: [{ price: { $gte: lowerBound } }, { price: { $lte: upperBound } }],
    }).exec();
  }

  if (!courses) {
    res.status(400).json({ error: "Empty" });
  } else {
    res.status(200).json(courses);
  }
};

const courseSearch = async (req, res) => {
  const search = req.query["search"];
  const courses = await Course.find({
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
    coursePreview,
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
  const newCourse = new Course({
    instructor: instructor,
    title: title,
    coursePreview:coursePreview,
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
      { title: 1, totalHoursOfCourse: 1, price: 1, rating: 1,imgUrl :1,instructorname:1, _id: 1 }
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
      { title: 1, totalHoursOfCourse: 1, rating: 1, _id: 1 }
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

const getCourseById = async (req, res) => {
  console.log(req.params);
  const id = req.params["id"];
  try {
    const course = await Course.findById(id).exec();
    res.status(200).send(course);
  } catch (err) {
    res.status(500).json({ mssg: "no such Id" });
  }
};

const addCoursePromotion = async (req, res) => {
  const id = req.query["id"];
  const disc = req.body.promo;
  const enddate = req.body.enddate;
  console.log(id);

  try {
    await Course.findByIdAndUpdate(
      id,
      {
        discount: disc,
        discount_enddate: enddate,
      },
      function (err, docs) {
        if (err) {
          console.log(err);
        } else {
          console.log("Updated Course : ", docs);
        }
        res.status(200);
      }
    );
  } catch (err) {
    res.status(500).json({ mssg: "no such Id" });
  }
};
module.exports = {
  addCoursePromotion,
  createCourse,
  coursePrice,
  coursesDetails,
  oneCoursesDetails,
  filterCourses,
  courseSearch,
  getCourseById,
};
