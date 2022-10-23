import NavbarStyles from "./Navbar.module.css";
import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
const Navbar = () => {
  const [searchString, setSearchString] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  const handleChange = (event) => {
    setSearchString(event.target.value);
  };
  const handleSearch = (event) => {
    event.preventDefault();
    setSearchParams({ query: searchString });
  };
  return (
    <nav className="navbar">
      <h1>Agiles</h1>
      <form className={NavbarStyles["search-bar"]}>
        <BsSearch className={NavbarStyles["search-icon"]} />
        <input
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
    </nav>
  );
};

export default Navbar;
