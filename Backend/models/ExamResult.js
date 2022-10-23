const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const examResultSchema = new Schema(
  {
    student_id: {
      type: Number,
      required: true,
    },
    course_id: {
      type: Number,
      required: true,
    },
    exam_id: {
      type: Number,
      required: true,
    },
    result: {
      type: Number,
      required: true,
    },
    student_choices: {
      type: Array,
    },
  },
  { timestamps: true }
);

const ExamResult = mongoose.model("ExamResult", examResultSchema);
module.exports = ExamResult;
