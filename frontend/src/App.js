import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
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
import InstructorRating from "./pages/Course/InstructorRating.js";
import { useState } from "react";
import Profile from "./pages/Trainee/Profile"
import Subtitle from "./pages/Course/SubtitleView";
import CoursePreInst from "./pages/Instructor/CoursePreInst";
import CourseConInst from "./pages/Instructor/CourseConInst";
import CoursePreview from "./components/CoursePreview";
import CourseContent from "./components/CourseContent";
import CourseFinalExam from "./pages/Course/CourseFinalExam";
import InstructorProfile from "./pages/Instructor/InstructorProfile";
import AccountSecurity from "./pages/Trainee/AccountSecurity"
import PaymentMethods from "./pages/Trainee/PaymentMethods"
import ForgetPassword from "./pages/Trainee/ForgetPassword"
import UpdateForgottenPassword from "./pages/Trainee/UpdateForgottenPassword";
function App() {
  const [showNav, setShowNav] = useState(true);
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
            <Route index element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgotpassword" element={<ForgetPassword/>} />
            <Route path="/updateforgotpassword" element={<UpdateForgottenPassword/>} />
            <Route path="/signup" element={<SignUp />} />

            <Route path="/admin" element={<Admin funcNav={setShowNav} />} >
                 <Route path="dashboard" />
                 <Route path="addInstructor"element={<AddInstructor />}/>
                 <Route path="addAdmin" element={<AddAdmin />}/>
                 <Route path="addCorporate" element={<AddCorporate/>}/>
            </Route>

            <Route path="/courses" element={<Courses />} />
            <Route path="/course" element={<Course />} />
            <Route path="/createCourse" element={<CreateCourse />} />
            <Route path="/preReg" element={<CoursePreview />} />
            <Route path="/conReg" element={<CourseContent/>} />
            <Route path="/grades" element={<CourseContent/>} />
            <Route path="/finalexam" element={<CourseFinalExam/>} />
            <Route path="/preInst" element={<CoursePreInst />} />
            <Route path="/conInst" element={<CourseConInst/>} />
            <Route path="/setExam" element={<SetExam />} />
            <Route path="/user/profile" element={<Profile />} />
            <Route path="/user/accountsettings" element={<AccountSecurity />} />
            <Route path="/user/paymentMethods" element={<PaymentMethods />} />
            <Route path="/instructor/profile" element={<InstructorProfile />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/courses/filter" element={<FilterResults />} />
            <Route path="/instructor/contract" element={<InstructorTerms />} />
            <Route path="/CourseExam" element={<CourseExam />} />
            <Route path="/setFinalExam" element={<SetFinalExam />} />
            <Route path="/rateInstructor" element={<InstructorRating />} />
            <Route path="/subtitleView" element={<Subtitle />}></Route>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
