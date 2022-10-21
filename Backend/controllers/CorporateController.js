const Corporate = require("../models/CorporateTrainee")

//create Corporate 
const createCorporate = async (req , res)=>{
    const {username , password} = req.body;
    try {
      const corporate = await  Corporate.create({username,password})
      res.status(200).json(corporate)
    } catch (error) {
        res.status(400).json ({error : error.message})
    }
};  

module.exports = createCorporate;