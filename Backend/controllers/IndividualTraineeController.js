const IndividualTrainee = require("../models/IndividualTrainee");
const ExamResult = require("../models/ExamResult");
const Rating = require("../models/Rating");
const FinalExamResult = require("../models/FinalExamResult");
const FinalExam = require("../models/FinalExam");
const Exam = require("../models/Exam");
const OTP = require("../models/OTP.js");
const Instructor = require("../models/Instructor");
const CreditCard = require("../models/CreditCard");
const CourseSubscriptionRequest = require("../models/CourseSubscriptionRequest");
const Course = require("../models/Course");
const CourseRefundRequest = require("../models/CourseRefundRequest");
const TraineeCourse = require("../models/TraineeCourse");
const TraineeQuestion = require("../models/TraineeQuestion");
const bcrypt = require("bcrypt");
const resetPassword = require("./ResetPassword");
require("dotenv").config();

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
var nodemailer = require("nodemailer");

const getNotes = async (req, res) => {
  const traineeId = req.user.id;
  let oldNotes = " ";
  const subtitleId = req["query"].subtitleId;
  const courseId = req["query"].courseId;
  const linkId = req["query"].linkId;

  if (!subtitleId || !linkId || !courseId || !traineeId) {
    return res.status(500).json("bad request");
  }
  try {
    const old = await TraineeCourse.findOne(
      {
        traineeId: traineeId,
        courseId: courseId,
        subtitleId: subtitleId,
        linkId: linkId,
      },
      { notes: 1 }
    );
    if (old) {
      oldNotes = old.notes;

      return res.status(200).json({ notes: oldNotes });
    }
  } catch (e) {
    return res.status(406).json("Data not found");
  }
};
const addNotesToTrainee = async (req, res) => {
  const subtitleId = req.body.subtitleId;
  const notes = req.body.notes;
  const courseId = req.body.courseId;
  const traineeId = req.user.id;
  const linkId = req.body.linkId;
  if (!subtitleId || !linkId || !courseId || !traineeId) {
    return res.status(500).json("bad request");
  }
  try {
    const updateNotes = await TraineeCourse.findOneAndUpdate(
      {
        traineeId: traineeId,
        courseId: courseId,
        subtitleId: subtitleId,
        linkId: linkId,
      },
      { $set: { notes: notes } },
      { new: true, upsert: true }
    );
    return res.status(200).json("Updated Notes");
  } catch {
    return res.status(406).json("Data not found");
  }
};

