const Admin = require("../models/Admin");
const IndividualTrainee = require("..//models/IndividualTrainee");
const CorporateTrainee = require("../models/CorporateTrainee");
const bcrypt = require("bcrypt");

//create admin
const createAdmin = async (req, res) => {
  const { username, password } = req.body;
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
};
const logIn = async (req, res) => {
  const { username, password } = req.body;
  IndividualTrainee.findOne({ username: username }).then((user) => {
    if (!user) return res.status(400).json({ msg: "User not exist" });
    bcrypt.compare(password, user.password, (err, data) => {
      if (err) throw err;
      if (data) return res.status(200).json({ msg: "Login success" });
      else {
        return res.status(401).json({ msg: "invalid credencial" });
      }
    });
  });
};
const signUp = async (req, res) => {
  const { username, email, password, firstname, lastname } = req.body;
  const user = await CorporateTrainee.findOne({ username: username });
  const userTrainee = await IndividualTrainee.findOne({ username: username });
  if (user || userTrainee){
    return res.status(403).json({ msg: "username already exists" });
  }
  else {
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

module.exports = { createAdmin, logIn, signUp };
