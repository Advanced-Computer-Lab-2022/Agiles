const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const courseSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    instructor: {
      type: String,
      required: true,
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
      required: true,
    },
    discount: {
      type: Number,
      required: false,
    },
    totalHourseOfCourse: {
      type: Number,
      required: true,
    },
    totalHourseOfSubtitle: {
      type: Number,
      required: true,
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
