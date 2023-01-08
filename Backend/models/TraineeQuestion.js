const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const questionSchema = new Schema(
  {
    traineeId: {
      type: mongoose.Types.ObjectId,
      required: false,
      ref: "IndividualTrainee",
    },
    courseId: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "Course",
    },

    question: {
      type: String,
      required: true,
    },
    replies: {
      type: [Object], // true = Instructor , false = Trainee
      default: [],
    },
  },
  { timestamps: true }
);

const TraineeQuestion = mongoose.model("TraineeQuestion", questionSchema);
module.exports = TraineeQuestion;
