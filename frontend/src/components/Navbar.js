import NavbarStyles from "./Navbar.module.css";
import React, { useState } from "react";
import { BsSearch } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import SelectCountry from "./SelectCountry";
import a from "../static/logo.png";

const Navbar = (props) => {
  const [searchString, setSearchString] = useState("");
  const logged = props.logged;
  const handleChange = (event) => {
    setSearchString(event.target.value);
  };
  const navigate = useNavigate();
  const handleLogOut = ()=>{
    props.funcLog(false);
    navigate("/");
  }
  const handleSearch = async (event) => {
    event.preventDefault();
    if (
      window.location.href == "http://localhost:3000/ctrainee" ||
      window.location.href == "http://localhost:3000/ccourses" ||
      window.location.href.includes("http://localhost:3000/csearch")
    ) {
      navigate({
        pathname: "/csearch",
        search: `?search=${searchString}`,
      });
    } else {
      navigate({
        pathname: "/search",
        search: `?search=${searchString}`,
      });
    }
  };
  let coursesPath;
  if (
    window.location.href == "http://localhost:3000/ctrainee" ||
    window.location.href == "http://localhost:3000/ccourses" ||
    window.location.href.includes("http://localhost:3000/csearch")
  ) {
    coursesPath = "/ccourses";
  } else {
    coursesPath = "/courses";
  }
  return (
    <nav className={NavbarStyles["navbar"]}>
      <h1 className={NavbarStyles["headerTitle"]}>
        <Link to ="/"><img src={a} alt="mainImage" className={NavbarStyles["headerTitle"]}></img></Link>   
      </h1>
      <form onSubmit={handleSearch} className={NavbarStyles["search-bar"]}>
        <BsSearch className={NavbarStyles["search-icon"]} onClick={handleSearch}  />
        <input
          className={NavbarStyles["inpt"]}
          placeholder="search for anything"
          value={searchString}
          required
          onChange={handleChange}
        ></input>
      </form>
      <div className={NavbarStyles["links"]}>
        <Link to="/">Home</Link>
        {/* <Link to="/courses">Courses</Link> */}
        <Link to={coursesPath}>Courses</Link>
        {!logged ?(<>
          <Link to="/login">Log in</Link>
        <Link to="/signup">Sign up</Link></>):(<>
        <button onClick={handleLogOut} className="btn">Log out</button>
        </>)}
       
      </div>
      <SelectCountry></SelectCountry>
    </nav>
  );
};

export default Navbar;
