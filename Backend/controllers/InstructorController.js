const Instructor = require("../models/Instructor");
const bcrypt = require("bcrypt");
const Course = require("../models/Course");

function verifyInstructorJWT(authHeader) {
  if (!authHeader) return true;
  const token = authHeader.split(" ")[1];
  jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET_INSTRUCTOR,
    (err, decoded) => {
      if (err) return err; //invalid token
    }
  );
}
//create Instructor
const createInstructor = async (req, res) => {
  const { fullname, username, password, email, gender } = req.body;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const newInstructor = new Instructor({
    fullname: fullname,
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
  const id = req.query["id"];
  try {
    const courseAttr = await Course.find({ instructor: id }, { title: 1 });
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
            {
              $and: [
                { price: { $gte: lowerBound } },
                { price: { $lte: upperBound } },
              ],
            },
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
      $and: [{ price: { $gte: lowerBound } }, { price: { $lte: upperBound } }],
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

const getInstructorbyId = async (req, res) => {
  try {
    const instructor = await Instructor.findById(req.query["id"]).exec();
    res.status(200).send(instructor);
  } catch (err) {
    res.status(500).json({ mssg: "can't find Instructor" });
  }
};

const updateInstructorBio = async (req, res) => {
  try {
    await Instructor.findByIdAndUpdate(
      req.query["id"],
      { mini_bio: req.body.bio },
      function (err, docs) {
        if (err) {
          console.log(err);
        } else {
          console.log("Updated Instructor : ", docs);
        }
        res.status(200);
      }
    );
  } catch (err) {
    res.status(500).json({ msg: "can't update bio" });
  }
};

const updateInstructorEmail = async (req, res) => {
  try {
    await Instructor.findByIdAndUpdate(
      req.query["id"],
      { email: req.body.email },
      function (err, docs) {
        if (err) {
          console.log(err);
        } else {
          console.log("Updated Instructor : ", docs);
        }
        res.status(200);
      }
    );
  } catch (err) {
    res.status(500).json({ msg: "can't update email" });
  }
};

const updateInstructorPassword = async (req, res) => {
  const { oldPass, newPass } = req.body;

  const id = req.query["id"];
  if (!oldPass || !newPass || !id) {
    return res.status(500);
  } else {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPass, salt);
    const user = await Instructor.findById(id);

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

//---------------

module.exports = {
  createInstructor,
  listAllInstructorCoursesTitles,
  courseSearchByInstructor,
  filterCoursesByInstructor,
  getInstructorbyId,
  updateInstructorEmail,
  updateInstructorBio,
  updateInstructorPassword,
};
