import style from './AdminSidebar.module.css'
import DashboardIcon from "@mui/icons-material/Dashboard";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import CorporateFareIcon from '@mui/icons-material/CorporateFare';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import { Link } from 'react-router-dom'

const AdminSidebar = () => {
    return ( 
        <div className={style['sidebar']}>
            <div className={style['top']}><Link to = "/admin" style={{textDecoration:"none"}}><span className={style["logo"]}>Agiles Admin</span></Link></div>
            <div className={style['center']}>
                <ul>
                    <p className={style["main"]}>Main</p>
                    <li>
                        <DashboardIcon />
                        <span>dashboard</span></li>
                   <p className={style["main"]}>AddUsers</p>
                   <Link to = "addAdmin" style={{textDecoration:"none" , color:'black'}}><li><SupervisorAccountIcon/><span>Admin</span></li></Link>
                   <Link to = "addCorporate" style={{textDecoration:"none" , color:'black'}}> <li><CorporateFareIcon /><span>CorporateTrainee</span></li></Link>
                   <Link to = "addInstructor" style={{textDecoration:"none" , color:'black'}}> <li><PersonAddAltIcon/><span>Instructor</span></li></Link>
                    <p className={style["main"]}>Services</p>
                    <li><NotificationsNoneIcon className={style['icon']}></NotificationsNoneIcon><span>Notfications</span></li>
                    <li><SettingsApplicationsIcon className={style['icon']}></SettingsApplicationsIcon><span>Settings</span></li>
                    <p className={style["main"]}>Acount</p>
                    <li><AccountCircleOutlinedIcon className={style['icon']}></AccountCircleOutlinedIcon><span>profile</span></li>
                    <li><ExitToAppIcon className={style['icon']}></ExitToAppIcon><span>Logout</span></li>
                </ul>
            </div>
        </div>
    );
}
 
export default AdminSidebar;