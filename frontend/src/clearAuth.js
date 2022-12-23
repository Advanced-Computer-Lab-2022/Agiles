import Cookies from "universal-cookie";
const cookies = new Cookies();
export default function clearAuth (){
    cookies.remove("jwt");
    cookies.remove("currentUser");
    cookies.remove("status");
}