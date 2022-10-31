import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Courses from "./pages/Course/Courses";
import Login from "./pages/Login";
import SignUp from "./pages/Signup";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Admin from "./pages/Admin/Admin";
import AddAdmin from "./pages/Admin/AddAdmin";
import AddInstructor from "./pages/Admin/AddInstructor";
import AddCorporate from "./pages/Admin/AddCorporate";
import IndividualTrainee from "./pages/IndvidualTrainee/IndividualTrainee";
import CorporateTrainee from "./pages/CorporateTrainee/CorporateTrainee";
import InstructorOwnCourses from "./pages/Instructor/InstructorOwnCourses";
import CreateCourse from "./pages/Course/CreateCourse";
import Instructor from "./pages/Instructor/Instructor";
import SearchResults from "./pages/Course/SearchResults";
import Course from "./pages/Course/Course";
import FilterResults from "./pages/Course/FilterResults";
import { useState } from "react";
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
            {/* main pages */}
            <Route index element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            {/* admin pages */}
            <Route path="/admin" element={<Admin funcNav={setShowNav} />} />
            <Route
              path="/addInstructor"
              element={<AddInstructor funcNav={setShowNav} />}
            />{" "}
            <Route
              path="/addAdmin"
              element={<AddAdmin funcNav={setShowNav} />}
            />{" "}
            <Route
              path="/addCorporate"
              element={<AddCorporate funcNav={setShowNav} />}
            />{" "}
            <Route path="/instructor" element={<Instructor />} />
            <Route path="/itrainee" element={<IndividualTrainee />} />
            <Route path="/ctrainee" element={<CorporateTrainee />} />
            {/* requirement pages */}
            <Route path="/courses" element={<Courses />} />{" "}
            <Route path="/ccourses" element={<Courses corporate={true} />} />{" "}
            <Route path="/course" element={<Course />} />{" "}
            {/* requirement no: */}
            <Route path="/createCourse" element={<CreateCourse />} />{" "}
            {/* requirement no: */}
            <Route
              path="/instructorOwnCourses"
              element={<InstructorOwnCourses />}
            />{" "}
            {/* requirement no: */}
            {/* requirement no: */}
            {/* requirement no: */}
            {/* requirement no: 6*/}
            {/* requirement no: */}
            <Route path="/search" element={<SearchResults />} />{" "}
            <Route
              path="/csearch"
              element={<SearchResults corporate={true} />}
            />{" "}
            <Route path="/instructorCreateCourse" element={<CreateCourse />} />{" "}
            {/* requirement no: */}
            <Route path="/courses/filter" element={<FilterResults />} />{" "}
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
