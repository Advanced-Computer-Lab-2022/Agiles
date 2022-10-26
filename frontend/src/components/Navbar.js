import NavbarStyles from "./Navbar.module.css";
import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import axios from "axios"

const Navbar = () => {
  const [searchString, setSearchString] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  //let search = searchParams.get("search")
  const handleChange = (event) => {
    setSearchString(event.target.value);
  };
  const handleSearch = async (event) => {
    event.preventDefault();
    setSearchParams({ search: searchString });
    let config = {
      headers: {
        header1: "Access-Control-Allow-Origin",
          query: {
            search: searchParams
          }
        
      },
    };
    try {
      // console.log(search)
      const params = new URLSearchParams({
        search: searchParams
      })
      
      const res = await axios.get(`course/listCourses/search?query=${params}`);
      console.log(res.data)
    
    } catch (e) {
      console.log(e);
    
    }
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
