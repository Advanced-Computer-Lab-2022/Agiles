const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const instructorSchema = new Schema(
  {
    fullname:{
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      index: { unique: true },
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    gender:{
      type:String,
      required :false
    },
    country: {
      type: Number,
      required: false,
    },
    courseList: {
      type: Array,
      required: false,
      default:[]
    },
    money: {
      type: Number,
      required: false,
      default:0
    },
    rating: {
      type: Number,
      required: false,
    },
    mini_bio: {
      type: String,
      required: false,
      default:''
    },
  },
  { timestamps: true }
);

const Instructor = mongoose.model("Instructor", instructorSchema);
module.exports = Instructor;
