const mongoose = require ("mongoose");
const Schema = require("mongoose").Schema;

const ratingSchema = new Schema(
    {
        userId: {
          type: mongoose.SchemaTypes.ObjectId,
          ref: "IndividualTrainee",
          required: true,
        },
        userRating: {
          type: Number,
          required: true,
          default: 0,
          min: 0,
          max: 5,
        },
        userReview: { type: String, default: "" },
      }
);

const Rating = mongoose.model("Rating",ratingSchema);
module.exports = Rating;