const mongoose = require("mongoose");
const Schema = mongoose.Schema;

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
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    cardholder_name: {
      type: String,
      required: true,
    },
    PAN: {
      type: String,
      required: true,
    },
    card_expiry_date: {
      type: String,
      required: true,
    },
    wallet_amount: {
      type: Number,
      required: true,
    },
    registered_courses: {
      type: [{ Number, Number }], // courseid , progress
      default: [],
    },
  },
  { timestamps: true }
);

const IndividualTrainee = mongoose.model(
  "IndividualTrainee",
  individualTraineeSchema
);
module.exports = IndividualTrainee;
