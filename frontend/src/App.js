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
import SearchResults from "./pages/Course/SearchResults";
import Course from "./pages/Course/Course";
import FilterResults from "./pages/Course/FilterResults";
import Regcourse from "./pages/Course/RegCourse";
import InstructorTerms from "./pages/Instructor/InstructorTerms";
import { useState } from "react";
function App() {
  const [showNav, setShowNav] = useState(true);
  return (
    <div className="App">
      <BrowserRouter>{showNav && (<nav><Navbar /></nav> )}
        <div className="pages">
          <Routes>
            <Route index element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/admin" element={<Admin funcNav={setShowNav} />} />
            <Route  path="/addInstructor" element={<AddInstructor funcNav={setShowNav} />}     />
            <Route  path="/addAdmin" element={<AddAdmin funcNav={setShowNav} />} />
            <Route path="/addCorporate" element={<AddCorporate funcNav={setShowNav} />}/>
            <Route path="/courses" element={<Courses />} />
            <Route path="/course" element={<Course />} />
            <Route path="/regcourse" element={<Regcourse/>} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/courses/filter" element={<FilterResults />} />
            <Route path="/instructor/contract" element={<InstructorTerms />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
