const IndividualTrainee = require("../models/IndividualTrainee");
const ExamResult = require("../models/ExamResult");
const Instructor = require("../models/Instructor");
const Rating = require("../models/Rating");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
var nodemailer = require("nodemailer");
const resetPassword = require("./ResetPassword");
const FinalExamResult = require("../models/FinalExamResult");
const FinalExam = require("../models/FinalExam");
require("dotenv").config();
const Exam = require("../models/Exam");


const getTraineebyID = async (req, res) => {
  const id = req.query.id;
  const Itrainee = await IndividualTrainee.findById(id);
  return res.status(200).json(Itrainee);
};
const InprogressCourses = async (req, res) => {
    const id = req.params["id"];
    if (!id) return res.status(400).json({ msg: "bad request" });
    const courses = await IndividualTrainee.findById(id, {
      registered_courses: 1,
    }).populate("registered_courses.courseId").populate("registered_courses.courseRating");
    return res.status(200).json(courses);
};
const InprogressCoursebyId = async (req, res) => {
    const id = req.body.id;
    const courseId = req.body.courseId;
    if (!id) return res.status(400).json({ msg: "bad request" });
    const courses = await IndividualTrainee.findOne({_id :id , "registered_courses.courseId":courseId}, {
      registered_courses: 1,
    }).populate("registered_courses.courseId").populate("registered_courses.instRating");
    const reviews = await Rating.find({state : true,courseId:courseId}).populate('userId');
    const result = {
      firstField : courses,
      secondField  :reviews
    }
    return res.status(200).json(result);
};

