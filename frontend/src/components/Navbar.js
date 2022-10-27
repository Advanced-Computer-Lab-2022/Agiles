import NavbarStyles from "./Navbar.module.css";
import React, { useState } from "react";
import { BsSearch } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import axios from "axios"

const Navbar = () => {
  const [searchString, setSearchString] = useState("");
  const navigate = useNavigate();
  const handleChange = (event) => {
    setSearchString(event.target.value);
  };
  const handleSearch = async (event) => {
    event.preventDefault();
    navigate({
      pathname: '/searchResults',
      search: `?search=${searchString}`,
    }); 
  };
  return (
    <nav className={NavbarStyles["navbar"]}>
      <h1 className={NavbarStyles["title"]}><a href="/" className={NavbarStyles["title"]}>Agiles</a></h1>
      <form className={NavbarStyles["search-bar"]}>
        <BsSearch className={NavbarStyles["search-icon"]} />
        <input className={NavbarStyles["inpt"]}
          placeholder="search for anything"
          value={searchString}
          onChange={handleChange}
        ></input>
        <button
          className={NavbarStyles["search-button"]}
          onClick={handleSearch}
        >
          search
        </button>
      </form>
      <div className="links">
        <a href="/">Home</a>
        <a href="/courses">Courses</a>
        <a href="/login">Log in</a>
        <a href="/signup">Sign up</a>
      </div>
      {/* <div>{search}</div> */}
    </nav>
  );
};

export default Navbar;
