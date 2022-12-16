const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const refundSchema = new Schema(
  {
    traineeId: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "IndividualTrainee",
    },
    courseId: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "Course",
    },
    status: {
      type: String,
      default: "pending",
    },
  },
  { timestamps: true }
);

const CourseRefundRequest = mongoose.model(
  "CourseRefundRequest",
  refundSchema
);
module.exports = CourseRefundRequest;