const submitExam = async (req, res) => {
  const answers = req.body.answers;
  const final = req.body.final;
  let result = [];
  let resultno = 0;
  const { studentId, subtitleId, courseId } = req.query;
  let exerciseAnswers = {};
  if (final == "false") {
    exerciseAnswers = await Exam.findOne(
      { subtitleId: subtitleId },
      { questions: 1 }
    );
  } else {
    exerciseAnswers = await FinalExam.findOne(
      { courseId: courseId },
      { questions: 1 }
    );
  }
  exerciseAnswers.questions.forEach((question, index) => {
    if (question.answer === answers[index]) {
      result.push(question.answer);
      resultno++;
    } else {
      result.push("-" + question.answer);
    }
  });
  if (final == "false") {
    const test = await ExamResult.findOne({
      studentId: studentId,
      subtitleId: subtitleId,
      courseId: courseId,
    });
    if (test) {
      ExamResult.findOneAndUpdate(
        { studentId: studentId, subtitleId: subtitleId, courseId: courseId },
        { $set: { studentChoices: answers, result: resultno } },
        { new: true },
        function (err, docs) {
          if (err) console.log(err);
          else console.log("Updated User : ", docs);
        }
      );
    } else {
      ExamResult.create({
        studentId: studentId,
        subtitleId: subtitleId,
        studentChoices: answers,
        courseId: courseId,
        result: resultno,
      });
    }
  } else {
    const test = await FinalExamResult({
      studentId: studentId,
      courseId: courseId,
    });
    console.log(test);
    if (test !== null) {
      FinalExamResult.findOneAndUpdate(
        { studentId: studentId, courseId: courseId },
        { $set: { studentChoices: answers, result: resultno } },
        { new: true, upsert: true },
        function (err, docs) {
          console.log(docs);
          if (err) console.log(err);
          else console.log("Updated User : ", docs);
        }
      );
    } else {
      FinalExamResult.create({
        studentId: studentId,
        courseId: courseId,
        studentChoices: answers,
        result: resultno,
      });
      console.log("created");
    }
  }

  try {
    res.status(200).json({ result: result, resultno: resultno });
    console.log(resultno);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getFinalExamGrade = async (req, res) => {
  const { studentId, courseId } = req.query;
  const finalExam = await FinalExamResult.findOne(
    { studentId: studentId, courseId: courseId },
    { result: 1, studentChoices: 1 }
  );

  try {
    res.status(200).json(finalExam);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getExerciseGrade = async (req, res) => {
  const studentId = req.query["id"];
  const subtitleId = req.query["subtitleId"];
  const exercise = await ExamResult.findOne(
    {
      studentId: studentId,
      subtitleId: subtitleId,
    },
    { result: 1, studentChoices: 1 }
  ).exec();

  try {
    res.status(200).json(exercise);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateFieldUser = async (req, res) => {
  const { userId, firstname, lastname, minibio } = req.body;
  try {
    const user = await IndividualTrainee.findByIdAndUpdate(userId, {
      firstname: firstname,
      lastname: lastname,
      mini_bio: minibio,
    });
    res.status(200).json("updated succ");
  } catch (err) {
    res.status(500).json(err);
  }
};
const updateEmail = async (req, res) => {
  const { userId, email } = req.body;
  try {
    const user = await IndividualTrainee.findByIdAndUpdate(userId, {
      email: email,
    });
    res.status(200).json("updated succ");
  } catch (err) {
    res.status(500).json(err);
  }
};

const compareAnswers = async (req, res) => {
  const studentId = req.query["id"];
  const subtitleId = req.query["subtitleId"];
  const exerciseChoices = await ExamResult.findOne(
    {
      studentId: studentId,
      subtitleId: subtitleId,
    },
    { studentChoices: 1 }
  ).exec();

  const exerciseAnswers = await Exam.findOne(
    { subtitleId: subtitleId },
    { questions: 1 }
  );
  try {
    res.status(200).json({ exerciseChoices, exerciseAnswers });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const forgetPassword = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(500).json("bad request");
  }
  const oldUser = await IndividualTrainee.findOne({ email: email });
  const oldInstructor = await Instructor.findOne({ email: email });
  if (!oldUser && !oldInstructor) {
    return res.status(406).json("user not exists!!");
  }
  let randomCode = Math.floor(Math.random() * 899999 + 100000);
  if (oldUser) {
    const update = await IndividualTrainee.findByIdAndUpdate(oldUser._id, {
      verficationCode: randomCode,
    });
  } else {
    const update = await Instructor.findByIdAndUpdate(oldInstructor._id, {
      verficationCode: randomCode,
    });
  }
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.NO_REPLY_EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
  const mailOptions = {
    from: "canadian_chamber_of_commerce@gmail.com",
    to: email,
    subject: "Reset password",
    html: `${resetPassword(randomCode)}`,
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) return res.status(403).json("operation not supported");
    else return res.status(200).json("emailSet");
  });
};
const verifyCode = async (req, res) => {
  const { email, code } = req.body;
  const oldUser = await IndividualTrainee.findOne({ email: email });
  const oldInstructor = await Instructor.findOne({ email: email });
  if (oldUser) {
    if (oldUser.verficationCode == code) {
      return res.status(200).json("success");
    } else {
      return res.status(403).json("forbidden");
    }
  } else {
    if (oldInstructor.verficationCode == code) {
      return res.status(200).json("success");
    } else {
      return res.status(403).json("forbidden");
    }
  }
};
const changePassword = async(req,res)=>{
  const {password,email} = req.body;
  if (!email || !password) {
    return res.status(500).json("bad request");
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  try{
  const data = await IndividualTrainee.findOneAndUpdate({email:email},{password:hashedPassword});
   return res.status(200).json("success");
  }catch(err){
    return res.status(406).json(err);
  }
}

const rateInstructor = async (req, res) => {
  const { instId, userId, courseId, userRating, userReview } = req.body;
  if (!instId || !userId) {
    return res.status(400).json({ error: "Empty" });
  }
  try {
    const data = await Instructor.findById(instId).exec();
    let oldRating = parseInt(data.rating);
    let oldCount = parseInt(data.ratingCount);
    let x = parseInt(userRating);
    const exists = await Rating.findOne({
      userId: userId,
      state: false,
    }).exec();
    if (exists) {
      let currentRating = parseInt(exists.userRating);
      let newRating = oldRating - currentRating + x;
      const updateRating = await Rating.findOneAndUpdate(
        { userId: userId },
        { userRating: userRating, userReview: userReview },
        { new: true }
      ).exec();
      const updateInstructor = await Instructor.updateOne(
        { _id: instId },
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
        instId: instId,
      });
      const UpdatedRating = await Instructor.updateOne(
        { _id: instId },
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
        { $set: { "registered_courses.$.instRating": newRatingObj._id } }
      ).exec();
      res.status(200).json({ msg: "Rating added" });
    }
  } catch (err) {
    res.status(500).json({ msg: "can't update rating" });
  }
};
const updateITraineePassword = async (req, res) => {
  const { oldPass, newPass } = req.body;

  const id = req.query["id"];
  if (!oldPass || !newPass || !id) {
    return res.status(500);
  } else {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPass, salt);
    const user = await IndividualTrainee.findById(id);

    if (!user) return res.status(400).json({ msg: "User not exist" });
    bcrypt.compare(oldPass, user.password, (err, data) => {
      if (err) throw err;
      if (data) {
        user.password = hashedPassword;
        user.save();
        return res.status(200).json({ msg: "updated data" });
      } else {
        return res.status(401).json({ msg: "invalid credentials" });
      }
    });
  }
};

module.exports = {
  getTraineebyID,
  InprogressCourses,
  InprogressCoursebyId,
  getExerciseGrade,
  compareAnswers,
  updateITraineePassword,
  changePassword,
  submitExam,
  updateFieldUser,
  updateEmail,
  forgetPassword,
  verifyCode,
  getFinalExamGrade,
  rateInstructor
};
