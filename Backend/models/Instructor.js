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
    verficationCode: {
      type: String,
      min: 10000,
      max: 99999,
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
    averageRating: {
      type: Number,
      default: 1,
    },
    reviews: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Rating" }],
    mini_bio: {
      type: String,
      required: false,
      default: "",
    },
    wallet: Number,
    imgUrl: {
      type: String,
    },
  },
  { timestamps: true }
);

instructorSchema.pre("save", function () {
  if (this.ratingCount == 0) {
    this.average_rating = 0;
  } else {
    this.average_rating = (this.rating / this.ratingCount) % 1;
  }
});

const Instructor = mongoose.model("Instructor", instructorSchema);
module.exports = Instructor;
