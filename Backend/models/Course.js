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
        time: { type: Number, default:0},
        link: [{ type: mongoose.Schema.Types.ObjectId, ref: "Link" }],
      },
    ],
    numberOfItems: { type: Number, default: 1 },
    subject: {
      type: String,
      required: false,
    },
    average_rating: {
      type: Number,
      default: 1,
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
      default : 0
    },
    discount_enddate: {
      type: Date,
    },
    totalHoursOfCourse: {
      type: Number,
      default:0,
      required: false,
    },
    exercises: {
      type: [{ type: mongoose.Types.ObjectId, ref: "Exam" }],
    },
    imgUrl: {
      type: String,
    },
    studentCount :{
      type: Number,
      default:0
    }
  },
  { timestamps: true }
);

courseSchema.pre("save", function () {
  if (this.ratingCount == 0) {
    this.average_rating = 0;
  } else {
    this.average_rating = (this.rating / this.ratingCount) % 1;
  }
});

const Course = mongoose.model("Course", courseSchema);
module.exports = Course;
