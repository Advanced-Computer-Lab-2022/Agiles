const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const instructorSchema = new Schema({
    username: {
      type: String,
      required: true,
    },
    password :{
      type : String ,
      required : true
    },
    email: {
      type: String,
      required: false
    },
    rating :{
      type : Number ,
      required : false
    },
    reviews : {
      type : String ,
      required : false 
    },
    age: {
      type: Number,
      required: false,
    },
    bornIn: {
      type: String,
      required: false
    },
    livesIn: {
      type: String,
      required: false
    },
    phoneNumber: {
      type: String,
      required: false
    }
  },({timestamps : true}));
  
  const Instructor = mongoose.model('Instructor', instructorSchema);
  module.exports = Instructor; 