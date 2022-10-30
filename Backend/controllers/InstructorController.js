const Instructor = require("../models/Instructor");
const bcrypt = require("bcrypt");
const Course = require("../models/Course");

//create Instructor
const createInstructor = async (req, res) => {
  const { fullname, username, password, email, gender } = req.body;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const newInstructor = new Instructor({
    fullName: fullname,
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

const filterCoursesByInstructor = async (req, res) => {
  const lowerBound = req.query["lowerBound"];
  const upperBound = req.query["upperBound"];
  const subjects = req.query["subject"];
  const username = req.query["username"];

  let courses = [];
  if (upperBound && !lowerBound) {
    lowerBound = 0;
  }

  if (lowerBound && !upperBound) {
    upperBound = Number.MAX_VALUE;
  }
  if (lowerBound && subjects) {
    courses = await Course.find({
      $and: [
        {
          $and: [
            {$and: [
              {price: { $gte: lowerBound }},
              {price: { $lte: upperBound }}
              ]}  ,
            { instructor: username },
          ],
        },
        { subject: subjects },
      ],
    })
      .sort({ price: 1 })
      .exec();
  } else if (lowerBound) {
    courses = await Course.find({
      $and: [
        {price: { $gte: lowerBound }},
        {price: { $lte: upperBound }}
        ]  ,
      instructor: username,
    })
      .sort({ price: 1 })
      .exec();
  } else if (subjects) {
    courses = await Course.find({ subject: subjects, instructor: username })
      .sort({ price: 1 })
      .exec();
  }

  if (!courses) {
    res.status(400).json({ error: "Empty" });
  } else {
    res.status(200).json(courses);
  }
};

const courseSearchByInstructor = async (req, res) => {
  const search = req.query["search"];
  const instructor = req.query["instructor"];
  courses = await Course.find({
    $and: [
      {
        $or: [
          { subject: { $regex: new RegExp(search, "i") } },
          { title: { $regex: new RegExp(search, "i") } },
        ],
      },
      { instructor: instructor },
    ],
  });

  if (!courses) {
    res.status(400).json({ error: "Empty" });
  } else {
    res.status(200).json(courses);
  }
};

module.exports = {
  createInstructor,
  listAllInstructorCoursesTitles,
  courseSearchByInstructor,
  filterCoursesByInstructor,
};
