import style from "./AdminNavbar.module.css";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LOGOUT_URL = "/admin/logOut";

const AdminNavbar = ({ funcNav }) => {
  const username = localStorage.getItem("username");
  const navigate = useNavigate();
  const handleLogOut = async () => {
    let config = {
      headers: {
        header1: "Access-Control-Allow-Origin",
      },
    };
    try {
      const res = await axios.post(LOGOUT_URL, { username: 4 }, config);
      localStorage.removeItem("username");
      funcNav(true);
      navigate("/");
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <nav className={style["admin-navbar"]}>
      <p>{username}@gmail.com</p>
      <button className={style["logOut"]} onClick={handleLogOut}>
        {" "}
        <ExitToAppIcon></ExitToAppIcon>
        <span>Logout</span>
      </button>
    </nav>
  );
};

export default AdminNavbar;
