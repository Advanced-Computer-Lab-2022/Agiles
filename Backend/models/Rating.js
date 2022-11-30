const mongoose = require ("mongoose");
const Schema = require("mongoose").Schema;

const ratingSchema = new Schema(
    {
        userId: {
          type: mongoose.Types.ObjectId,
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
        state :{type :Boolean , default : false,required:true}
      }
);

const Rating = mongoose.model("Rating",ratingSchema);
module.exports = Rating;