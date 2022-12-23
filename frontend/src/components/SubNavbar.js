import Cookies from "universal-cookie";
import { Link } from "react-router-dom";
const cookies = new Cookies();
const SubNavbar = () => {
    const status = cookies.get("status");
    return ( <>{status &&
        <nav className="smallNav">
        <div>
          <Link to="/">
            <button className={"Inprogress"}>Explore</button>
          </Link>
        {status!=1&&status!=3&& <Link to="/mylearning"> <button className={"notPressed"}>My Learning</button> </Link>}
        {status==1&&<Link to="/mycourses"> <button className={"notPressed"} > My Courses </button> </Link>}
        {status==1 &&<Link to="/createcourse"><button className={"notPressed"} >Create New Course</button></Link>}
        </div>
      </nav>}</> );
}
 
export default SubNavbar;