const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const examResultSchema = new Schema(
  {
    studentId: {
      type: Number,
      required: true,
    },
    courseId: {
      type: Number,
      required: true,
    },
    examId: {
      type: Number,
      required: true,
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
