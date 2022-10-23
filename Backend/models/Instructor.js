const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const instructorSchema = new Schema(
  {
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
      required: false,
    },
    country: {
      type: Number,
      required: false,
    },
    courseList: {
      type: Array,
      required: false,
    },
    money: {
      type: Number,
      required: false,
    },
    rating: {
      type: Number,
      required: false,
    },
    mini_bio: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

const Instructor = mongoose.model("Instructor", instructorSchema);
module.exports = Instructor;
