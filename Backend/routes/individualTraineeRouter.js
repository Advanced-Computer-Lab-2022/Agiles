const express = require("express");
const IndividualTraineeRouter = express.Router();
const { isAuthTrainee } = require("../controllers/authContext");
const {
  reportProblem,
  viewReportedProblems,
  addFollowUp,
} = require("../controllers/CourseController");
const {
  courseExam,
  courseFinalExam,
  requestAccess,
  getTraineebyID,
  InprogressCourses,
  sendCertificate,
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
  updateLinkProgress,
  createCredit,
  deleteInstRating,
  deleteCredit,
  CreateCheckout,
  getAllItemsCourse,
  requestRefund,
  addNotesToTrainee,
  getNotes,
  deleteCourseRating,
  getTraineeProgress,
  getTraineeExams,
  getQuestions,
  addReply,
  askInstructor,
  payWithWallet,
} = require("../controllers/IndividualTraineeController");
const { verifyItraineeJWT } = require("../middleware/authMiddleware");
IndividualTraineeRouter.get(
  "/getQuestions",
  verifyItraineeJWT,
  getQuestions
);

IndividualTraineeRouter.post(
  "/askInstructor",
  verifyItraineeJWT,
  askInstructor
);
IndividualTraineeRouter.patch(
  "/addReply",
  verifyItraineeJWT,
  addReply
);
IndividualTraineeRouter.post(
  "/sendCertificate",
  verifyItraineeJWT,
  sendCertificate
);

IndividualTraineeRouter.get(
  "/getIndividualTraineebyId",
  verifyItraineeJWT,
  getTraineebyID
);
IndividualTraineeRouter.get(
  "/inprogress",
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
IndividualTraineeRouter.post(
  "/getTraineeExams",
  verifyItraineeJWT,
  getTraineeExams
);
IndividualTraineeRouter.get(
  "/getIndividualAnswers",
  verifyItraineeJWT,
  compareAnswers
);
IndividualTraineeRouter.get("/getNote", verifyItraineeJWT, getNotes);
IndividualTraineeRouter.patch(
  "/addNotes",
  verifyItraineeJWT,
  addNotesToTrainee
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
IndividualTraineeRouter.patch("/changePassword", changePassword); // forgetten password
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
IndividualTraineeRouter.delete(
  "/deleteRating",
  verifyItraineeJWT,
  deleteInstRating
);
IndividualTraineeRouter.delete(
  "/deleteCourseRating",
  verifyItraineeJWT,
  deleteCourseRating
);
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
IndividualTraineeRouter.post(
  "/create-checkout-session",
  verifyItraineeJWT,
  CreateCheckout
);
IndividualTraineeRouter.get(
  "/viewReportedProblems",
  verifyItraineeJWT,
  viewReportedProblems
);
IndividualTraineeRouter.post(
  "/updateLinkProgress",
  verifyItraineeJWT,
  updateLinkProgress
);
IndividualTraineeRouter.post(
  "/getAllItems",
  verifyItraineeJWT,
  getAllItemsCourse
);

IndividualTraineeRouter.post("/payWithWallet", verifyItraineeJWT, payWithWallet);

IndividualTraineeRouter.get(
  "/getTraineeProgress",
  verifyItraineeJWT,
  getTraineeProgress
);
//no auth
IndividualTraineeRouter.post("/forgotpassword", forgetPassword);
IndividualTraineeRouter.post("/verifyCode", verifyCode);
IndividualTraineeRouter.post("/requestAccess", requestAccess);
IndividualTraineeRouter.post("/requestRefund",verifyItraineeJWT, requestRefund);
IndividualTraineeRouter.patch("/addFollowUp", verifyItraineeJWT, addFollowUp);
IndividualTraineeRouter.get("/isAuth", isAuthTrainee);

module.exports = IndividualTraineeRouter;
