const Corporate = require("../models/CorporateTrainee");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
require('dotenv').config();
const ExamResult = require("../models/ExamResult");
//authorize Corporate
function verifyCorporateJWT  (authHeader) {
  if (!authHeader) return true;
  const token = authHeader.split(' ')[1];
  jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET_CORPORATE,
      (err, decoded) => {
          if (err) return err; //invalid token
        
      }
  );
}
const express = require("express");
const Exam = require("../models/Exam")


const getTraineebyID = async (req,res) => {
  const id = req.query["id"];
  return await Corporate.findById(id);
};

//create Corporate
const createCorporate = async (req, res) => {
  const { fullname , username, password,email,gender} = req.body;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const newCorporate = new Corporate({
    fullname :fullname,
    username: username,
    password: hashedPassword,
    email : email,
    gender: gender,
  });
  try {
    const corporate = await Corporate.create(newCorporate);
    res.status(200).json(corporate);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//get exercise grade



const getExerciseGrade = async (req, res) => {
  const studentId = req.query["id"];
  const subtitleId = req.query["subtitleId"];
  const exercise = await ExamResult.findOne(
    {
      studentId: studentId,
      subtitleId: subtitleId,
    },
    { result: 1 }
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

  const exercise = await Exam.findById(subtitleId, { questions: 1 });
  try {
    res.status(200).json({ exerciseChoices, exercise });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {createCorporate,getExerciseGrade,compareAnswers};
