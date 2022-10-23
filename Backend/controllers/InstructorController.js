const Instructor = require("../models/Instructor");
const bcrypt = require("bcrypt");

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

module.exports = createInstructor;
