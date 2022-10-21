const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const examSchema = new Schema(
  {
    course_id: {
      type: Number,
      required: true,
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
