import style from "./CourseContent.module.css";
import ListGroup from "react-bootstrap/ListGroup";
import Accordion from "react-bootstrap/Accordion";
import { Link, useNavigate } from "react-router-dom";
const CoursContent = (props) => {
  const subtitles = props.course.subtitles;  
  return (
    <div className={style["mainRight"]}>
      <label className={style["mainlabel"]}>Course Content</label>
      <Accordion defaultActiveKey="0" className={style["subtitles"]} alwaysOpen>
          {subtitles.map((subtitle, index) => (
           <Accordion.Item eventKey={index}>
           <Accordion.Header><h5>Section {index + 1}: {subtitle.subtitle}</h5></Accordion.Header>
           <Accordion.Body>
              {subtitle.link?.map((link, index) => (
                <div>
                  <div className={style['video']}>
                    <iframe
                      width="500"
                      height="250"
                      src={link.linkUrl}
                      title="YouTube video player"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe></div>
                    <div className={style["videoDesc"]}>
                      <h5>{link.linkDesc}</h5>
                    </div>
                </div>
              ))}
              
              
             <br></br>
           </Accordion.Body>
         </Accordion.Item>
          ))}
       
      </Accordion>
    </div>
  //   <ListGroup>
  //   {subtitle.link?.map((link, index) => (
  //     <ListGroup.Item>
  //       {index + 1}. <a href={link.linkUrl}> {link.linkDesc}</a>
  //     </ListGroup.Item>
  //   ))}
  // </ListGroup>
  );
};

export default CoursContent;
