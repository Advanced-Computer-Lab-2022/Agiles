import style from "./AdminSidebar.module.css";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import CorporateFareIcon from "@mui/icons-material/CorporateFare";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import ReportIcon from "@mui/icons-material/Report";
import { Link } from "react-router-dom";

const AdminSidebar = () => {
  return (
    <div className={style["sidebar"]}>
      <div className={style["top"]}>
        <Link
          className={style["link"]}
          to="/admin"
          style={{ textDecorationLine: "none" }}
        >
          <span className={style["logo"]}>Admin</span>
        </Link>
      </div>
      <div className={style["center"]}>
        <ul style={{ paddingLeft: "0" }}>
          <p className={style["main"]}>Main</p>
          <Link
            className={style["link"]}
            style={{ textDecorationLine: "none", color: "black" }}
            to="dashboard"
          >
            <li className={style["sub"]}>
              <DashboardIcon />
              <span>Dashboard</span>
            </li>
          </Link>
          <p className={style["main"]}>Add Users</p>
          <Link
            className={style["link"]}
            to="addAdmin"
            style={{ textDecorationLine: "none", color: "black" }}
          >
            <li className={style["sub"]}>
              <SupervisorAccountIcon />
              <span>Admin</span>
            </li>
          </Link>
          <Link
            className={style["link"]}
            to="addCorporate"
            style={{ textDecorationLine: "none", color: "black" }}
          >
            {" "}
            <li className={style["sub"]}>
              <CorporateFareIcon />
              <span>Corporate Trainee</span>
            </li>
          </Link>
          <Link
            className={style["link"]}
            to="addInstructor"
            style={{ textDecorationLine: "none", color: "black" }}
          >
            {" "}
            <li className={style["sub"]}>
              <PersonAddAltIcon />
              <span>Instructor </span>
            </li>
          </Link>
          <p className={style["main"]}>Services</p>
          <li className={style["sub"]}>
            <NotificationsNoneIcon
              className={style["icon"]}
            ></NotificationsNoneIcon>
            <span>Notfications</span>
          </li>
          <Link
            className={style["link"]}
            to="viewReports"
            style={{ textDecorationLine: "none", color: "black" }}
          >
            <li className={style["sub"]}>
              <ReportIcon className={style["icon"]}></ReportIcon>
              <span>Reports</span>
            </li>
          </Link>
          <Link
            className={style["link"]}
            to="viewRequests"
            style={{ textDecorationLine: "none" }}
          >
            <li className={style["sub"]}>
              <FormatListBulletedIcon
                className={style["icon"]}
              ></FormatListBulletedIcon>
              <span>Enroll Requests</span>
            </li>
          </Link>
          <Link
            className={style["link"]}
            to="RefundRequests"
            style={{ textDecorationLine: "none", color: "black" }}
          >
            <li className={style["sub"]}>
              <FormatListBulletedIcon
                className={style["icon"]}
              ></FormatListBulletedIcon>
              <span>Refund Requests</span>
            </li>
          </Link>
          <li className={style["sub"]}>
            <SettingsApplicationsIcon
              className={style["icon"]}
            ></SettingsApplicationsIcon>
            <span>Settings</span>
          </li>

          <Link
            className={style["link"]}
            to="setPromotion"
            style={{ textDecorationLine: "none", color: "black" }}
          >
            <li className={style["sub"]}>
              <FormatListBulletedIcon
                className={style["icon"]}
              ></FormatListBulletedIcon>
              <span>Add Promotion(s)</span>
            </li>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default AdminSidebar;
