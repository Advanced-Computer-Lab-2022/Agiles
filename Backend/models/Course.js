const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const courseSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    subTitles: {
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
    },
    description: {
      type: String,
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
    totalHourseOfCourse: {
      type: Number,
      required: false,
    },
    totalHourseOfSubtitle: {
      type: Number,
      required: false,
    },
    exercises: {
      type: [String],
    },
    promotion: {
      // check requirement 60
      type: Number,
    },
  },
  { timestamps: true }
);

const Course = mongoose.model("Course", courseSchema);
module.exports = Course;
