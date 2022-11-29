const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const examResultSchema = new Schema(
  {
    studentId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    courseId: {
      type: Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    result: {
      type: Number,
      required: true,
    },
    studentChoices: {
      type: Array,
      required: true,
    },
  },
  { timestamps: true }
);

const FinalExamResult = mongoose.model("FinalExamResult", examResultSchema);
module.exports = FinalExamResult;
