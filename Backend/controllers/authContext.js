require("dotenv").config;
const jwt = require("jsonwebtoken");
//generate access tokens
const generateTraineeAccessToken = (trainee) => {
    return jwt.sign(trainee, process.env.ACCESS_TOKEN_SECRET_ITRAINEE, {
        expiresIn: "30m",
    });
}
const generateInstructorAccessToken = (instructor) =>{
    return jwt.sign(instructor, process.env.ACCESS_TOKEN_SECRET_INSTRUCTOR, {
        expiresIn: "30m",
    });
}

const generateAdminAccessToken = (admin) =>{
    return jwt.sign(admin, process.env.ACCESS_TOKEN_SECRET_ADMIN, {
        expiresIn: "30m",
    });
}
//generate refresh tokens
const generateTraineeRefreshToken = (trainee) => {
    return jwt.sign(trainee, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: "30d",
    });
}
const isAuthAdmin = async(req,res)=>{
   const token = req.cookies.jwt;
   if (!token) return res.status(401).json({msg:"Unauthorized"});
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_ADMIN, (err, decoded) => {
      if (err) return res.status(401).json({msg:"Unauthorized"});
      else{res.status(200).json({msg:"Authorized"});}
    });
}
const isAuthTrainee = async(req,res)=>{
    const token = req.cookies['jwt'];
    if (!token) return res.status(401).json({msg:"Unauthorized"});
     jwt.verify(
       token,
       process.env.ACCESS_TOKEN_SECRET_ITRAINEE,
       (err, decoded) => {
         if (err) return res.status(401).json({msg:"Unauthorized"});
         else{res.status(200).json({msg:"Authorized"});}
       }
     );
 }
 const isAuthInstructor = async(req,res)=>{
    const token = req.cookies.jwt;
    if (!token) return res.status(401).json({msg:"Unauthorized"});
     jwt.verify(
       token,
       process.env.ACCESS_TOKEN_SECRET_INSTRUCTOR,
       (err, decoded) => {
         if (err) return res.status(401).json({msg:"Unauthorized"}); //invalid token
         else{res.status(200).json({msg:"Authorized"});}
       }
     );
 }
module.exports = {generateTraineeAccessToken, generateInstructorAccessToken,generateAdminAccessToken,isAuthAdmin,isAuthInstructor,isAuthTrainee};