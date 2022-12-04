const Admin = require("../models/Admin");
const IndividualTrainee = require("..//models/IndividualTrainee");
const Instructor = require("../models/Instructor");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config;

//create admin
const createAdmin = async (req, res) => {
  const { username, password } = req.body;
  let verficationerror = verifyAdminJWT(req.headers["authorization"]);
  const exists = await Admin.findOne ({username : username});
  if (exists){
    return res.status(409).json({msg : "username already exists"});
  }
  if (!username || !password) {
    return res.status(500).json({ msg: "bad request" });
  } else if (verficationerror) {
    return res.status(401).json({ msg: "unauthorized" });
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
  const { firstname,lastname, username, password, email, gender } = req.body;
  const userTrainee = await IndividualTrainee.findOne({ username: username });
  const userInstructor = await Instructor.findOne({ username: username });
  if (userTrainee || userInstructor) {
    return res.status(409).json({ msg: "username already exists" });}
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
  const { firstname,lastname , username, password,email,gender} = req.body;
  const userTrainee = await IndividualTrainee.findOne({ username: username });
  const userInstructor = await Instructor.findOne({ username: username });
  if (userTrainee || userInstructor) {
    return res.status(409).json({ msg: "username already exists" });}
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const newCorporate = new IndividualTrainee({
    firstname :firstname,
    lastname:lastname,
    username: username,
    state : true,
    password: hashedPassword,
    email : email,
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
          const accessToken = jwt.sign(
            { username: user.username },
            process.env.ACCESS_TOKEN_SECRET_ITRAINEE,
            { expiresIn: "3000000s" }
          );

          const refreshToken = jwt.sign(
            { username: user.username },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: "1d" }
          );
          let status =0;
          if (data.state){status = 2;}
          res.cookie("username", user.firstname, {
            maxAge: 24 * 60 * 60 * 1000,
          });
          res.cookie("logged", true, {
            maxAge: 24 * 60 * 60 * 1000,
          });
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
          res.status(200).json({ accessToken });
        } else {
          return res.status(401).json({ msg: "invalid credencial" });
        }
      });
    });
  } else {
    await Instructor.findOne({ username: username }).then((user) => {
      if (!user) return res.status(400).json({ msg: "User not exist" });
      bcrypt.compare(password, user.password, (err, data) => {
        if (err) throw err;
        if (data) {
          const accessToken = jwt.sign(
            { username: user.username },
            process.env.ACCESS_TOKEN_SECRET_INSTRUCTOR,
            { expiresIn: "3000000s" }
          );
          const refreshToken = jwt.sign(
            { username: user.username },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: "1d" }
          );
          const status = 1;
          res.cookie("username", user.firstname, {
            maxAge: 24 * 60 * 60 * 1000,
          });
          res.cookie("logged", true, {
            maxAge: 24 * 60 * 60 * 1000,
          });
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
          res.status(200).json({ accessToken });
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
      state : false,
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
  res.clearCookie("logged");
  res.clearCookie("currentUser");
  res.clearCookie("jwt");
  res.cookie("status", -1);
  res.status(200).json({ msg: "logged out" });
};

module.exports = { createAdmin,createInstructor,logIn,createCorporate,signUp, logOut };
