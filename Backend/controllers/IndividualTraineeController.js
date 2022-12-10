const IndividualTrainee = require("../models/IndividualTrainee");
const ExamResult = require("../models/ExamResult");
const Instructor = require("../models/Instructor");
const Rating = require("../models/Rating");
const FinalExamResult = require("../models/FinalExamResult");
const FinalExam = require("../models/FinalExam");
const Exam = require("../models/Exam");
const OTP = require("../models/OTP.js");
const CreditCard = require("../models/CreditCard");
const CourseSubscriptionRequest = require("../models/CourseSubscriptionRequest");
const bcrypt = require("bcrypt");
const resetPassword = require("./ResetPassword");
require("dotenv").config();
var nodemailer = require("nodemailer");
const Course = require("../models/Course");


const getTraineebyID = async (req, res) => {
  const id = req.query.id;
  const Itrainee = await IndividualTrainee.findById(id).populate("creditCard");
  return res.status(200).json(Itrainee);
};
const InprogressCourses = async (req, res) => {
  const id = req.params["id"];
  if (!id) return res.status(400).json({ msg: "bad request" });
  const courses = await IndividualTrainee.findById(id, {
    registered_courses: 1,
  })
    .populate("registered_courses.courseId")
    .populate("registered_courses.courseRating");
  return res.status(200).json(courses);
};
const InprogressCoursebyId = async (req, res) => {
  const id = req.body.id;
  const courseId = req.body.courseId;
  if (!id) return res.status(400).json({ msg: "bad request" });
  const courses = await IndividualTrainee.findOne(
    { _id: id, "registered_courses.courseId": courseId },
    {
      registered_courses: 1,
    }
  )
    .populate("registered_courses.courseId")
    .populate("registered_courses.instRating");
  const reviews = await Rating.find({
    state: true,
    courseId: courseId,
  }).populate("userId");
  const result = {
    firstField: courses,
    secondField: reviews,
  };
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
    }
  }

  try {
    res.status(200).json({ result: result, resultno: resultno });
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
  const randomCode = Math.floor(Math.random() * 899999 + 100000) + "";
  const salt = await bcrypt.genSalt(10);
  const hashedCode = await bcrypt.hash(randomCode, salt);
  await OTP.deleteMany({ email: email });
  const otp = new OTP({
    email: email,
    otp: hashedCode,
    createdAt: Date.now(),
    expiresAt: Date.now() + 60000,
  });
  const data = await OTP.create(otp);
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
  const data = await OTP.findOne({ email: email });
  if (!data) return res.status(498).json("expired");
  const expiresAt = data.expiresAt;
  if (expiresAt < Date.now()) {
    await OTP.deleteMany({ email: email });
    return res.status(498).json("expired");
  }
  const isValid = await bcrypt.compare(code, data.otp);
  if (!isValid) return res.status(406).json("inCorrect code");
  else {
    await OTP.deleteMany({ email: email });
    return res.status(200).json("sucess");
  }
};
const changePassword = async (req, res) => {
  const { password, email } = req.body;
  if (!email || !password) {
    return res.status(500).json("bad request");
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  try {
    const data = await IndividualTrainee.findOneAndUpdate(
      { email: email },
      { password: hashedPassword }
    );
    return res.status(200).json("success");
  } catch (err) {
    return res.status(406).json(err);
  }
};

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
const createCredit = async (req, res) => {
  const user = req.user;
  const id = user.id;
  const { cardName, cardNumber, cardExpiryDate, CVV } = req.body;
  if (!cardNumber || !cardExpiryDate || !CVV) {
    return res.status(500).json("bad request");
  }
  const exists = await CreditCard.findOne({ cardNumber: cardNumber });
  if (exists) {
    return res.status(406).json("card already exists");
  }
  const data = {
    userId: id,
    cardName: cardName,
    cardNumber: cardNumber,
    cardExpiryDate: cardExpiryDate,
    CVV: CVV,
  };
  try {
    const cretidCard = await CreditCard.create(data);
    const update = await IndividualTrainee.updateOne(
      { _id: id },
      { $push: { creditCard: cretidCard._id } }
    );
    return res.status(200).json("Credit Card added");
  } catch (err) {
    return res.status(406).json("server error");
  }
};
const deleteCredit = async (req, res) => {
  const id = req.params["id"];
  const user = req.user;
  try {
    const deleted = await CreditCard.deleteOne({ _id: id });
    const ans = await IndividualTrainee.updateOne(
      { _id: user.id },
      { $pull: { creditCard: id } }
    );
    return res.status(200).json(ans);
  } catch (err) {
    return res.status(406).json("server error");
  }
};
const payForCourse = async (req, res) => {
  const user = req.user;
  const { courseId, create } = req.body;
  if (!courseId) {
    return res.status(500).json("bad request");
  }
      const course = await Course.findById(courseId);
      const instructor = await Instructor.findById(course.instructor);
      const profit = parseInt(course.price) - parseInt(course.price)*parseInt(course.discount)/100;
  if (create) {
    const id = user.id;
    const { cardName, cardNumber, cardExpiryDate, CVV } = req.body;
    if (!cardNumber || !cardExpiryDate || !CVV) {
      return res.status(500).json("bad request");
    }
    const exists = await CreditCard.findOne({ cardNumber: cardNumber });
    if (exists) {
      return res.status(406).json("card already exists");
    }
    const data = {
      userId: id,
      cardName: cardName,
      cardNumber: cardNumber,
      cardExpiryDate: cardExpiryDate,
      CVV: CVV,
    };
    try {
      const cretidCard = await CreditCard.create(data);
      await IndividualTrainee.updateOne(
        { _id: id },
        { $push: { creditCard: cretidCard._id } }
      );
    } catch (error) {
      return res.status(406).json(error);
    }
  }
  try {
    await IndividualTrainee.findByIdAndUpdate(user.id, {
      $push: { registered_courses: { courseId: courseId } },
    });
        await Instructor.updateOne({_id:course.instructor},{wallet : instructor.wallet+profit});
        await Course.updateOne({_id:courseId},{studentCount : course.studentCount+1});
    return res.status(200).json("payment completed");
  } catch (error) {
    return res.status(406).json(error);
  }
};

const requestAccess = async (req, res) => {
  const { courseId, traineeId } = req.body;
  if (!courseId || !traineeId) {
    return res.status(500).json("bad request");
  }
  const trainee = await IndividualTrainee.findById(traineeId);
  console.log(trainee.email);
  const newRequest = {
    traineeId: trainee._id,
    courseId: courseId,
    email: trainee.email,
    firstname: trainee.firstname,
    lastname: trainee.lastname,
  };
  try {
    await CourseSubscriptionRequest.create(newRequest);
    return res.status(200).json("success");
  } catch (err) {
    return res.status(406).json(err);
  }
};

module.exports = {
  requestAccess,
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
  rateInstructor,
  createCredit,
  deleteCredit,
  payForCourse,
};
