const express = require("express");
const IndividualTraineeRouter = express.Router();
const {
  courseExam,
  courseFinalExam,
  reportProblem,
  viewReportedProblems,
} = require("../controllers/CourseController");
const {
  requestAccess,
  getTraineebyID,
  InprogressCourses,
  getExerciseGrade,
  compareAnswers,
  updateITraineePassword,
  submitExam,
  updateFieldUser,
  updateEmail,
  forgetPassword,
  verifyCode,
  getFinalExamGrade,
  InprogressCoursebyId,
  changePassword,
  rateInstructor,
  createCredit,
  deleteCredit,
  CreateCheckout,
  requestRefund,
} = require("../controllers/IndividualTraineeController");
const { verifyItraineeJWT } = require("../middleware/authMiddleware");

IndividualTraineeRouter.get(
  "/getIndividualTraineebyId",
  verifyItraineeJWT,
  getTraineebyID
);
IndividualTraineeRouter.get(
  "/inprogress/:id",
  verifyItraineeJWT,
  InprogressCourses
);
IndividualTraineeRouter.post(
  "/inprogressCourse",
  verifyItraineeJWT,
  InprogressCoursebyId
);
IndividualTraineeRouter.get(
  "/getIndividualExerciseGrade",
  verifyItraineeJWT,
  getExerciseGrade
);
IndividualTraineeRouter.get(
  "/getIndividualAnswers",
  verifyItraineeJWT,
  compareAnswers
);
IndividualTraineeRouter.patch(
  "/updateBasics",
  verifyItraineeJWT,
  updateFieldUser
);
IndividualTraineeRouter.patch("/updateEmail", verifyItraineeJWT, updateEmail);
IndividualTraineeRouter.patch(
  "/updatePassword",
  verifyItraineeJWT,
  updateITraineePassword
);
IndividualTraineeRouter.patch(
  "/changePassword",
  verifyItraineeJWT,
  changePassword
);
IndividualTraineeRouter.post("/submitExam", verifyItraineeJWT, submitExam);
IndividualTraineeRouter.get("/courseExam", verifyItraineeJWT, courseExam);
IndividualTraineeRouter.get(
  "/courseFinalExam",
  verifyItraineeJWT,
  courseFinalExam
);
IndividualTraineeRouter.get(
  "/getFinalExamGrade",
  verifyItraineeJWT,
  getFinalExamGrade
);
IndividualTraineeRouter.post("/setRating", verifyItraineeJWT, rateInstructor);
IndividualTraineeRouter.post(
  "/reportProblem",
  verifyItraineeJWT,
  reportProblem
);
IndividualTraineeRouter.post("/createCredit", verifyItraineeJWT, createCredit);
IndividualTraineeRouter.delete(
  "/deleteCredit/:id",
  verifyItraineeJWT,
  deleteCredit
);
IndividualTraineeRouter.post("/create-checkout-session", verifyItraineeJWT, CreateCheckout);
IndividualTraineeRouter.get(
  "/viewReportedProblems",
  verifyItraineeJWT,
  viewReportedProblems
);
//no auth
IndividualTraineeRouter.post("/forgotpassword", forgetPassword);
IndividualTraineeRouter.post("/verifyCode", verifyCode);
IndividualTraineeRouter.post("/requestAccess", requestAccess);
IndividualTraineeRouter.post("/requestRefund", requestRefund);

module.exports = IndividualTraineeRouter;
