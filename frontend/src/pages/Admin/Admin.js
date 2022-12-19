import style from "./Admin.module.css";
import AdminNavbar from './adminComponents/AdminNavbar';
import AdminSidebar from './adminComponents/AdminSidebar';
import { Outlet } from "react-router-dom";
const Admin = (props) => {
  props.funcNav(false);
  return (
    <div className={style["admin"]}>
      <AdminSidebar/>
      <div className={style["admin-content"]}>
      <AdminNavbar funcNav={props.funcNav}/>
      <Outlet/>
      </div>

    </div>
  );
};

export default Admin;