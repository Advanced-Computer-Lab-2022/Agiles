const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const finalExamSchema = new Schema(
  {
    courseId: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    questions: {
      type: [Object],
      required: true,
    },
  },
  { timestamps: true }
);

const FinalExam = mongoose.model("FinalExam", finalExamSchema);
module.exports = FinalExam;
