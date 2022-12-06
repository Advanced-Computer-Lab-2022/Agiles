import NavbarStyles from "./Navbar.module.css";
import React, { useState } from "react";
import { BsSearch } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import SelectCountry from "./SelectCountry";
import Cookies from "universal-cookie";
import a from "../static/logo.png";
import NavDropdown from "react-bootstrap/NavDropdown";
import IconButton from '@mui/material/IconButton';
import axios from "axios";
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import Logout from '@mui/icons-material/Logout';

const cookies = new Cookies();
const LOGOUT_URL = "/admin/logOut";
const Navbar = () => {
  const username =localStorage.getItem("username");
  const role  = cookies.get("status");
  const logged = cookies.get("logged");
  const navigate = useNavigate();
  const [searchString, setSearchString] = useState("");
  const isInstructor = ()=>{ return role==1;}
  const isTrainee = ()=>{ return (role==0 || role ==2);}
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  }
  const navigatetoProfile =()=>{
      if (role == 0 || role ==2){
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
      localStorage.removeItem("username");
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
  const hanldleMycourses = ()=>navigate('/mycourses');
  const handleCreateCourse = () => navigate('createcourse');
  const navigateMyLearning = () => navigate('/mylearning');
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
        <div className={NavbarStyles["dropUser"]}>
        <IconButton
            onClick={handleClick}
            size="small"
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar sx={{ width: 32, height: 32 }}>{username[0].toUpperCase()}</Avatar>
          </IconButton>
          <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
      >
        <MenuItem onClick = {navigatetoProfile}>
          Profile
        </MenuItem>
        {isTrainee ()&&  <MenuItem onClick = {navigateMyLearning}>
          My Learning
        </MenuItem>}
        {isInstructor()&& 
        <>
          <MenuItem onClick = {hanldleMycourses}> My Courses </MenuItem>
          <MenuItem onClick = {handleCreateCourse}>Create Course</MenuItem>
          </>
          }
        <Divider />
        <MenuItem onClick={handleLogOut}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
       </div>
      )}
      {/* <SelectCountry></SelectCountry> */}
    </nav>
  );
};

export default Navbar;
