import style from "./CourseContent.module.css";
import YouTubeIcon from "@mui/icons-material/YouTube";
import Accordion from "react-bootstrap/Accordion";
const CoursContent = (props) => {
  const subtitles = props.course.subtitles;
  console.log(subtitles);
  
  return (
    <div className={style["mainRight"]}>
      <label className={style["mainlabel"]}>Course Content</label>
      <Accordion defaultActiveKey="0" className={style["subtitles"]}>
          {subtitles.map((subtitle, index) => (
           <Accordion.Item eventKey={index}>
           <Accordion.Header>Section {index + 1}: {subtitle.subtitle}</Accordion.Header>
           <Accordion.Body>
             <YouTubeIcon className={style["icon"]} /> {subtitle.time}
             <br></br>
             {subtitle.linkDesc}
           </Accordion.Body>
         </Accordion.Item>
          ))}
       
      </Accordion>
    </div>
  );
};

export default CoursContent;
