import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Course from "./pages/Course";
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
 
import Guest from "./pages/Guest";
import CoursesPrices from "./pages/CoursesPrices";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/courses" element={<Course />} />
            <Route path="/SearchCourse" element={<SearchCourse />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/instructor" element={<SignUp />} />
            <Route path="/itrainee" element={<IndividualTrainee />} />
            <Route path="/ctrainee" element={<CorporateTrainee />} />
            <Route path="/addInstructor" element={<AddInstructor />} />
            <Route path="/addAdmin" element={<AddAdmin />} />
            <Route path="/addCorporate" element={<AddCorporate />} />
            <Route path="/selectCountry" element={<SelectCountry />} />
            <Route path="/guest" element={<Guest />} />
            <Route path="/coursesPrices" element={<CoursesPrices />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
