import "./Home.css";
import Cookies from "universal-cookie";
import { useNavigate, Link } from "react-router-dom";
import Explore from "../components/Explore";
import Thumbnail from "../components/Thumbnail";
import ThumbnailLog from "../components/ThumbnailLog";
import Footer from "../components/Footer";
const cookies = new Cookies();
const Home = () => {
  const navigate = useNavigate();
  const status = cookies.get("status");
  const handleClick = () => {
    navigate("/signUp");
  };
  if (status) {
    // status 0 > Itrainee status 1 > Instructor status 2 > Ctrainee
    if (status == 0 || status == 2) {
      return (
        <div className="home">
          <nav className="smallNav">
            <div>
              <Link to="/">
                <button className={"Inprogress"}>Explore</button>
              </Link>
              <Link to="/mylearning">
                <button className={"notPressed"}> My Learning</button>
              </Link>
            </div>
          </nav>
          <ThumbnailLog></ThumbnailLog>
          <Explore></Explore>
          <Footer/>
        </div>
      );
    } else if (status==1) {
      return (
        <div className="home">
          <div className="craousel">{/* <Thumbnail></Thumbnail>*/}</div>
          <nav className="smallNav" >
            <div>
              <Link to="/">
                <button
                
                  className={"Inprogress"}
                >
                  Explore{" "}
                </button>
              </Link>
              <Link to="/mycourses">
                <button
                
                  className={"notPressed"}
                >
                  My Courses{" "}
                </button>
              </Link>
              <Link to="/createcourse">
                <button
                 
                  className={"notPressed"}
                >
                  Create new course{" "}
                </button>
              </Link>
            </div>
          </nav>
          <ThumbnailLog></ThumbnailLog>
          <Explore></Explore>
          <footer></footer>
        </div>
      );
    }
  } else {
    return (
      <div className="home">
        <Thumbnail></Thumbnail>
        <footer></footer>
      </div>
    );
  }
};

export default Home;
