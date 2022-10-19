const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const instructorSchema = new Schema({
    Name: {
      type: String,
      required: true,
    },
    Email: {
      type: String,
      required: true
    },
    Age: {
      type: Number,
      required: true,
    },
    BornIn: {
      type: String,
      required: true
    },
    LivesIn: {
      type: String,
      required: true
    },
    PhoneNumber: {
      type: String,
      required: true
    }
  },);
  
  const Instructor = mongoose.model('Instructor', instructorSchema);
  module.exports = Instructor;  