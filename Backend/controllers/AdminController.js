const Admin = require("../models/Admin");
const IndividualTrainee = require("..//models/IndividualTrainee");
const CourseSubscriptionRequest = require("../models/CourseSubscriptionRequest");
const Instructor = require("..//models/Instructor");
const Course = require("../models/Course");
const Report = require("../models/Report");
const CourseRefundRequest = require("../models/CourseRefundRequest");
const TraineeCourse = require("../models/TraineeCourse");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
  generateTraineeAccessToken,
  generateInstructorAccessToken,
  generateAdminAccessToken,
} = require("./authContext");
require("dotenv").config;

//create admin
const createAdmin = async (req, res) => {
  const { username, password } = req.body;
  const exists = await Admin.findOne({ username: username });
  if (exists) {
    return res.status(409).json({ msg: "username already exists" });
  }
  if (!username || !password) {
    return res.status(500).json({ msg: "bad request" });
  } else {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newAdmin = new Admin({
      username: username,
      password: hashedPassword,
    });
    try {
      const admin = await Admin.create(newAdmin);
      res.status(200).json(admin);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
};
//create Instructor
const createInstructor = async (req, res) => {
  const { firstname, lastname, username, password, email, gender } = req.body;
  const userTrainee = await IndividualTrainee.findOne({ username: username });
  const userInstructor = await Instructor.findOne({ username: username });
  if (userTrainee || userInstructor) {
    return res.status(409).json({ msg: "username already exists" });
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const newInstructor = new Instructor({
    firstname: firstname,
    lastname: lastname,
    username: username,
    password: hashedPassword,
    email: email,
    gender: gender,
  });
  try {
    const instructor = await Instructor.create(newInstructor);
    res.status(200).json(instructor);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
//create Corporate
const createCorporate = async (req, res) => {
  const { firstname, lastname, username, password, email, gender } = req.body;
  const userTrainee = await IndividualTrainee.findOne({ username: username });
  const userInstructor = await Instructor.findOne({ username: username });
  if (userTrainee || userInstructor) {
    return res.status(409).json({ msg: "username already exists" });
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const newCorporate = new IndividualTrainee({
    firstname: firstname,
    lastname: lastname,
    username: username,
    state: true,
    password: hashedPassword,
    email: email,
    gender: gender,
  });
  try {
    const corporate = await IndividualTrainee.create(newCorporate);
    res.status(200).json(corporate);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
//Login
const logIn = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res.status(400).json({ msg: "bad request" });
  if (await IndividualTrainee.exists({ username: username })) {
    await IndividualTrainee.findOne({ username: username }).then((user) => {
      if (!user) return res.status(400).json({ msg: "User not exist" });
      bcrypt.compare(password, user.password, (err, data) => {
        if (err) throw err;
        if (data) {
          const accessToken = generateTraineeAccessToken({
            id: user._id,
            username: user.username,
          });
          const refreshToken = jwt.sign(
            { username: user.username },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: "1d" }
          );
          let status = 0;
          if (user.state) {
            status = 2;
          }
          res.cookie("currentUser", user._id, {
            maxAge: 24 * 60 * 60 * 1000,
          });
          res.cookie("status", status, {
            maxAge: 24 * 60 * 60 * 1000,
          });
          res.cookie("jwt", accessToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
          });
          res.status(200).json(user);
        } else {
          return res.status(401).json({ msg: "invalid credencial" });
        }
      });
    });
  } else if (await Instructor.exists({ username: username })) {
    await Instructor.findOne({ username: username }).then((user) => {
      if (!user) return res.status(400).json({ msg: "User not exist" });
      bcrypt.compare(password, user.password, (err, data) => {
        if (err) throw err;
        if (data) {
          const accessToken = generateInstructorAccessToken({
            id: user._id,
            username: user.username,
          });
          const refreshToken = jwt.sign(
            { username: user.username },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: "1d" }
          );
          const status = 1;
          res.cookie("currentUser", user._id, {
            maxAge: 24 * 60 * 60 * 1000,
          });
          res.cookie("status", status, {
            maxAge: 24 * 60 * 60 * 1000,
          });
          res.cookie("jwt", accessToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
          });
          res.status(200).json(user);
        } else {
          return res.status(401).json({ msg: "invalid credencial" });
        }
      });
    });
  } else {
    await Admin.findOne({ username: username }).then((user) => {
      if (!user) return res.status(400).json({ msg: "User not exist" });
      bcrypt.compare(password, user.password, (err, data) => {
        if (err) throw err;
        if (data) {
          const accessToken = generateAdminAccessToken({
            id: user._id,
            username: user.username,
          });
          const status = 3;
          res.cookie("status", status, {
            maxAge: 24 * 60 * 60 * 1000,
          });
          res.cookie("jwt", accessToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
          });
          res.status(200).json(user);
        } else {
          return res.status(401).json({ msg: "invalid credencial" });
        }
      });
    });
  }
};

//signUp
const signUp = async (req, res) => {
  const { username, email, password, firstname, lastname } = req.body;
  if (!username || !password || !email || !password || !firstname || !lastname)
    return res.status(400).json({ msg: "bad request" });
  const userTrainee = await IndividualTrainee.findOne({ username: username });
  const userInstructor = await Instructor.findOne({ username: username });
  if (userTrainee || userInstructor) {
    return res.status(409).json({ msg: "username already exists" });
  } else {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new IndividualTrainee({
      username: username,
      password: hashedPassword,
      state: false,
      email: email,
      firstname: firstname,
      lastname: lastname,
    });
    try {
      const user = await IndividualTrainee.create(newUser);
      res.status(200).json({ msg: "signup successeded" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
};

// logOut
const logOut = async (req, res) => {
  res.clearCookie("currentUser");
  res.clearCookie("jwt");
  res.clearCookie("status");
  res.status(200).json({ msg: "logged out" });
};
const accessRequests = async (req, res) => {
  requests = await CourseSubscriptionRequest.find({})
    .populate("traineeId courseId")
    .sort("-createdAt")
    .exec();
  res.send(requests).status(200);
};

const refundRequests = async (req, res) => {
  requests = await CourseRefundRequest.find({})
    .populate("traineeId courseId")
    .sort("-createdAt")
    .exec();

  res.send(requests).status(200);
};
const grantAccess = async (req, res) => {
  const { traineeId, courseId } = req.body;
  console.log(traineeId);
  console.log(courseId);
  const course = await Course.findById(courseId);
  const instructor = await Instructor.findById(course.instructor);
  const profit =
    parseInt(course.price) -
    (parseInt(course.price) * parseInt(course.discount)) / 100;
  try {
    await IndividualTrainee.findByIdAndUpdate(traineeId, {
      $push: { registered_courses: { courseId: courseId } },
    });
    // await Instructor.updateOne(
    //   { _id: course.instructor },
    //   { wallet: instructor.wallet + profit }
    // );
    await Course.updateOne(
      { _id: courseId },
      { studentCount: course.studentCount + 1 }
    );
    await CourseSubscriptionRequest.findOneAndUpdate(
      { traineeId: traineeId, courseId: courseId },
      { status: "approved" }
    );
    return res.status(200).json("access granted");
  } catch (error) {
    return res.status(406).json(error);
  }
};

const getReports = async (req, res) => {
  requests = await Report.find({})
    .populate("userId courseId")
    .sort("-createdAt")
    .exec();
  res.send(requests).status(200);
};

const acceptRefund = async (req, res) => {
  const { traineeId, courseId } = req.body;
  const course = await Course.findById(courseId);
  const instructor = await Instructor.findById(course.instructor);
  const refundAmount =
    parseInt(course.price) -
    (parseInt(course.price) * parseInt(course.discount)) / 100;
  try {
    await IndividualTrainee.findByIdAndUpdate(traineeId, {
      $pull: { registered_courses: { courseId: courseId } },
    });
    await Instructor.updateOne(
      { _id: course.instructor },
      { wallet: instructor.wallet - refundAmount }
    );
    await Course.updateOne(
      { _id: courseId },
      { studentCount: course.studentCount - 1 }
    );
    await CourseRefundRequest.findOneAndUpdate(
      { traineeId: traineeId, courseId: courseId },
      { status: "approved" }
    );
    return res.status(200).json("refund done");
  } catch (error) {
    return res.status(406).json(error);
  }
};
const viewReport = async (req, res) => {
  const { reportId } = req.body;
  Report.findByIdAndUpdate(reportId, {
    isSeen: false,
  });
};
const resolveReport = async (req, res) => {
  const { reportId } = req.body;
  await Report.findByIdAndUpdate(reportId, {
    status: "resolved",
  });
};
module.exports = {
  resolveReport,
  viewReport,
  accessRequests,
  createAdmin,
  createInstructor,
  logIn,
  createCorporate,
  signUp,
  logOut,
  grantAccess,
  acceptRefund,
  refundRequests,
  getReports,
};
