import NavbarStyles from "./Navbar.module.css";
import React, { useState } from "react";
import { BsSearch } from "react-icons/bs";
import { Link ,useNavigate} from "react-router-dom";
import SelectCountry from "./SelectCountry";

const Navbar = () => {
  const [searchString, setSearchString] = useState("");
  const handleChange = (event) => {
    setSearchString(event.target.value);
  };
  const navigate = useNavigate();
  const handleSearch = async (event) => {
    event.preventDefault();
    navigate({
      pathname: '/search',
      search: `?search=${searchString}`,
    }); 
  };
  return (
    <nav className={NavbarStyles["navbar"]}>
      <h1 className={NavbarStyles["title"]}><a href="/" className={NavbarStyles["title"]}>Agiles</a></h1>
      <form  onSubmit={handleSearch} className={NavbarStyles["search-bar"]}>
        <BsSearch className={NavbarStyles["search-icon"]} />
        <input className={NavbarStyles["inpt"]}
          placeholder="search for anything"
          value={searchString}
          required
          onChange={handleChange}
        ></input>
        <button
          className={NavbarStyles["search-button"]}
         
        >
          search
        </button>
      </form>
      <div className="links">
        <Link to="/">Home</Link>
        <Link to="/courses">Courses</Link>
        <Link to ="/login">Log in</Link>
        <Link to="/signup">Sign up</Link>
      </div>
      <SelectCountry></SelectCountry>
      {/* <div>{search}</div> */}
    </nav>
  );
};

export default Navbar;
