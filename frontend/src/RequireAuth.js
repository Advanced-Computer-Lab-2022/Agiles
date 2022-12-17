import axios from "axios";
import { useEffect ,useState} from "react";
import { Outlet ,Navigate} from "react-router-dom";
import Cookies from "universal-cookie";
const cookies = new Cookies();
const RequireAuth = ({allowedRoles}) => {
    const status = parseInt(cookies.get("status"));    
    return ( allowedRoles.includes(parseInt(status))?<Outlet/>:<Navigate to ="/forbidden" />);
}
export default RequireAuth;