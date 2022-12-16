import Cookies from "universal-cookie";
const cookies = new Cookies();
export default function unAuth (){
    cookies.remove("jwt");
    cookies.remove("currentUser");
    cookies.remove("status");
    window.location.href = "/login";
}