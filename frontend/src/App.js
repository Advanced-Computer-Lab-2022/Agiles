import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Courses from "./pages/Courses";
import Login from "./pages/Login";
import SignUp from "./pages/Signup";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import AddAdmin from "./pages/AddAdmin";
import AddInstructor from "./pages/AddInstructor";
import AddCorporate from "./pages/AddCorporate";
import IndividualTrainee from "./pages/IndividualTrainee";
import SelectCountry from "./pages/SelectCountry";
import CorporateTrainee from "./pages/CorporateTrainee";
import SearchCourse from "./pages/SearchCourse";
import InstructorOwnCourses from "./pages/InstructorOwnCourses";
import CreateCourse from "./pages/CreateCourse";
import Guest from "./pages/Guest";
import CoursesPrices from "./pages/CoursesPrices";
import Instructor from "./pages/Instructor";
import SearchResults from "./pages/SearchResults";

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
            {/* requirement no: */}
            <Route path="/createCourse" element={<CreateCourse />} />{" "}
            {/* requirement no: */}
            <Route
              path="/instructorOwnCourses"
              element={<InstructorOwnCourses />}
            />{" "}
            {/* requirement no: */}
            <Route path="/searchCourse" element={<SearchCourse />} />{" "}
            {/* requirement no: */}
            <Route path="/addInstructor" element={<AddInstructor />} />{" "}
            {/* requirement no: */}
            <Route path="/addAdmin" element={<AddAdmin />} />{" "}
            {/* requirement no: */}
            <Route path="/addCorporate" element={<AddCorporate />} />{" "}
            {/* requirement no: */}
            <Route path="/selectCountry" element={<SelectCountry />} />{" "}
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
