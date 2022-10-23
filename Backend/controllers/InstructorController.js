const Instructor = require("../models/Instructor");
const bcrypt = require("bcrypt");
const Course = require("../models/Course");

//create Instructor
const createInstructor = async (req, res) => {
  const { username, password } = req.body;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const newInstructor = new Instructor({
    username: username,
    password: hashedPassword,
  });
  try {
    const instructor = await Instructor.create(newInstructor);
    res.status(200).json(instructor);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const listAllInstructorCoursesTitles = async (req, res) => {
  const username = req.query["username"];
  console.log("username: " + username);
  try {
    const courseAttr = await Course.find(
      { instructor: username },
      { title: 1 }
    );
    res.status(200).send(courseAttr);
  } catch (err) {
    res.status(500).json({ mssg: "can't find courses" });
  }
};

module.exports = { createInstructor, listAllInstructorCoursesTitles };
