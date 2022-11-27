const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const instructorSchema = new Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    secondename: {
      type: String,
      required: false,
    },
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
    gender: {
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
      default: [],
    },
    money: {
      type: Number,
      required: false,
      default: 0,
    },
    rating: {
      type: Number,
      required: false,
      default: 3,
    },
    ratingCount: {
      type: Number,
      required: false,
      default: 1,
    },
    reviews: [
      {
        userId: { type: mongoose.SchemaTypes.ObjectId },
        userRating: { type: Number, required: true, default: 0 , min : 0 , max :5 },
        userReview: { type: String, default: "" },
      },
    ],
    mini_bio: {
      type: String,
      required: false,
      default: "",
    },
  },
  { timestamps: true }
);

const Instructor = mongoose.model("Instructor", instructorSchema);
module.exports = Instructor;
