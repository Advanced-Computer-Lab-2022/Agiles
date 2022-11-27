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
import SearchResults from "./pages/Course/SearchResults";
import Course from "./pages/Course/Course";
import FilterResults from "./pages/Course/FilterResults";
import Regcourse from "./pages/Course/RegCourse";
import InstructorTerms from "./pages/Instructor/InstructorTerms";
import MyCourseInst from "./pages/Instructor/MyCourseInst";
import CourseExam from "./pages/Course/CourseExam";
import InstructorRating from "./pages/Course/InstructorRating.js";
import { useState } from "react";
import Subtitle from "./pages/Course/SubtitleView";
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
            <Route path="/regcourse" element={<Regcourse />} />
            <Route path="/myCourseInst" element={<MyCourseInst />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/courses/filter" element={<FilterResults />} />
            <Route path="/instructor/contract" element={<InstructorTerms />} />
            <Route path="/CourseExam" element={<CourseExam />} />
            <Route path="/setExam" element={<SetExam />} />
            <Route path="/rateInstructor" element={<InstructorRating/>} />
            <Route path="/subtitleView" element = {<Subtitle/>}></Route>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
