import React from "react";
import { useState } from "react";
import axios from "axios";
import CreateCourseStyles from "./CreateCourse.module.css";
import { Link } from "react-router-dom";
const CreateCourse = () => {
  const [title, setTitle] = useState("");
  const [instructor, setInstructor] = useState("");
  const [subject, setSubject] = useState("");
  const [price, setPrice] = useState("");
  const [shortSummary, setShortSummary] = useState("");

  const [free, setFree] = useState(false);
  const [subtitles, setSubtitles] = useState([{ subtitle: "", time: "" }]);

  const [language, setLanguage] = useState("");
  const handleSubmit = async (event) => {
    let sumOfHours = 0;
    for (let sub of subtitles) {
      sumOfHours += Number(sub["time"]);
    }
    const course = {
      instructor: instructor,
      title: title,
      price: price,
      free: free,
      subtitles: subtitles,
      description: shortSummary,
      subject: subject,
      totalHoursOfCourse: sumOfHours,
      language: language,
      discount: 0,
      rating: 0,
      exercises: [],
    };
    event.preventDefault();
    event.target.reset();
    let config = {
      headers: {
        header1: "Access-Control-Allow-Origin",
      },
    };
    try {
      const res = await axios.post("/instructor/addCourse", course, config);
    } catch (e) {
      console.log(e);
    }
  };

  let handleChange = (i, e) => {
    let newFormValues = [...subtitles];
    newFormValues[i][e.target.name] = e.target.value;
    setSubtitles(newFormValues);
  };

  let addFormFields = () => {
    setSubtitles([...subtitles, { subtitle: "", time: "" }]);
  };

  let removeFormFields = (i) => {
    let newFormValues = [...subtitles];
    newFormValues.splice(i, 1);
    setSubtitles(newFormValues);
  };
  return (
    <div className="contains">
      <h1 className="title">Add A new Course</h1>
      <form onSubmit={handleSubmit}>
        <div className={CreateCourseStyles["row"]}>
          <label>
            title <span className="required">*</span>
          </label>
          <input
            required
            type="text"
            name="title"
            placeholder="title.."
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          {subtitles.map((element, index) => (
            <div className={CreateCourseStyles["row"]} key={index}>
              <label>subtitle</label>
              <input
                required
                type="text"
                name="subtitle"
                value={element.subtitle || ""}
                onChange={(e) => handleChange(index, e)}
              />
              {"   "}
              <label> time in hrs</label>
              <input
                required
                type="number"
                name="time"
                value={element.time || ""}
                onChange={(e) => handleChange(index, e)}
              />
              {index ? (
                <button
                  type="button"
                  className="button remove"
                  onClick={() => removeFormFields(index)}
                >
                  Remove
                </button>
              ) : null}
            </div>
          ))}
          <span className="button-section">
            <button
              className="button add"
              type="button"
              onClick={() => addFormFields()}
            >
              Add
            </button>
          </span>
        </div>
        <div className={CreateCourseStyles["row"]}>
          <label>
            price in $ <span className="required">*</span>
          </label>
          <input
            required
            readOnly={free}
            // type="currency"
            type="number"
            name="price"
            placeholder="price.."
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <input
            type="checkbox"
            id="freeCheck"
            onClick={(e) => {
              setFree(e.target.checked);
              setPrice("0");
            }}
          />
          free
        </div>

        <div className={CreateCourseStyles["row"]}>
          <label>
            shortSummary <span className="required">*</span>
          </label>
          <input
            required
            type="text"
            name="shortSummary"
            placeholder="shortSummary.."
            onChange={(e) => setShortSummary(e.target.value)}
          />
        </div>
        <div className={CreateCourseStyles["row"]}>
          <label>subject</label>
          <input
            type="text"
            name="subject"
            placeholder="subject.."
            onChange={(e) => setSubject(e.target.value)}
          />
        </div>
        <div className={CreateCourseStyles["row"]}>
          <label>
            instructor username <span className="required">*</span>
          </label>
          <input
            required
            type="text"
            name="username"
            placeholder="username.."
            onChange={(e) => setInstructor(e.target.value)}
          />
        </div>
        <div className={CreateCourseStyles["row"]}>
          <label>language</label>

          <select
            data-placeholder="Choose a Language..."
            onChange={(e) => {
              setLanguage(e.target.value);
            }}
          >
            <option value="Afrikaans">Afrikaans</option>
            <option value="Albanian">Albanian</option>
            <option value="Arabic">Arabic</option>
            <option value="Armenian">Armenian</option>
            <option value="Basque">Basque</option>
            <option value="Bengali">Bengali</option>
            <option value="Bulgarian">Bulgarian</option>
            <option value="Catalan">Catalan</option>
            <option value="Cambodian">Cambodian</option>
            <option value="Chinese (Mandarin)">Chinese (Mandarin)</option>
            <option value="Croatian">Croatian</option>
            <option value="Czech">Czech</option>
            <option value="Danish">Danish</option>
            <option value="Dutch">Dutch</option>
            <option value="English">English</option>
            <option value="Estonian">Estonian</option>
            <option value="Fiji">Fiji</option>
            <option value="Finnish">Finnish</option>
            <option value="French">French</option>
            <option value="Georgian">Georgian</option>
            <option value="German">German</option>
            <option value="Greek">Greek</option>
            <option value="Gujarati">Gujarati</option>
            <option value="Hebrew">Hebrew</option>
            <option value="Hindi">Hindi</option>
            <option value="Hungarian">Hungarian</option>
            <option value="Icelandic">Icelandic</option>
            <option value="Indonesian">Indonesian</option>
            <option value="Irish">Irish</option>
            <option value="Italian">Italian</option>
            <option value="Japanese">Japanese</option>
            <option value="Javanese">Javanese</option>
            <option value="Korean">Korean</option>
            <option value="Latin">Latin</option>
            <option value="Latvian">Latvian</option>
            <option value="Lithuanian">Lithuanian</option>
            <option value="Macedonian">Macedonian</option>
            <option value="Malay">Malay</option>
            <option value="Malayalam">Malayalam</option>
            <option value="Maltese">Maltese</option>
            <option value="Maori">Maori</option>
            <option value="Marathi">Marathi</option>
            <option value="Mongolian">Mongolian</option>
            <option value="Nepali">Nepali</option>
            <option value="Norwegian">Norwegian</option>
            <option value="Persian">Persian</option>
            <option value="Polish">Polish</option>
            <option value="Portuguese">Portuguese</option>
            <option value="Punjabi">Punjabi</option>
            <option value="Quechua">Quechua</option>
            <option value="Romanian">Romanian</option>
            <option value="Russian">Russian</option>
            <option value="Samoan">Samoan</option>
            <option value="Serbian">Serbian</option>
            <option value="Slovak">Slovak</option>
            <option value="Slovenian">Slovenian</option>
            <option value="Spanish">Spanish</option>
            <option value="Swahili">Swahili</option>
            <option value="Swedish ">Swedish </option>
            <option value="Tamil">Tamil</option>
            <option value="Tatar">Tatar</option>
            <option value="Telugu">Telugu</option>
            <option value="Thai">Thai</option>
            <option value="Tibetan">Tibetan</option>
            <option value="Tonga">Tonga</option>
            <option value="Turkish">Turkish</option>
            <option value="Ukrainian">Ukrainian</option>
            <option value="Urdu">Urdu</option>
            <option value="Uzbek">Uzbek</option>
            <option value="Vietnamese">Vietnamese</option>
            <option value="Welsh">Welsh</option>
            <option value="Xhosa">Xhosa</option>
          </select>
        </div>
        <div>
          <input required type="checkbox" on></input> I agree to the Contract
          license and{" "}
          <Link target="_blank" to="/instructor/contract/">
            Instructor terms
          </Link>{" "}
          used by the organization
        </div>

        <input type="submit" value="create Course" />
      </form>
    </div>
  );
};

export default CreateCourse;
