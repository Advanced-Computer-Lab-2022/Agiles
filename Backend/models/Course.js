const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const courseSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    subtitles: {
      type: String,
      required: false,
    },
    subject: {
      type: String,
      required: false,
    },
    rating: {
      type: Number,
      required: false,
      default: 0,
    },
    description: {
      type: String,
      required: false,
    },
    instructor: {
      type: String,
      required: false,
    },
    price: {
      type: Number,
      required: true,
    },free: {
      type: Boolean,
      required: true,
    },

    language: {
      type: String,
      required: false,
    },
    discount: {
      type: Number,
      required: false,
    },
    totalHoursOfCourse: {
      type: Number,
      required: false,
    },
    totalHoursOfSubtitles: {
      type: Number,
      required: false,
    },
    exercises: {
      type: [String],
    },
    rating_nums: {
      type: String,
    },
  },
  { timestamps: true }
);

const Course = mongoose.model("Course", courseSchema);
module.exports = Course;
