const Admin = require("../models/Admin")

//create admin 
const createAdmin = async (req , res)=>{
    const {username , password} = req.body;
    try {
      const admin = await  Admin.create({username,password})
      res.status(200).json(admin )
    } catch (error) {
        res.status(400).json ({error : error.message})
    }
};  

module.exports = createAdmin;