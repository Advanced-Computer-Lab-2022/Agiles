import './AdminSidebar.css'
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
        <div className='sidebar'>
            <div className='top'><Link to = "/admin" style={{textDecoration:"none"}}><span className="logo">Agiles Admin</span></Link></div>
            <hr></hr>
            <div className='center'>
                <ul>
                    <p className="main">Main</p>
                    <li>
                        <DashboardIcon />
                        <span>dashboard</span></li>
                   <p className="main">AddUsers</p>
                   <Link to = "/addAdmin" style={{textDecoration:"none"}}><li><SupervisorAccountIcon/><span>Admin</span></li></Link>
                   <Link to = "/addCorporate" style={{textDecoration:"none"}}> <li><CorporateFareIcon /><span>CorporateTrainee</span></li></Link>
                   <Link to = "/addInstructor" style={{textDecoration:"none"}}> <li><PersonAddAltIcon/><span>Instructor</span></li></Link>
                    <p className="main">Services</p>
                    <li><NotificationsNoneIcon className='icon'></NotificationsNoneIcon><span>Notfications</span></li>
                    <li><SettingsApplicationsIcon className='icon'></SettingsApplicationsIcon><span>Settings</span></li>
                    <p className="main">Acount</p>
                    <li><AccountCircleOutlinedIcon className='icon'></AccountCircleOutlinedIcon><span>profile</span></li>
                    <li><ExitToAppIcon className='icon'></ExitToAppIcon><span>Logout</span></li>
                </ul>
            </div>
        </div>
    );
}
 
export default AdminSidebar;