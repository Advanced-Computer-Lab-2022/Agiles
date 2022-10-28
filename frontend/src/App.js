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
import Guest from "./pages/Guest/Guest";
import CoursesPrices from "./pages/Course/CoursesPrices";
import Instructor from "./pages/Instructor/Instructor";
import SearchResults from "./pages/Course/SearchResults";
import OneCourse from "./pages/Course/OneCourse";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            {/* main pages */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            {/* user pages */}
            <Route path="/admin" element={<Admin />} />
            <Route path="/instructor" element={<Instructor />} />
            <Route path="/itrainee" element={<IndividualTrainee />} />
            <Route path="/ctrainee" element={<CorporateTrainee />} />
            <Route path="/guest" element={<Guest />} />
            {/* requirement pages */}
            <Route path="/courses" element={<Courses />} />{" "}
            <Route path="/oneCourse" element={<OneCourse />} />{" "}
            {/* requirement no: */}
            <Route path="/createCourse" element={<CreateCourse />} />{" "}
            {/* requirement no: */}
            <Route
              path="/instructorOwnCourses"
              element={<InstructorOwnCourses />}
            />{" "}
            {/* requirement no: */}
            {/* requirement no: */}
            <Route path="/addInstructor" element={<AddInstructor />} />{" "}
            {/* requirement no: */}
            <Route path="/addAdmin" element={<AddAdmin />} />{" "}
            {/* requirement no: */}
            <Route path="/addCorporate" element={<AddCorporate />} />{" "}
            {/* requirement no: */}
            {/* requirement no: 6*/}
            <Route path="/coursesPrices" element={<CoursesPrices />} />{" "}
            {/* requirement no: */}
            <Route path="/searchResults" element={<SearchResults />} />{" "}
            <Route
              path="/instructorCreateCourse"
              element={<CreateCourse />}
            />{" "}
            {/* requirement no: */}
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
