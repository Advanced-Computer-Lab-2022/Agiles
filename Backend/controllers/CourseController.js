const Course = require("../models/Course");
const Exam = require("../models/Exam");
const FinalExam = require("../models/FinalExam");
const Link = require("../models/Link");
const IndividualTrainee = require("../models/IndividualTrainee");
const Rating = require("../models/Rating");
const Instructor = require("../models/Instructor");
const Report = require("../models/Report");
require("dotenv").config();
const popularCourses = async (req, res) => {
  const courses = await Course.find().sort({ studentCount: -1 }).limit(10);
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
      { instructorname: { $regex: new RegExp(search, "i") } },
    ],
  });
  if (!courses) {
    res.status(400).json({ error: "Empty" });
  } else {
    res.status(200).json(courses);
  }
};

const createCourse = async (req, res) => {
  const user = req.user;
  const {
    title,
    imgUrl,
    coursePreviewUrl,
    subtitles,
    price,
    description,
    subject,
    language,
  } = req.body;
  const data = await Instructor.findById(user.id, {
    firstname: 1,
    lastname: 1,
  });
  const instructorname = data.firstname + " " + data.lastname;
  const newCourse = new Course({
    instructor: user.id,
    instructorname: instructorname,
    title: title,
    imgUrl: imgUrl,
    coursePreviewUrl: coursePreviewUrl,
    subtitles: subtitles,
    price: price,
    description: description,
    subject: subject,
    language: language,
  });
  try {
    const course = await Course.create(newCourse);
    const update = await Instructor.updateOne(
      { _id: user.id },
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
    const dataFinal = await Course.updateOne(
      { _id: courseId },
      { $inc: { numberOfItems: 1 } },
      { new: true }
    );
    res.status(200).json(exam);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//create final exam for the course
const setFinalExam = async (req, res) => {
  const { courseId, questions } = req.body;
  const dataFinal = await Course.updateOne(
    { _id: courseId },
    { $inc: { numberOfItems: 1 } },
    { new: true }
  );
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

const getCourses = async (req, res) => {
  let currentDate = new Date().toISOString();

  await Course.updateMany(
    {
      discount_enddate: { $lte: currentDate },
    },
    { discount: 0 }
  );
  try {
    const courses = await Course.find({}).populate("instructor");
    res.status(200).send(courses);
  } catch (err) {
    res.status(500).json({ mssg: "can't find courses" });
  }
};

const getCourseById = async (req, res) => {
  const id = req.params["id"];
  const userId = req.cookies?.currentUser;
  try {
    const course = await Course.findById(id)
      .populate("instructor")
      .populate("subtitles.link")
      .exec();
    const reviews = await Rating.find({ state: true, courseId: id }).populate(
      "userId"
    );
    let exists = false;
    if (userId) {
      exists = await IndividualTrainee.exists({
        _id: userId,
        "registered_courses.courseId": id,
      });
    }
    const result = {
      firstField: course,
      secondField: reviews,
      thirdField: exists,
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

const addCoursePromotionMulti = async (req, res) => {
  const idArr = req.body.idArr;
  const disc = req.body.promo;
  const enddate = req.body.enddate;
  try {
    await idArr.map(async (el) => {
      let course = await Course.findByIdAndUpdate(
        el,
        {
          discount: disc,
          discount_enddate: enddate,
        },
        { new: true }
      );
    });

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
      courseId: courseId,
      state: true,
    }).exec();
    if (exists) {
      let currentRating = parseInt(exists.userRating);
      let newRating = oldRating - currentRating + x;
      const updateRating = await Rating.findOneAndUpdate(
        { userId: userId, courseId: courseId, state: true },
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
      const updateCourse = await Course.findByIdAndUpdate(courseId, {
        $set: { rating: newRating, ratingCount: newCount },
      });
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
  const { courseId, reportType, description, title } = req.body;
  const userId = req.user.id;
  const trainee = await IndividualTrainee.findOne({ _id: userId });
  const instructor = await Instructor.findOne({_id: userId});
  const newProblem = new Report({
    username: instructor?.username || trainee?.username,
    courseId: courseId,
    reportType: reportType,
    description: description,
    title: title,
  });
  try {
    const problem = await Report.create(newProblem);
    res.status(200).json(problem);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "can't create a problem" });
  }
};

const addFollowUp = async (req, res) => {
  const { reportId, followUpArr } = req.body;
  const userId = req.user.id;
  try {
    const report = await Report.findByIdAndUpdate(reportId, {
      followUp: followUpArr,
    });
    res.status(200).json("updated");
  } catch (err) {
    res.status(500).json({ msg: "can't Add this Follow Up" });
  }
};

const viewReportedProblems = async (req, res) => {
  const userId = req.user.id;
  const trainee = await IndividualTrainee.findOne({ _id: userId });
  const instructor = await Instructor.findOne({_id: userId});
  try {
    const reportedProblems = await Report.find({ username: instructor?.username || trainee?.username });
    res.status(200).json(reportedProblems);
  } catch {
    res.status(404).json({ error: "Data Not Found" });
  }
};

module.exports = {
  addCoursePromotion,
  createCourse,
  getCourses,
  courseSearch,
  getCourseById,
  setExam,
  getLink,
  rateCourse,
  setFinalExam,
  reportProblem,
  popularCourses,
  viewReportedProblems,
  addFollowUp,
  addCoursePromotionMulti,
};
