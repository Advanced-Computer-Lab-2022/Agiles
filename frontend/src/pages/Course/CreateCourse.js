import React from "react";
import { useState } from "react";
import axios from "axios";
import InprogressStyles from "../../components/Inprogress.module.css";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";
import "bootstrap/dist/css/bootstrap.min.css";
const cookies = new Cookies();
const CreateCourse = () => {
  const instructorname = cookies.get('username');
  const instructorId = cookies.get('currentUser');
  const [title, setTitle] = useState("");
  const [preview, setPreview] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [subject, setSubject] = useState("");
  const [price, setPrice] = useState("");
  const [shortSummary, setShortSummary] = useState("");
  const [free, setFree] = useState(false);
  const [subtitles, setSubtitles] = useState([{ subtitle: "", time: ""}]);
  const [language, setLanguage] = useState("");
  const handleSubmit = async (event) => {
    let sumOfHours = 0;
    for (let sub of subtitles) {
      sumOfHours += Number(sub["time"]);
    }
    const course = {
      instructor : instructorId,
      title: title,
      imgUrl : imgUrl,
      coursePreviewUrl : preview,
      subtitles: subtitles,
      price: price,
      free: free,
      description: shortSummary,
      subject: subject,
      totalHoursOfCourse: sumOfHours,
      language: language
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
    setSubtitles([...subtitles, { subtitle: "", time: ""}]);
  };

  let removeFormFields = (i) => {
    let newFormValues = [...subtitles];
    newFormValues.splice(i, 1);
    setSubtitles(newFormValues);
  };
  return (
    <section className={InprogressStyles["Wrapper"]}>
    <h2 className={InprogressStyles["Wrapper_h2"]}>Create Course</h2>
      <form onSubmit={handleSubmit}style = {{width :'30%'}}>
        <div className="form-group mt-3">
          <label className="Auth-label">
            Title <span className="required">*</span>
          </label>
          <input
            required
            type="text"
            name="title"
            placeholder="title.."
            className="form-control mt-1"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div >
          <label className="Auth-label">Course Image</label>
          <input
            type="text"
            name="subject"
            className="form-control mt-1"
            placeholder="img url.."
            onChange={(e) => setImgUrl(e.target.value)}
          />
        </div>
        <div className="form-group mt-3">
          <label className="Auth-label" >
            Course preview Link 
          </label>
          <input
            required
            type="text"
            name="preview"
            className="form-control mt-1"
            placeholder="course preview link.."
            onChange={(e) => setPreview(e.target.value)}
          />
        </div>
        <div >
          <label className="Auth-label">
            price in $ <span className="required">*</span>
          </label>
          <input
            required
            readOnly={free}
            className="form-control mt-1"
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
        <div>
          {subtitles.map((element, index) => (
            <div  key={index}>
              <label className="Auth-label">Subtitle</label>
              <input
                required
                type="text"
                placeholder="Subtitle name .."
                name="subtitle"
                className="form-control mt-1"
                value={element.subtitle || ""}
                onChange={(e) => handleChange(index, e)}
              />
              <label> time in hrs</label>
              <input
                required
                type="number"
                name="time"
                placeholder="Subtitle duration .."
                className="form-control mt-1"
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
        

        <div >
          <label className="Auth-label">
            ShortSummary <span className="required">*</span>
          </label>
          <input
            required
            type="text"
            className="form-control mt-1"
            name="shortSummary"
            placeholder="shortSummary.."
            onChange={(e) => setShortSummary(e.target.value)}
          />
        </div>
        <div >
          <label className="Auth-label">Subject</label>
          <input
            type="text"
            name="subject"
            className="form-control mt-1"
            placeholder="subject.."
            onChange={(e) => setSubject(e.target.value)}
          />
        </div>
        <div >
          <label className="Auth-label">language</label>

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
          </Link>
          used by the organization
        </div>

        <input type="submit" className="btn btn-primary" value="create Course" />
      </form>
    </section>
  );
};

export default CreateCourse;
