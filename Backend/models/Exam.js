const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const examSchema = new Schema(
  {
    subtitleId: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    questions: {
      type: [Object],
      required: true,
    },
    courseId: {
      type: mongoose.Types.ObjectId,
      ref: "Course",
      required: true,
    }
  },
  
  { timestamps: true }
);

const Exam = mongoose.model("Exam", examSchema);
module.exports = Exam;
