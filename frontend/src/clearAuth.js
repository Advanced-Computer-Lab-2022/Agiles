import Cookies from "universal-cookie";
const cookies = new Cookies();
export default function unAuth (){
    cookies.remove("jwt");
    cookies.remove("currentUser");
    cookies.remove("status");
    cookies.remove("logged");
    alert("Failed to Authenticate");
    window.location.href = "/login";
}