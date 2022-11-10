const Corporate = require("../models/CorporateTrainee");
const bcrypt = require("bcrypt");

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

module.exports = createCorporate;
