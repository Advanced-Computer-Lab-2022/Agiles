const Admin = require("../models/Admin");
const IndividualTrainee = require("..//models/IndividualTrainee");
const CorporateTrainee = require("../models/CorporateTrainee");
const Instructor = require("../models/Instructor");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require('dotenv').config;


//authAdmin
function verifyAdminJWT (authHeader) {
  if (!authHeader) return res.sendStatus(401);
  const token = authHeader.split(' ')[1];
  jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET_ADMIN,
      (err, decoded) => {
          if (err) return err
      }
  );
}
//create admin
const createAdmin = async (req, res) => {
  const { username, password } = req.body;
  let verficationerror = verifyAdminJWT(req.headers['authorization']);
  if (!username || !password){
    return res.status(500).json({ msg: "bad request" });
  }
  else if (verficationerror){
    return res.status(401).json({ msg: "unauthorized" }); 
  }
  else{
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
            { "username": user.username },
            process.env.ACCESS_TOKEN_SECRET_ITRAINEE,
            { expiresIn: '900s' }
        );
          const refreshToken = jwt.sign(
            { username: user.username },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '1d' }
          );
          const status = 0;
           res.cookie('logged',true,{httpsOnly  : true ,maxAge : 24*60*60*1000})
           res.cookie('currentUser',user._id,{httpsOnly  : true ,maxAge : 24*60*60*1000})
           res.cookie('status',status);
           res.cookie('jwt',refreshToken,{httpsOnly  : true ,maxAge : 24*60*60*1000})
           res.status(200).json({accessToken});
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
            { "username": user.username },
            process.env.ACCESS_TOKEN_SECRET_INSTRUCTOR,
            { expiresIn: '900s' }
        );
          const refreshToken = jwt.sign(
            { username: user.username },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '1d' }
          );
          const status = 1;
          res.cookie('currentUser',user._id,{httpsOnly  : true ,maxAge : 24*60*60*1000})
          res.cookie('status',status);
           res.cookie('jwt',refreshToken,{httpsOnly  : true ,maxAge : 24*60*60*1000})
           res.status(200).json({accessToken});
        }
        else {
          return res.status(401).json({ msg: "invalid credencial" });
        }
      });
    });
  }
};
const signUp = async (req, res) => {
  const { username, email, password, firstname, lastname } = req.body;
  if (!username || !password || !email || !password || !firstname || !lastname)
    return res.status(400).json({ msg: "bad request" });

  const user = await CorporateTrainee.findOne({ username: username });
  const userTrainee = await IndividualTrainee.findOne({ username: username });
  const userInstructor = await Instructor.findOne({ username: username });
  if (user || userTrainee || userInstructor) {
    return res.status(409).json({ msg: "username already exists" });
  } else {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new IndividualTrainee({
      username: username,
      password: hashedPassword,
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
const logOut = async(req,res)=>{
  res.clearCookie('logged');
  res.clearCookie('currentUser');
  res.clearCookie('jwt');
  res.cookie('status',-1);
  res.status(200).json({msg : "logged out"});
}

module.exports = { createAdmin, logIn, signUp ,logOut };
