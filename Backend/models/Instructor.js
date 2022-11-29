const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const instructorSchema = new Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
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
    verficationCode :{
      type:String,
      min:10000,
      max:99999
    },
    courseList: [{ type: Schema.Types.ObjectId, ref: "Course" }],
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
        userId: { type: mongoose.SchemaTypes.ObjectId, ref:'IndividualTrainee' , required:true },
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
