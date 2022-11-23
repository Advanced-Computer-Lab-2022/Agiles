const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const registeredCourseSchema = new Schema({});
const individualTraineeSchema = new Schema(
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
    gender: {
      type: String,
      required: false,
    },
    country: {
      type: String,
      required: false,
    },
    registered_courses: [
      {
        courseId: {
          type: Schema.ObjectId,
          ref: "Course",
        },
        progress: {
          type: Number,
          min: 0,
          max: 100,
        },
      },
    ],
    accessToken: { type: String },
    refreshToken: { type: String },
  },
  { timestamps: true }
);

const IndividualTrainee = mongoose.model(
  "IndividualTrainee",
  individualTraineeSchema
);
module.exports = IndividualTrainee;