const getTraineebyID = async (req, res) => {
  const id = req.user.id;
  const Itrainee = await IndividualTrainee.findById(id).populate("creditCard");
  return res.status(200).json(Itrainee);
};
const InprogressCourses = async (req, res) => {
  const id = req.user.id;
  if (!id) return res.status(400).json({ msg: "bad request" });
  const courses = await IndividualTrainee.findById(id, {
    registered_courses: 1,
  })
    .populate("registered_courses.courseId")
    .populate("registered_courses.courseRating");
  return res.status(200).json(courses);
};
const InprogressCoursebyId = async (req, res) => {
  const id = req.user.id;
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

const  getAllItemsCourse = async (req, res) => {
  const courseId = req.body.courseId;
  let numberOfItems = 0;
  try {
    const course = await Course.findOne({ _id: courseId }, { subtitles: 1 });
    if (course) {
      course.subtitles.forEach((subtitle) => {
        numberOfItems += subtitle.link.length;
      });
      numberOfItems += course.subtitles.length + 1;
      res.status(200).json({ numberOfItems: numberOfItems });
    } else {
      return res.status(400).json({ msg: "bad request" });
    }
  } catch (err) {
    res.status(403).json({ msg: err.message });
  }
};

const updateLinkProgress = async (req, res) => {
  const courseId = req.body.courseId;
  const linkId = req.body.linkId;
  const studentId = req.user.id;
  const subtitle = req.body.subtitle;

  const completedItems = req.body.completedItems;
  let numberOfItems = 0;
  try {
    const course = await Course.findOne({ _id: courseId }, { subtitles: 1 });
    if (course) {
      course.subtitles.forEach((subtitle) => {
        numberOfItems += subtitle.link.length;
      });
      numberOfItems += course.subtitles.length + 1;
    } else {
      res.status(400).json({ msg: "bad request" });
    }

    const updatecourse = await Course.findOneAndUpdate(
      { _id: courseId },
      { $set: { numberOfItems: numberOfItems } },
      { new: true, upsert: true }
    );

    const linkprogress = await TraineeCourse.findOne(
      {
        traineeId: studentId,
        courseId: courseId,
        subtitleId: subtitle,
        linkId: linkId,
      },
      { progress: 1 }
    );
    if (linkprogress) {
      if (linkprogress.progress === 1)
        res.status(200).json({ progress: -1, numberOfItems: numberOfItems });
      return;
    }

    // const linkcourse = await Link.findOne({ _id: linkId },{progress:1});

    const progress = await TraineeCourse.findOneAndUpdate(
      {
        traineeId: studentId,
        courseId: courseId,
        subtitleId: subtitle,
        linkId: linkId,
      },
      { $set: { progress: completedItems } },
      { new: true, upsert: true }
    );

    const regcourse1 = await IndividualTrainee.findOneAndUpdate(
      { _id: studentId, "registered_courses.courseId": courseId },
      { $inc: { "registered_courses.$.progress": completedItems } },
      { new: true, upsert: true }
    );

    if (progress) {
      res.status(200).json({
        progress: completedItems,
        course: regcourse1,
        numberOfItems: numberOfItems,
      });
    } else {
      res.status(400).json({ msg: "bad request" });
    }
  } catch (err) {
    res.status(403).json({ msg: err.message });
  }
};

const getTraineeProgress = async (req, res) => {
  const traineeId = req.user.id;
  const courseId = req.body.courseId;
  try {
    const progress = await TraineeCourse.find({
      traineeId: traineeId,
      "registered_courses.courseId": courseId,
    });
    if (progress) {
      res.status(200).json({ progress: progress });
    } else {
      res.status(200).json({ progress: 0 });
    }
  } catch (err) {
    res.status(403).json({ msg: err.message });
  }
};

const submitExam = async (req, res) => {
  const answers = req.body.answers;
  const final = req.body.final;
  let result = [];
  let resultno = 0;
  let questions = 0;
  const { studentId, subtitleId, courseId } = req.query;
  let exerciseAnswers = {};
  if (final == "false") {
    exerciseAnswers = await Exam.findOne(
      { subtitleId: subtitleId },
      { questions: 1 }
    );
    questions = exerciseAnswers.questions.length;
  } else {
    exerciseAnswers = await FinalExam.findOne(
      { courseId: courseId },
      { questions: 1 }
    );
    questions = exerciseAnswers.questions.length;
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
        function (e, docs) {
          if (e) console.log(e);
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
        function (e, docs) {
          if (e) console.log(e);
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
    const regcourse = await IndividualTrainee.findOne(
      { _id: studentId, "registered_courses.courseId": courseId },
      { registered_courses: 1 }
    );
    const progress = regcourse.registered_courses[0].progress;
    const regcourse1 = await IndividualTrainee.findOneAndUpdate(
      { _id: studentId, "registered_courses.courseId": courseId },
      { $set: { "registered_courses.$.progress": progress + 1 } },
      { new: true, upsert: true }
    );
    res.status(200).json({
      questions: questions,
      result: result,
      resultno: resultno,
      progress: progress + 1,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getFinalExamGrade = async (req, res) => {
  const { studentId, courseId } = req.query;
  const finalExam = await FinalExamResult.findOne({
    studentId: studentId,
    courseId: courseId,
  });

  try {
    res.status(200).json(finalExam);
  } catch (error) {
    res.status(400).json({ error: error.message });
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

const getExerciseGrade = async (req, res) => {
  const studentId = req.query["id"];
  const subtitleId = req.query["subtitleId"];
  const exercise = await ExamResult.findOne({
    studentId: studentId,
    subtitleId: subtitleId,
  }).exec();

  try {
    res.status(200).json(exercise);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getTraineeExams = async (req, res) => {
  const studentId = req.user.id;
  const courseId = req.body.courseId;
  const exams = await ExamResult.find({
    studentId: studentId,
    courseId: courseId,
  }).exec();
  try {
    res.status(200).json(exams);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateFieldUser = async (req, res) => {
  const person = req.user;
  const { firstname, lastname, minibio } = req.body;
  try {
    const user = await IndividualTrainee.findByIdAndUpdate(person.id, {
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
  const { email } = req.body;
  try {
    const user = await IndividualTrainee.findByIdAndUpdate(req.user.id, {
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

const sendCertificate = async (req, res) => {
  const email = req.body.email;
  const courseName = req.body.courseName;
  if (!email) {
    return res.status(500).json("bad request");
  }
  const oldUser = await IndividualTrainee.findOne({ email: email });

  if (!oldUser) {
    return res.status(406).json("user not exists!!");
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
    subject: courseName,
    html: `<div>
    <h1>Dear ${oldUser.firstname} ${oldUser.lastname}</h1>
    <p>Thank you for completing the course ${courseName}.</p>
    <p>Here is your certificate.</p>
    <p>Best regards,</p>
    <p>Canadian Chamber of Commerce</p>
    <a href="https://ibb.co/2gpkhXb"><img src="https://i.ibb.co/TmNg2zC/certificate.png" alt="certificate" border="0"></a>
    </div>`,
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) return res.status(403).json("operation not supported");
    else return res.status(200).json("emailSet");
  });
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
  const oldUser = await IndividualTrainee.findOne({ email: email });
  try {
    if (oldUser) {
      const data = await IndividualTrainee.findOneAndUpdate(
        { email: email },
        { password: hashedPassword }
      );
    } else {
      const data = await Instructor.findOneAndUpdate(
        { email: email },
        { password: hashedPassword }
      );
    }

    return res.status(200).json("success");
  } catch (err) {
    return res.status(406).json(err);
  }
};

const rateInstructor = async (req, res) => {
  const { instId, userId, courseId, userRating, userReview } = req.body;
  if (!instId || !userId) {
    return res.status(500).json({ error: "Empty" });
  }
  try {
    const data = await Instructor.findById(instId).exec();
    let oldRating = parseInt(data.rating);
    let oldCount = parseInt(data.ratingCount);
    let x = parseInt(userRating);
    const exists = await Rating.findOne({
      userId: userId,
      instId: instId,
      state: false,
    }).exec();
    if (exists) {
      let currentRating = parseInt(exists.userRating);
      let newRating = oldRating - currentRating + x;
      const updateRating = await Rating.findOneAndUpdate(
        { userId: userId, instId: instId },
        { userRating: userRating, userReview: userReview },
        { new: true }
      ).exec();
      const updateInstructor = await Instructor.findByIdAndUpdate(instId, {
        $set: { rating: newRating },
      });
      return res.status(200).json({ msg: "Rating updated" });
    } else {
      let newRating = oldRating + x;
      let newCount = oldCount + 1;
      const newRatingObj = await Rating.create({
        userId: userId,
        userRating: userRating,
        userReview: userReview,
        instId: instId,
        state: false,
      });
      const updateInstructor = await Instructor.findByIdAndUpdate(instId, {
        $set: { rating: newRating, ratingCount: newCount },
      });
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
const deleteInstRating = async (req, res) => {
  const instId = req.query.instId;
  const userId = req.user.id;
  const rating = await Rating.findOneAndDelete({
    userId: userId,
    instId: instId,
    state: false,
  });
  const oldRating = rating ? rating.userRating : 0;
  const REMOVERATING = await Instructor.findOneAndUpdate(
    { _id: instId },
    { $inc: { rating: -oldRating } }
  );
  const REOMVECOUNT = await Instructor.findOneAndUpdate(
    { _id: instId },
    { $inc: { ratingCount: -1 } }
  );
  res.status(200).json("deleted");
};
const deleteCourseRating = async (req, res) => {
  const courseId = req.query.courseId;
  const userId = req.user.id;
  const rating = await Rating.findOneAndDelete({
    userId: userId,
    courseId: courseId,
    state: true,
  });
  const oldRating = rating ? rating.userRating : 0;
  const REMOVERATING = await Course.findOneAndUpdate(
    { _id: courseId },
    { $inc: { rating: -oldRating } }
  );
  const REOMVECOUNT = await Course.findOneAndUpdate(
    { _id: courseId },
    { $inc: { ratingCount: -1 } }
  );
  res.status(200).json("deleted");
};
const updateITraineePassword = async (req, res) => {
  const { oldPass, newPass } = req.body;
  if (!oldPass || !newPass) {
    return res.status(500);
  } else {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPass, salt);
    const user = await IndividualTrainee.findById(req.user.id);

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
const CreateCheckout = async (req, res) => {
  const { courseId } = req.body;
  if (!courseId) {
    return res.status(500).json("bad request");
  }
  const course = await Course.findById(courseId);
  const price =
    parseInt(course.price) -
    (parseInt(course.price) * parseInt(course.discount)) / 100;
  const title = course.title;
  const desccription = course.description;
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: title,
              description: desccription,
              images: [course.imgUrl],
            },
            unit_amount: price * 100,
          },
          quantity: 1,
        },
      ],
      metadata: {
        courseId: courseId,
      },
      client_reference_id: req.user.id,
      mode: "payment",
      custom_text: {
        submit: { message: "30-Day Money-Back Guarantee" },
      },
      success_url: "http://localhost:3000/success",
      cancel_url: "http://localhost:3000/cancel",
    });
    return res.status(200).json({ url: session.url });
  } catch (err) {
    return res.status(500).json("server error");
  }
};
const payWithWallet = async (req, res) => {
  const { courseId } = req.body;
  const id = req.user.id;
  if (!courseId) {
    return res.status(500).json("bad request");
  }
  const course = await Course.findById(courseId);
  const user = await IndividualTrainee.findById(id);
  let price = course.price - (course.discount * course.price) / 100;
  if (!user) {
    return res.status(500).json("bad request");
  }
  try {
    await IndividualTrainee.updateOne(
      { _id: id },
      {
        $push: {
          registered_courses: { courseId: courseId, purchasedPrice: price },
        },
        $inc: { wallet: -price },
      }
    );
    const month = new Date().getMonth();
    const exists = await Instructor.findOne({
      _id: course.instructor,
      "wallet.month": month,
    });
    if (!exists) {
      await Instructor.updateOne(
        { _id: course.instructor },
        {
          $push: { wallet: { amount: (price * 70) / 100, month: month } },
          $inc: { studentCount: 1 },
        }
      );
    } else {
      await Instructor.updateOne(
        { _id: course.instructor, "wallet.month": month },
        { $inc: { "wallet.$.amount": (price * 70) / 100 } }
      );
      await Instructor.updateOne(
        { _id: course.instructor },
        { $inc: { studentCount: 1 } }
      );
    }
    await Course.updateOne(
      { _id: courseId },
      { studentCount: course.studentCount + 1 }
    );
    return res.status(200).json("success");
  } catch (err) {
    return res.status(500).json("server error");
  }
};

const requestAccess = async (req, res) => {
  const { courseId, traineeId } = req.body;
  if (!courseId || !traineeId) {
    return res.status(500).json("bad request");
  }
  const trainee = await IndividualTrainee.findById(traineeId);
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

const requestRefund = async (req, res) => {
  const { courseId, reason } = req.body;
  if (!courseId || !reason) {
    return res.status(500).json("bad request");
  }
  const newRequest = {
    traineeId: req.user.id,
    courseId: courseId,
    reason: reason,
  };
  try {
    const request = await CourseRefundRequest.findOne({
      traineeId: newRequest.traineeId,
      courseId: newRequest.courseId,
    });

    if (request) {
      return res.status(200).json("already requested");
    } else {
      await CourseRefundRequest.create(newRequest);
      return res.status(200).json("success");
    }
  } catch (err) {
    return res.status(406).json(err);
  }
};

const askInstructor = async (req, res) => {
  const { courseId, traineeId, question } = req.body;
  if (!courseId || !traineeId || !question) {
    return res.status(500).json("bad request");
  }
  const newRequest = {
    traineeId: traineeId,
    courseId: courseId,
    question: question,
  };
  try {
    const model = await TraineeQuestion.create(newRequest);
    return res.status(200).send(model);
  } catch (err) {
    return res.status(406).json(err);
  }
};

const addReply = async (req, res) => {
  const { questionId, reply } = req.body;
  if (!questionId || !reply) {
    return res.status(500).json("bad request");
  }
  try {
    await TraineeQuestion.findByIdAndUpdate(questionId, {
      $push: { replies: { reply: reply, isInstructor: false } },
    });
    return res.status(200).json("success");
  } catch (err) {
    return res.status(406).json(err);
  }
};

const getQuestions = async (req, res) => {
  const { courseId, traineeId } = req["query"];
  if (!courseId || !traineeId) {
    return res.status(500).json("bad request");
  }

  try {
    const questions = await TraineeQuestion.find({
      courseId: courseId,
      traineeId: traineeId,
    })
      .populate("traineeId courseId")
      .sort("-createdAt")
      .exec();
    res.status(200).send(questions);
  } catch (err) {
    return res.status(406).json(err);
  }
};
const checkAccess = async (req, res) => {
  const { traineeId, courseId } = req["query"];
  let approved = await CourseSubscriptionRequest.exists({
    traineeId: traineeId,
    courseId: courseId,
    status: "approved",
  });
  if (approved) {
    res.send("request approved").status(200);
  } else {
    let pending = await CourseSubscriptionRequest.exists({
      traineeId: traineeId,
      courseId: courseId,
      status: "pending",
    });
    if (pending) {
      res.send("pending Access").status(200);
    } else {
      res.send("request Access").status(200);
    }
  }
};
const checkSumbitted = async(req,res)=>{
  const studentId = req.user.id;
  const {courseId,subtitleId} = req.body;
  const course = await ExamResult.find({courseId:courseId,subtitleId:subtitleId,studentId:studentId});
  if(course?.length>0){
    return res.status(200).json({result:true});
  }
  else{
    return res.status(200).json({result:false});
  }
}
module.exports = {
  checkAccess,
  getQuestions,
  addReply,
  askInstructor,
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
  deleteInstRating,
  deleteCourseRating,
  updateLinkProgress,
  createCredit,
  deleteCredit,
  CreateCheckout,
  requestRefund,
  getAllItemsCourse,
  addNotesToTrainee,
  getNotes,
  payWithWallet,
  courseExam,
  courseFinalExam,
  getTraineeProgress,
  getTraineeExams,
  sendCertificate,
  checkSumbitted
};
