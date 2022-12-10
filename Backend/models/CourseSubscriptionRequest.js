const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CourseRequestSchema = new Schema(
  {
    traineeId: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "IndividualTrainee",
    },
    courseId: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "Course",
    },
    email: {
      type: String,
      required: true,
    },
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "pending",
    },
  },
  { timestamps: true }
);

const CourseRequestSubscription = mongoose.model(
  "CourseRequestSubscription",
  CourseRequestSchema
);
module.exports = CourseRequestSubscription;
