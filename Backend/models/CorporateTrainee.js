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
      required: false,
    },
    fullname: {
      type: String,
      required: false,
    },
    gender: {
      type: String,
      required: false,
    },
    country: {
      type: String,
      required: false,
    },

    registered_courses: {
      type: [{ Number, Number }], // courseid , progress
      default: [],
    },
  },
  { timestamps: true }
);

const CorporateTrainee = mongoose.model(
  "CorporateTrainee",
  corporateTraineeSchema
);
module.exports = CorporateTrainee;
