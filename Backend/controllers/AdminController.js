const Admin = require("../models/Admin")
const bcrypt = require("bcrypt");

//create admin 
const createAdmin = async (req , res)=>{
    const {username , password} = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newAdmin = new Admin({
      username : username,
      password : hashedPassword
    })
    try {
      const admin = await  Admin.create(newAdmin)
      res.status(200).json(admin )
    } catch (error) {
        res.status(400).json ({error : error.message})
    }
};  

module.exports = createAdmin;