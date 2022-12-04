require("dotenv").config;
const jwt = require("jsonwebtoken");
//generate access tokens
const generateTraineeAccessToken = (trainee) => {
    return jwt.sign(trainee, process.env.ACCESS_TOKEN_SECRET_ITRAINEE, {
        expiresIn: "15m",
    });
}
const generateInstructorAccessToken = (instructor) =>{
    return jwt.sign(instructor, process.env.ACCESS_TOKEN_SECRET_INSTRUCTOR, {
        expiresIn: "15m",
    });
}

const generateAdminAccessToken = (admin) =>{
    return jwt.sign(admin, process.env.ACCESS_TOKEN_SECRET_ADMIN, {
        expiresIn: "20m",
    });
}
//generate refresh tokens
const generateTraineeRefreshToken = (trainee) => {
    return jwt.sign(trainee, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: "30d",
    });
}
module.exports = {generateTraineeAccessToken, generateInstructorAccessToken,generateAdminAccessToken};