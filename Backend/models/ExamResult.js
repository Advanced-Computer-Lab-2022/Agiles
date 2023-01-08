const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const examResultSchema = new Schema(
  {
    studentId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    courseId: {
      type: mongoose.Types.ObjectId,
      ref:'Course',
      required: true
    },
    subtitleId: {
      type:mongoose.Types.ObjectId,
      required: true,
    },
    result: {
      type: Number,
    },
    studentChoices: {
      type: Array,
    },
  },
  { timestamps: true }
);

const ExamResult = mongoose.model("ExamResult", examResultSchema);
module.exports = ExamResult;
