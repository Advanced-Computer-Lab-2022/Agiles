import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import LoadingScreen from "react-loading-screen";
import spinner from "../../static/download.gif";
import style from "./SubtitleView.module.css";
import ListGroup from "react-bootstrap/ListGroup";
import Accordion from "react-bootstrap/Accordion";
import { useNavigate } from "react-router-dom";
import ListGroupItem from "react-bootstrap/esm/ListGroupItem";
import Cookies from "universal-cookie"
const LINK_URL = "/course/link/view";
const cookies = new Cookies();
const Subtitle = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const query = location.search;
  const [link, setLink] = useState({ linkUrl: "", linkDesc: "" });
  const [subtitles, setSubtitles] = useState([]);
  const [isloading, setIsLoading] = useState(false);
  const [exam, setExam] = useState([]);
  const handleClick = (e) => {
    navigate(
      {
        pathname: "/subtitleView",
        search: e.target.id,
      },
      { state: { currentState: e.target.name, data: subtitles } }
    );
    window.location.reload();
  };

  const handleExamClick = (e) => {
    navigate(
      {
        pathname: "/courseExam",
        search: "?subtitleId=" + location.state.data._id + "&studentId="+cookies.get("currentUser")+ "&courseId=" +location.state.courseId,
      })
    }
  const FetchData = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(LINK_URL + query);
      setLink(res.data);
      setSubtitles(location.state.data);
    } catch (err) {
      console.log(err);
    }
    setIsLoading(false);
  };
  useEffect(() => {
    FetchData();
  }, []);
  return (
    <>
      {isloading ? (
        <LoadingScreen loading={true} logoSrc={spinner} />
      ) : (
        <section className={style["main-section"]}>
          <section className={style["main-section-left"]}>
            <section className={style["main-section-left-top"]}>
              <iframe
                width="800"
                height="450"
                src={link.linkUrl}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </section>
            <section className={style["main-section-left-bottom"]}>
              <h3>Short Summary</h3>
              <p>{link.linkDesc}</p>
              <hr className={style["mainRight-hr"]}></hr>
            </section>
          </section>
          <section className={style["main-section-right"]}>
            <Accordion   alwaysOpen className={style["subtitles"]}>
              {subtitles &&
                subtitles.map((subtitle, index0) => (
                  <Accordion.Item eventKey={index0} key={index0}>
                    <Accordion.Header>
                      <h5>
                        Section {index0 + 1}: {subtitle.subtitle}
                      </h5>
                    </Accordion.Header>
                    <Accordion.Body>
                      <ListGroup>
                        {subtitle.link?.map((link, index1) => (
                          <ListGroup.Item key={index1}>
                            {index1 + 1}.{" "}
                            <button
                              id={"linkId=" + link._id}
                              name={index0 + " " + index1}
                              onClick={handleClick}
                              className={style["subtitleView"]}
                            >
                              {link.linkDesc}
                            </button>
                          </ListGroup.Item>
                        ))}
                        <ListGroup.Item key ={"exam"}>
                          <button
                            id={"linkId=" + subtitle._id}
                            name={"exam"}
                            onClick={handleExamClick}
                            className={style["subtitleView"]}
                          >
                            Exam
                          </button>
                        </ListGroup.Item>
                      </ListGroup>
                    </Accordion.Body>
                  </Accordion.Item>
                ))}
            </Accordion>
          </section>
        </section>
      )}
    </>
  );
};

export default Subtitle;
