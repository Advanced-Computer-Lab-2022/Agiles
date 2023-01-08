//create model

const mongoose = require("mongoose");

const traineeCourseSchema = new mongoose.Schema({
  traineeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "IndividualTrainee",
    required: true,
  },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  subtitleId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subtitle",
    required: true,
  },
  linkId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Link",
    required: true,
  },
  progress: {
    type: Number,
    min: 0,
    max: 1,
    default: 0,
  },
  notes: {
    type: String,
  },
});

const TraineeCourse = mongoose.model("TraineeCourse", traineeCourseSchema);
module.exports = TraineeCourse;
