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
  },
  { timestamps: true }
);

const Exam = mongoose.model("Exam", examSchema);
module.exports = Exam;
