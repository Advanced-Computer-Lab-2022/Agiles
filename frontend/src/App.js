import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Courses from "./pages/Course/Courses";
import Login from "./pages/Login";
import SignUp from "./pages/Signup";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Admin from "./pages/Admin/Admin";
import AddAdmin from "./pages/Admin/AddAdmin";
import AddInstructor from "./pages/Admin/AddInstructor";
import AddCorporate from "./pages/Admin/AddCorporate";
import CreateCourse from "./pages/Course/CreateCourse";
import SetExam from "./pages/Instructor/SetExam";
import SetFinalExam from "./pages/Instructor/SetFinalExam";
import SearchResults from "./pages/Course/SearchResults";
import Course from "./pages/Course/Course";
import FilterResults from "./pages/Course/FilterResults";
import InstructorTerms from "./pages/Instructor/InstructorTerms";
import CourseExam from "./pages/Course/CourseExam";
import Profile from "./pages/Trainee/Profile";
import Subtitle from "./pages/Course/SubtitleView";
import CoursePreInst from "./pages/Instructor/CoursePreInst";
import CourseConInst from "./pages/Instructor/CourseConInst";
import CoursePreview from "./components/CoursePreview";
import CourseContent from "./components/CourseContent";
import CourseFinalExam from "./pages/Course/CourseFinalExam";
import AccountSecurity from "./pages/Trainee/AccountSecurity";
import PaymentMethods from "./pages/Trainee/PaymentMethods";
import ForgetPassword from "./pages/Trainee/ForgetPassword";
import UpdateForgottenPassword from "./pages/Trainee/UpdateForgottenPassword";
import Inprogress from "./components/Inprogress";
import InstructorOwnCourses from "./pages/Instructor/InstructorOwnCourses";
import ReportProblem from "./pages/Course/ReportProblem";
import PrevReports from "./pages/Course/PrevReports";
import PrevReportsTrainee from "./pages/Course/PrevReportsTrainee";
import ViewRequests from "./pages/Admin/adminComponents/ViewRequests";
import RefundRequests from "./pages/Admin/adminComponents/RefundRequests";
import ViewReports from "./pages/Admin/adminComponents/ViewReports";
import UserTerms from "./pages/Trainee/UserTerms";
import Reviews from "./pages/Trainee/Reviews";
import Wallet from "./pages/Trainee/Wallet";
import PreviewProfile from "./pages/Instructor/PreviewProfile";
import Sucess from "./components/Sucess";
import Cancel from "./components/Cancel";
import RequireAuth from "./RequireAuth";
import Forbidden from "./pages/Forbidden";
import SetPromotion from "./pages/Admin/adminComponents/SetPromotion";
import Certificate from "./pages/Course/Certificate";
function App() {
  const [showNav, setShowNav] = useState(true);
  const ROLES = {
    TRAINEE: 0,
    INSTRUCTOR: 1,
    CORPORATE: 2,
    ADMIN: 3,
  };
  return (
    <div className="App">
      <BrowserRouter>
        {showNav && (
          <nav>
            <Navbar />
          </nav>
        )}
        <div className="pages">
          <Routes>
            <Route index element={<Home />}></Route>
            <Route path="/login" element={<Login />} />
            <Route path="/forgotpassword" element={<ForgetPassword />} />
            <Route path="/updateforgotpassword"  element={<UpdateForgottenPassword />}/>
            <Route path="/signup" element={<SignUp />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/course" element={<Course />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/courses/filter" element={<FilterResults />} />
            <Route path="/previewprofile" element={<PreviewProfile />} />
            <Route path="/instructor/terms" element={<InstructorTerms />} />
            <Route path="/user/terms" element={<UserTerms />} />
            <Route path="/forbidden" element={<Forbidden />} />

            <Route element={<RequireAuth allowedRoles={[ROLES.ADMIN]} />}>
              <Route path="/admin" element={<Admin funcNav={setShowNav} />}>
                <Route path="dashboard" />
                <Route path="addInstructor" element={<AddInstructor />} />
                <Route path="addAdmin" element={<AddAdmin />} />
                <Route path="addCorporate" element={<AddCorporate />} />
                <Route path="viewRequests" element={<ViewRequests />} />
                <Route path="RefundRequests" element={<RefundRequests />} />
                <Route path="ViewReports" element={<ViewReports />} />
                <Route path="setPromotion" element={<SetPromotion />} />
                <Route path="filter" element={<SetPromotion filter={true} />} />
              </Route>
            </Route>

            <Route element={<RequireAuth allowedRoles={[ROLES.TRAINEE,ROLES.CORPORATE]} />}>
              <Route path="/mylearning" element={<Inprogress />} />
              <Route path="/grades" element={<CourseContent />} />
              <Route path="/preReg" element={<CoursePreview />} />
              <Route path="/conReg" element={<CourseContent />} />
              <Route path="/paymentMethods" element={<PaymentMethods />} />
              <Route path="/finalexam" element={<CourseFinalExam />} />
              <Route path="/CourseExam" element={<CourseExam />} />
              <Route path="/success" element={<Sucess />} />
              <Route path="/cancel" element={<Cancel />} />
              <Route path="/PrevReportsTrainee" element={<PrevReportsTrainee />}/>
              <Route path="/certificate" element={<Certificate />} />
            </Route>

            <Route element={<RequireAuth allowedRoles={[ROLES.INSTRUCTOR]} />}>
              <Route path="/createcourse" element={<CreateCourse />} />
              <Route path="/mycourses"element={<InstructorOwnCourses />}></Route>
              <Route path="/setExam" element={<SetExam />} />
              <Route path="/preInst" element={<CoursePreInst />} />
              <Route path="/conInst" element={<CourseConInst />} />
              <Route path="/setFinalExam" element={<SetFinalExam />} />
              <Route path="/PrevReports" element={<PrevReports />} />
            </Route>

            <Route element={<RequireAuth allowedRoles={[ROLES.INSTRUCTOR, ROLES.TRAINEE, ROLES.CORPORATE]} />}> 
              <Route path="/profile" element={<Profile />} />
              <Route path="/accountsettings" element={<AccountSecurity />} />
              <Route path="/reviews" element={<Reviews />} />
              <Route path="/wallet" element={<Wallet />} />
              <Route path="/subtitleView" element={<Subtitle />} />
              <Route path="/reportproblem" element={<ReportProblem />} />
            </Route>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
