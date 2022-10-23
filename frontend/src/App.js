import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Course from "./pages/Course";
import Login from "./pages/Login";
import SignUp from "./pages/Signup";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/courses" element={<Course />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/admin" element={<SignUp />} />
            <Route path="/instructor" element={<SignUp />} />
            <Route path="/itrainee" element={<SignUp />} />
            <Route path="/ctrainee" element={<SignUp />} />
            <Route path="/guest" element={<SignUp />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
