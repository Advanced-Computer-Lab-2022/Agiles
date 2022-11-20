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
import SearchResults from "./pages/Course/SearchResults";
import Course from "./pages/Course/Course";
import FilterResults from "./pages/Course/FilterResults";
import { useState } from "react";
function App() {
  const [showNav, setShowNav] = useState(true);
  const [logged, setLogged] = useState(false);
  return (
    <div className="App">
      <BrowserRouter>
        {showNav && (
          <nav>
            <Navbar logged={logged} funcLog = {setLogged}/>
          </nav>
        )}
        <div className="pages">
          <Routes>
            <Route index element={<Home logged={logged} />} />
            <Route path="/login" element={<Login funcLog = {setLogged}/>} />
            <Route path="/signup" element={<SignUp  />} />
            <Route path="/admin" element={<Admin  funcNav={setShowNav} />} />
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
            <Route path="/itrainee" element={<IndividualTrainee />} />
            <Route path="/ctrainee" element={<CorporateTrainee />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/ccourses" element={<Courses corporate={true} />} />
            <Route path="/course" element={<Course />} />
            <Route path="/createCourse" element={<CreateCourse />} />
            <Route
              path="/instructorOwnCourses"
              element={<InstructorOwnCourses />}
            />
            <Route path="/search" element={<SearchResults />} />
            <Route
              path="/csearch"
              element={<SearchResults corporate={true} />}
            />
            <Route path="/instructorCreateCourse" element={<CreateCourse />} />
            <Route path="/courses/filter" element={<FilterResults />} />
            <Route
              path="/ccourses/filter"
              element={<FilterResults corporate={true} />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
