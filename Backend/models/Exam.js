const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const examSchema = new Schema(
  {
    courseId: {
      type: mongoose.Types.ObjectId,
      ref:'Course',
      required: true;
    },
    questions: {
      type: [String],
      required: true,
    },
    answers: {
      type: Array,
      required: true,
    },
  },
  { timestamps: true }
);

const Exam = mongoose.model("Exam", examSchema);
module.exports = Exam;
