const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reportSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    courseId: {
      type: mongoose.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    reportType: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String, //pending/resolved
      default: "pending",
    },
    isSeen: {
      type: Boolean,
      default: false,
    },
    followUp: {
      type: [String],
    },
  },
  { timestamps: true }
);

const Report = mongoose.model("Report", reportSchema);
module.exports = Report;
