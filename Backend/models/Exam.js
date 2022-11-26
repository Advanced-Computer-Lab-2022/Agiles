const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const examSchema = new Schema(
  {
    courseId: {
      type: mongoose.Types.ObjectId,
      ref:'Course',
      required: true,
    },
    subtitleId: {
      type:mongoose.Types.ObjectId,
      required: true,
    },
    questions:[
      {content:{
      type: String,
      required: true,
    },
   firstChoice:{
    type: String,
    required: true,
  },
  secondChoice:{
    type: String,
    required: true,
  },
  thirdChoice:{
    type: String,
    required: true,
  },
  fourthChoice:{
    type: String,
    required: true,
  },
   answer: {
    type: String,
    required: true,
  },}
  ],
  },
  { timestamps: true }
);

const Exam = mongoose.model("Exam", examSchema);
module.exports = Exam;
