const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const otpSchema = new Schema ({
    email : {
        type : String,
        required : true
    },
    otp:{
        type : String,
        required : true
    },
    createdAt : Date,
    expiresAt :Date
});
const OTP = mongoose.model("OTP",otpSchema);
module.exports = OTP ;