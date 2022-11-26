import NavbarStyles from "./Navbar.module.css";
import React, { useState } from "react";
import { BsSearch } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import SelectCountry from "./SelectCountry";
import Cookies from "universal-cookie";
import a from "../static/logo.png";
import NavDropdown from "react-bootstrap/NavDropdown";


import axios from "axios";
const cookies = new Cookies();
const LOGOUT_URL = "/admin/logOut";
const Navbar = () => {
  const username = cookies.get("username");
  const [searchString, setSearchString] = useState("");
  const logged = cookies.get("logged");
  const handleChange = (event) => {
    setSearchString(event.target.value);
  };
  const navigate = useNavigate();
  const handleLogOut = async () => {
    let config = {
      headers: {
        header1: "Access-Control-Allow-Origin",
      },
    };
    try {
      const res = await axios.post(LOGOUT_URL, { username: 4 }, config);
      navigate("/");
      window.location.reload(false);
    } catch (err) {
      console.log(err);
    }
  };
  const handleSearch = async (event) => {
    event.preventDefault();
    navigate({
      pathname: "/search",
      search: `?search=${searchString}`,
    });
  };

  return (
    <nav className={NavbarStyles["navbar"]}>
      {/* <h1 className={NavbarStyles["headerTitle"]}>
        <Link to="/">
          <img
            src={a}
            alt="mainImage"
            className={NavbarStyles["headerTitle"]}
          ></img>
        </Link>
      </h1> */}
      <form onSubmit={handleSearch} className={NavbarStyles["search-bar"]}>
        <BsSearch
          className={NavbarStyles["search-icon"]}
          onClick={handleSearch}
        />
        <input
          className={NavbarStyles["inpt"]}
          placeholder="search for anything"
          value={searchString}
          required
          onChange={handleChange}
        ></input>
      </form>
      <div className={NavbarStyles["linkContainer"]}>
        <Link to="/" className={NavbarStyles["links"]}>Home</Link>
        <Link to="/courses" className={NavbarStyles["links"]}>Courses</Link>
        {!logged && (
          <>
            <Link to="/login" className={NavbarStyles["links"]}>Log in</Link>
            <Link to="/signup" className={NavbarStyles["links"]}>Sign up</Link>
          </>
        )}
      </div>
      {logged && (
        <>
          <div className={NavbarStyles["dropUser"]}>
              <NavDropdown
              title={`Hi ! ${username}`}
              expand="lg"
            >
              <NavDropdown.Item href="#action3">profile</NavDropdown.Item>
              <NavDropdown.Item href="#action4">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={handleLogOut}>Log Out</NavDropdown.Item>
            </NavDropdown>
          </div>
        </>
      )}
      <SelectCountry></SelectCountry>
    </nav>
  );
};

export default Navbar;
