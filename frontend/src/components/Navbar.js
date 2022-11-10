import NavbarStyles from "./Navbar.module.css";
import React, { useState } from "react";
import { BsSearch } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import SelectCountry from "./SelectCountry";

const Navbar = () => {
  const [searchString, setSearchString] = useState("");
  const handleChange = (event) => {
    setSearchString(event.target.value);
  };
  const navigate = useNavigate();
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
      <h1 className={NavbarStyles["title"]}>
        <a href="/" className={NavbarStyles["title"]}>
          Agiles
        </a>
      </h1>
      <form onSubmit={handleSearch} className={NavbarStyles["search-bar"]}>
        <BsSearch className={NavbarStyles["search-icon"]} />
        <input
          className={NavbarStyles["inpt"]}
          placeholder="search for anything"
          value={searchString}
          required
          onChange={handleChange}
        ></input>
        <button className={NavbarStyles["search-button"]}>search</button>
      </form>
      <div className="links">
        <Link to="/">Home</Link>
        {/* <Link to="/courses">Courses</Link> */}
        <Link to={coursesPath}>Courses</Link>
        <Link to="/login">Log in</Link>
        <Link to="/signup">Sign up</Link>
      </div>
      <SelectCountry></SelectCountry>
    </nav>
  );
};

export default Navbar;
