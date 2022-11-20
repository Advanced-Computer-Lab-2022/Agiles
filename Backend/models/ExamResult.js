const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const examResultSchema = new Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: 'IndvidualTrainee',
      required: true,
    },
    courseId: {
      type: mongoose.Types.ObjectId,
      ref:'Course',
      required: true
    },
    examId: {
      type: mongoose.Types.ObjectId,
      ref:'Exam',
      required: true
    },
    result: {
      type: Number,
      required: true,
    },
    studentChoices: {
      type: Array,
    },
  },
  { timestamps: true }
);

const ExamResult = mongoose.model("ExamResult", examResultSchema);
module.exports = ExamResult;
