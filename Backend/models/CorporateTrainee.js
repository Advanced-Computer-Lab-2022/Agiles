const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const corporateTraineeSchema = new Schema(
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
        },courserating: {
          type: Number,
          min: 0,
          max: 5,
        },
        instrating: {
          type: Number,
          min: 0,
          max: 5,
        },
      },
    ],
  },
  { timestamps: true }
);

const CorporateTrainee = mongoose.model(
  "CorporateTrainee",
  corporateTraineeSchema
);
module.exports = CorporateTrainee;
