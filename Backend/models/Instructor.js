const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const instructorSchema = new Schema({
    userName: {
      type: String,
      required: true,
    },
    password :{
      type : String ,
      required : true
    },
    Email: {
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
    Age: {
      type: Number,
      required: false,
    },
    BornIn: {
      type: String,
      required: false
    },
    LivesIn: {
      type: String,
      required: false
    },
    PhoneNumber: {
      type: String,
      required: false
    }
  },({timestamps : true}));
  
  const Instructor = mongoose.model('Instructor', instructorSchema);
  module.exports = Instructor; 