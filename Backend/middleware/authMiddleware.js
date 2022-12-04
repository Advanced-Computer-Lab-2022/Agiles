const jwt = require('jsonwebtoken');
require("dotenv").config();

//authAdmin
function verifyAdminJWT(req,res,next) {
   const token = req.cookies.jwt;
   if (!token) return res.status(401).json({msg:"Unauthorized"});
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_ADMIN, (err, decoded) => {
      if (err) return res.status(401).json({msg:"Unauthorized"});
      else{
        next();
      }
    });
  }
//auth instructor
function verifyInstructorJWT(req,res,next) {
    const token = req.cookies.jwt;
   if (!token) return res.status(401).json({msg:"Unauthorized"});
    jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET_INSTRUCTOR,
      (err, decoded) => {
        if (err) return res.status(401).json({msg:"Unauthorized"}); //invalid token
        else{
            next();
        }
      }
    );
  }
  function verifyItraineeJWT(req,res,next) {
   const token = req.cookies['jwt'];
   if (!token) return res.status(401).json({msg:"Unauthorized"});
    jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET_ITRAINEE,
      (err, decoded) => {
        if (err) return res.status(401).json({msg:err});
        else{
            next();
        }
      }
    );
  }

  module.exports = {verifyAdminJWT,verifyInstructorJWT,verifyItraineeJWT};