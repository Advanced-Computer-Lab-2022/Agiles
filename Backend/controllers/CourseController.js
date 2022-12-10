const Course = require("../models/Course");
const Exam = require("../models/Exam");
const FinalExam = require("../models/FinalExam");
const Link = require("../models/Link");
const IndividualTrainee = require("../models/IndividualTrainee");
const Rating = require("../models/Rating");
const Instructor = require("../models/Instructor");
const Report = require("../models/Report");
require("dotenv").config();
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
const popularCourses = async (req, res) => {
  const courses = await Course.find().sort({ studentCount: -1 }).limit(8);
  if (!courses) {
    res.status(400).json({ error: "Empty" });
  } else {
    res.status(200).json(courses);
  }
}
const courseSearch = async (req, res) => {
  const search = req.query["search"];
  const courses = await Course.find({
    $or: [
      { subject: { $regex: new RegExp(search, "i") } },
      { title: { $regex: new RegExp(search, "i") } },
      { instructorname: { $regex: new RegExp(search, "i") } },
    ],
  });
  if (!courses) {
    res.status(400).json({ error: "Empty" });
  } else {
    res.status(200).json(courses);
  }
};
//get the subtitle exam
const courseExam = async (req, res) => {
  const subtitleId = req.query["subtitleId"];
  questions = await Exam.findOne({ subtitleId: subtitleId });

  if (!questions) {
    res.status(400).json({ error: "Empty" });
  } else {
    res.status(200).json(questions);
  }
};
const courseFinalExam = async (req, res) => {
  const courseId = req.query["courseId"];
  questions = await FinalExam.findOne({ courseId: courseId });

  if (!questions) {
    res.status(400).json({ error: "Empty" });
  } else {
    res.status(200).json(questions);
  }
};

const getAllExams = async (req, res) => {
  const courseId = req.query["courseId"];
  const exams = await Exam.find({ courseId: courseId });
};

const createCourse = async (req, res) => {
  const {
    instructor,
    title,
    imgUrl,
    coursePreviewUrl,
    subtitles,
    price,
    description,
    subject,
    totalHoursOfCourse,
    totalHoursOfSubtitles,
    language,
  } = req.body;
  const data = await Instructor.findById(instructor, {
    firstname: 1,
    lastname: 1,
  });
  const instructorname = data.firstname + " " + data.lastname;
  const newCourse = new Course({
    instructor: instructor,
    instructorname: instructorname,
    title: title,
    imgUrl: imgUrl,
    coursePreviewUrl: coursePreviewUrl,
    subtitles: subtitles,
    price: price,
    description: description,
    subject: subject,
    totalHoursOfCourse: totalHoursOfCourse,
    totalHoursOfSubtitles: totalHoursOfSubtitles,
    language: language,
  });
  try {
    const course = await Course.create(newCourse);
    const update = await Instructor.updateOne(
      { _id: instructor },
      { $push: { courseList: course._id } }
    );
    res.status(200).json(course);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//create multiple choices exam for subtitles
const setExam = async (req, res) => {
  const { subtitleId, courseId, questions } = req.body;
  const newExam = new Exam({
    subtitleId,
    courseId,
    questions: questions,
  });

  try {
    const exam = await Exam.create(newExam);
    res.status(200).json(exam);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//create final exam for the course
const setFinalExam = async (req, res) => {
  const { courseId, questions } = req.body;
  const newExam = new FinalExam({
    courseId,
    questions: questions,
  });

  try {
    const exam = await FinalExam.create(newExam);
    res.status(200).json(exam);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//get all the titles of the courses available including the total hours of the course and course rating

const coursesDetails = async (req, res) => {
  try {
    const courseAttr = await Course.find({}).populate("instructor");
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
const findCourseById = async (req, res) => {
  const cid = req.query["id"];
  try {
    const courseAttr = await Course.findById(cid);
    res.status(200).send(courseAttr);
  } catch (err) {
    res.status(500).json({ mssg: "can't find courses" });
  }
};


const getCourseById = async (req, res) => {
  const id = req.params["id"];

  try {
    const course = await Course.findById(id)
      .populate("instructor")
      .populate("subtitles.link")
      .populate("reviews")
      .populate("reviews.userId")
      .exec();
    const reviews = await Rating.find({ state: true, courseId: id }).populate(
      "userId"
    );
    const result = {
      firstField: course,
      secondField: reviews,
    };
    res.status(200).send(result);
  } catch (err) {
    res.status(500).json({ mssg: "no such Id" });
  }
};

const addCoursePromotion = async (req, res) => {
  const id = req.body.id;
  const disc = req.body.promo;
  const enddate = req.body.enddate;
  try {
    await Course.findByIdAndUpdate(
      id,
      {
        discount: disc,
        discount_enddate: enddate,
      },
      { new: true }
    );
    res.status(200).json("updated");
  } catch (err) {
    res.status(500).json({ mssg: "no such Id" });
  }
};
const getLink = async (req, res) => {
  const id = req.query.linkId;
  try {
    const data = await Link.findById(id);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ mssg: "no such Id" });
  }
};
const rateCourse = async (req, res) => {
  const { courseId, userId, userRating, userReview } = req.body;
  if (!courseId || !userId) {
    return res.status(400).json({ error: "Empty" });
  }
  try {
    const data = await Course.findById(courseId).exec();
    let oldRating = parseInt(data.rating);
    let oldCount = parseInt(data.ratingCount);
    let x = parseInt(userRating);
    const exists = await Rating.findOne({
      userId: userId,
      courseId,
      state: true,
    }).exec();
    if (exists) {
      let currentRating = parseInt(exists.userRating);
      let newRating = oldRating - currentRating + x;
      const updateRating = await Rating.findOneAndUpdate(
        { userId: userId, courseId, state: true },
        { userRating: userRating, userReview: userReview },
        { new: true }
      ).exec();
      const updateCourse = await Course.updateOne(
        { _id: courseId },
        { $set: { rating: newRating } }
      ).exec();
      return res.status(200).json({ msg: "Rating updated" });
    } else {
      let newRating = oldRating + x;
      let newCount = oldCount + 1;
      const newRatingObj = await Rating.create({
        userId: userId,
        userRating: userRating,
        userReview: userReview,
        state: true,
        courseId: courseId,
      });
      const UpdatedRating = await Course.updateOne(
        { _id: courseId },
        {
          $push: {
            reviews: newRatingObj._id,
          },
          $set: {
            rating: newRating,
            ratingCount: newCount,
          },
        }
      ).exec();
      const updateIndvidual = await IndividualTrainee.updateOne(
        { _id: userId, "registered_courses.courseId": courseId },
        { $set: { "registered_courses.$.courseRating": newRatingObj._id } }
      ).exec();
      res.status(200).json({ msg: "Rating added" });
    }
  } catch (err) {
    res.status(500).json(err.message);
  }
};

const reportProblem = async (req, res) => {
  const { courseId, reportType, description } = req.body;
  const userId = req.user.id;
  const newProblem = new Report({
    userId: userId,
    courseId: courseId,
    reportType: reportType,
    description: description,
  });
  try {
    const problem = await Report.create(newProblem);
    res.status(200).json(problem);
  } catch (error) {
    res.status(400).json({ error: "can't create a problem" });
  }
};

module.exports = {
  addCoursePromotion,
  createCourse,
  coursesDetails,
  oneCoursesDetails,
  filterCourses,
  courseSearch,
  getCourseById,
  setExam,
  courseExam,
  getLink,
  rateCourse,
  setFinalExam,
  courseFinalExam,
  findCourseById,
  reportProblem,
  popularCourses
};
