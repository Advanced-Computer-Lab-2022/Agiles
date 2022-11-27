import style from "./CourseContent.module.css";
import ListGroup from "react-bootstrap/ListGroup";
import Accordion from "react-bootstrap/Accordion";
import {useNavigate } from "react-router-dom";
const CoursContent = (props) => {
  const subtitles = props.course.subtitles;  
  const navigate = useNavigate();
  
  const handleClick = (e) => {
    navigate({
      pathname: '/subtitleView',
      search : e.target.id
     },{state : {currentState :e.target.name ,data:subtitles}})
  }
  return (
    <div className={style["mainRight"]}>
      <label className={style["mainlabel"]}>Course Content</label>
      <Accordion defaultActiveKey="0" className={style["subtitles"]} alwaysOpen>
          {subtitles &&subtitles.map((subtitle, index0) => (
           <Accordion.Item eventKey={index0} key = {index0}>
           <Accordion.Header><h5>Section {index0 + 1}: {subtitle.subtitle}</h5></Accordion.Header>
           <Accordion.Body>
           <ListGroup>
                  {subtitle.link?.map((link, index1) => (
                    <ListGroup.Item key={index1}>
                      {index1 + 1}. <button id = {'linkId='+link._id} name = {index0 +" " +index1} onClick={handleClick} className = {style['subtitleView']}>{link.linkDesc}</button>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
           </Accordion.Body>
         </Accordion.Item>
          ))}
       
      </Accordion>
    </div>
  );
};

export default CoursContent;
