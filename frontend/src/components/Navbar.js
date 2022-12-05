import NavbarStyles from "./Navbar.module.css";
import React, { useState } from "react";
import { BsSearch } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import SelectCountry from "./SelectCountry";
import Cookies from "universal-cookie";
import NavDropdown from "react-bootstrap/NavDropdown";
import axios from "axios";
const cookies = new Cookies();
const LOGOUT_URL = "/admin/logOut";
const Navbar = () => {
  const navigate = useNavigate();
  const username = cookies.get("username");
  const status = cookies.get("status");
  const logged = cookies.get("logged");
  const [searchString, setSearchString] = useState("");
  const isInstructor = ()=>{ return status==1;}
  const isTrainee = ()=>{ return (status==0 || status ==2);}
  const navigatetoProfile =()=>{
      if (isTrainee()){
          navigate({pathname:'/user/profile'})
      }
      else{
        navigate({pathname:'/instructor/profile'})
      }
  }
  const handleLogOut = async () => {
    let config = {
      headers: {
        header1: "Access-Control-Allow-Origin",
      },
    };
    try {
      const res = await axios.post(LOGOUT_URL, { username: 4 }, config);
      navigate("/");
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
          onChange={(event)=>setSearchString(event.target.value)}
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
              <NavDropdown.Item onClick = {navigatetoProfile}>profile</NavDropdown.Item>
              {isTrainee ()&& <NavDropdown.Item href="/mylearning">My Learning</NavDropdown.Item>}
              {isInstructor()&& 
              <>
              <NavDropdown.Item href="/mycourses">My Courses</NavDropdown.Item>
              <NavDropdown.Item href="/createcourse">Create Course</NavDropdown.Item>
              </>}
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
