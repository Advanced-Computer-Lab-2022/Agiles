const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const courseSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    subtitles: [
      {
        subtitle: { type: String, default: "" },
        time: { type: String, default: "h::mm:ss" },
        link: [{ type: mongoose.Schema.Types.ObjectId, ref: "Link" }],
      },
    ],
    subject: {
      type: String,
      required: false,
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
        userId: { type: mongoose.SchemaTypes.ObjectId ,ref:'IndividualTrainee', required: true },
        userRating: {type: Number,required: true,  min: 0,  max: 5,default: 0,},
        userReview: { type: String, default: "" },
      },
    ],
    description: {
      type: String,
      required: false,
    },
    instructor: {
      type: mongoose.Types.ObjectId,
      ref: "Instructor",
      required: true,
    },
    instructorname: {
      type: String,
      required: false,
    },
    price: {
      type: Number,
      required: true,
    },
    free: {
      type: Boolean,
      required: false,
    },
    coursePreviewUrl: {
      type: String,
      required: false,
      default: "",
    },
    language: {
      type: String,
      required: false,
    },
    discount: {
      type: Number,
      required: false,
      min: 0,
      max: 100,
    },
    discount_enddate: {
      type: Date,
    },
    totalHoursOfCourse: {
      type: Number,
      required: false,
    },
    exercises: {
      type: [{ type: mongoose.Types.ObjectId, ref: "Exam" }],
    },
    imgUrl: {
      type: String,
    },
  },
  { timestamps: true }
);

const Course = mongoose.model("Course", courseSchema);
module.exports = Course;
