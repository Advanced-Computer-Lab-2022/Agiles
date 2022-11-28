const IndividualTrainee = require("../models/IndividualTrainee");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const ExamResult = require("../models/ExamResult");
const Exam = require("../models/Exam");
const FinalExam = require("../models/FinalExam");
const FinalExamResult = require("../models/FinalExamResult");
function verifyItraineeJWT(authHeader) {
  //const authHeader = req.headers['authorization'];
  if (!authHeader) return true;
  const token = authHeader.split(" ")[1];
  jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET_ITRAINEE,
    (err, decoded) => {
      if (err) return err;
    }
  );
}

const getTraineebyID = async (req, res) => {
  const id = req.query.id;
  const Itrainee = await IndividualTrainee.findById(id);
  return res.status(200).json(Itrainee);
};
const InprogressCourses = async (req, res) => {
  let verficationerror = verifyItraineeJWT(req.headers["authorization"]);
  if (verficationerror) {
    return res.status(401).json({ msg: "Invalid Token" });
  } else {
    const id = req.params["id"];
    if (!id) return res.status(400).json({ msg: "bad request" });
    const courses = await IndividualTrainee.findById(id, {
      registered_courses: 1,
    }).populate("registered_courses.courseId");
    return res.status(200).json(courses);
  }
};

const submitExam = async (req, res) => {
  const answers = req.body.answers;
  const final = req.body.final;
  let result = [];
  let resultno = 0;
  const { studentId, subtitleId, courseId } = req.query;
  let exerciseAnswers = {};
  if (!final) {
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
  if (!final) {
    const test = await ExamResult.findOne({
      studentId: studentId,
      subtitleId: subtitleId,
      courseId: courseId,
    });
    if (test.studentChoices.length > 0) {
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
    if (test.studentChoices.length > 0) {
      FinalExamResult.findOneAndUpdate(
        { studentId: studentId, courseId: courseId },
        { $set: { studentChoices: answers, result: resultno } },
        { new: true },
        function (err, docs) {
          if (err) console.log(err);
          else console.log("Updated User : ", docs);
          console.log(test);
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
  try {
    const finalExam = await FinalExamResult.findOne(
      { studentId: studentId, courseId: courseId },
      { result: 1, studentChoices: 1 }
    );
    if (finalExam.studentChoices.length > 0) res.status(200).json(finalExam);
    else res.status(200).json({ result: null, studentChoices: 0 });
    console.log(finalExam);
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
  getExerciseGrade,
  compareAnswers,
  updateITraineePassword,
  submitExam,
  updateFieldUser,
  updateEmail,
  getFinalExamGrade,
};
