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
import Subtitle from "./pages/Course/SubtitleView";
import CoursePreInst from "./pages/Instructor/CoursePreInst";
import CourseConInst from "./pages/Instructor/CourseConInst";
import CoursePreview from "./components/CoursePreview";
import CourseContent from "./components/CourseContent";
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
            <Route path="/signup" element={<SignUp />} />
            <Route path="/admin" element={<Admin funcNav={setShowNav} />} />
            <Route
              path="/addInstructor"
              element={<AddInstructor funcNav={setShowNav} />}
            />
            <Route
              path="/addAdmin"
              element={<AddAdmin funcNav={setShowNav} />}
            />
            <Route
              path="/addCorporate"
              element={<AddCorporate funcNav={setShowNav} />}
            />
            <Route path="/courses" element={<Courses />} />
            <Route path="/course" element={<Course />} />
            <Route path="/createCourse" element={<CreateCourse />} />
            <Route path="/preReg" element={<CoursePreview />} />
            <Route path="/conReg" element={<CourseContent/>} />
            <Route path="/grades" element={<CourseContent/>} />
            <Route path="/exams" element={<CourseContent/>} />
            <Route path="/preInst" element={<CoursePreInst />} />
            <Route path="/conInst" element={<CourseConInst/>} />
            <Route path="/setExam" element={<SetExam />} />
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
