const Instructor = require("../models/Instructor");
const bcrypt = require("bcrypt");
const Course = require("../models/Course");
const Link = require("../models/Link");
const Rating = require("../models/Rating");
const IndividualTrainee = require("../models/IndividualTrainee");

//create Instructor

const listAllInstructorCoursesTitles = async (req, res) => {
  const id = req.params["id"];
  try {
    const courseAttr = await Course.where("instructor").equals(id);
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
    const instructor = await Instructor.findById(req.query["id"])
      .populate("reviews")
      .exec();
    const reviews = await Rating.find({
      state: false,
      instId: req.query["id"],
    }).populate("userId");
    const result = {
      firstField: instructor,
      secondField: reviews,
    };
    res.status(200).send(result);
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
const uploadSubLink = async (req, res) => {
  const { courseId, subId, linkDesc, linkUrl, allowed } = req.body;
  if (!courseId || !subId) {
    return res.status(400).json({ msg: "missing data" });
  }
  const newlink = new Link({
    linkUrl: linkUrl,
    linkDesc: linkDesc,
    allowed: allowed,
  });

  try {
    const data = await Link.create(newlink);
    const dataFinal = await Course.updateOne(
      { _id: courseId, "subtitles._id": subId },
      { $push: { "subtitles.$.link": data._id } },
      { new: true }
    );
    res.status(200).json(dataFinal);
  } catch (err) {
    res.status(500).json({ msg: "can't update links" });
  }
};
const deletLink = async (req, res) => {
  const { linkId, courseId, subId } = req.body;
  try {
    const data = await Link.findByIdAndRemove(linkId);
    const dataFinal = await Course.deleteOne(
      { _id: courseId, "subtitles._id": subId, "subtitles.$ink": linkId },
      { $pull: { "subtitles.$.link": linkId } },
      { new: true }
    );
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ mssg: "no such Id" });
  }
};
const uploadPreLink = async (req, res) => {
  const { courseId, coursePreviewUrl } = req.body;
  if (!courseId || !coursePreviewUrl) {
    return res.status(400).json({ msg: "missing data" });
  }
  try {
    const course = await Course.findByIdAndUpdate(courseId, {
      coursePreviewUrl: coursePreviewUrl,
    });
    res.status(200).json("updated");
  } catch (err) {
    res.status(500).json({ msg: "can't update links" });
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
  listAllInstructorCoursesTitles,
  courseSearchByInstructor,
  filterCoursesByInstructor,
  getInstructorbyId,
  updateInstructorEmail,
  updateInstructorBio,
  updateInstructorPassword,
  uploadSubLink,
  uploadPreLink,
  deletLink
};
