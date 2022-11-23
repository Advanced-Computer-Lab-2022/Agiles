import style from "./CourseContent.module.css";
import YouTubeIcon from "@mui/icons-material/YouTube";
const CoursContent = (props) => {
  const subtitles = props.course.subtitles;
  console.log(subtitles);
  return (
    <div>
      <label className={style["mainlabel"]}>Course Content</label>
      <div className={style["subtitles"]}>
        <ul>
          {subtitles.map((subtitle, index) => (
            <li>
              <h2>
                Section {index + 1}: {subtitle.subtitle}
              </h2>
              <div className={style["time"]}>
                <YouTubeIcon className={style["icon"]} />
                <label>{subtitle.time}</label>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CoursContent;
