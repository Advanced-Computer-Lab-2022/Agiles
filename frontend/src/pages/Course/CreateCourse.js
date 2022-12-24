import React from "react";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import axios from "axios";
import style from "./CreateCourse.module.css";
import Swal from "sweetalert2";
const CREATEURL = "/instructor/addCourse";
const CreateCourse = () => {
  const [title, setTitle] = useState("");
  const [preview, setPreview] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [subject, setSubject] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [subtitles, setSubtitles] = useState([{ subtitle: "", time: 0 }]);
  const [free, setFree] = useState(false);
  const [language, setLanguage] = useState("");
  const [disabled, setDisabled] = useState(false);
  const navigate = useNavigate();
  const handleFree = (event) => {
    if (event.target.checked) {
      setFree(true);
      setDisabled(true);
    } else {
      setFree(false);
      setDisabled(false);
    }
  };
  const handleSubmit = async (event) => {
    const course = {
      title: title,
      imgUrl: imgUrl,
      coursePreviewUrl: preview,
      subtitles: subtitles,
      price: price,
      free: free,
      description: description,
      subject: subject,
      language: language,
    };
    event.preventDefault();
    try {
      const res = await axios.post(CREATEURL, course);
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
      });

      Toast.fire({
        icon: "success",
        title: "congratulations course created ",
      });
      navigate("/mycourses");
    } catch (e) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Server error!",
      });
    }
  };
  let handleChange = (i, e) => {
    let newFormValues = [...subtitles];
    newFormValues[i][e.target.name] = e.target.value;
    setSubtitles(newFormValues);
  };

  let addFormFields = () => {
    setSubtitles([...subtitles, { subtitle: "", time: 0 }]);
  };

  let removeFormFields = (i) => {
    let newFormValues = [...subtitles];
    newFormValues.splice(i, 1);
    setSubtitles(newFormValues);
  };
  return (
    <div className={style["main"]}>
      <h1>Create Course</h1>
      <form onSubmit={handleSubmit}>
        <label>Title</label>
        <input
          type="text"
          required
          placeholder="Web development.."
          onChange={(e) => setTitle(e.target.value)}
        ></input>
        <label>Description</label>
        <textarea
          type="text"
          required
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <label>Thumbnail</label>
        <input
          type="text"
          required
          placeholder="image Url.."
          onChange={(e) => setImgUrl(e.target.value)}
        ></input>
        <label>Subject</label>
        <input
          type="text"
          required
          placeholder="programming.."
          onChange={(e) => setSubject(e.target.value)}
        ></input>
        <label>Preview Video</label>
        <input
          type="text"
          required
          placeholder="video Url.."
          onChange={(e) => setPreview(e.target.value)}
        ></input>
        <label>Price</label>
        <div>
          <input
            type="number"
            disabled={disabled}
            required
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Price.."
            min="0"
            max="9999"
            style={{ width: "30%", height: "2rem" }}
          ></input>
          <input
            type="checkbox"
            onChange={handleFree}
            style={{ marginLeft: "1rem", height: "1rem" }}
            className={style["check"]}
          ></input>
          <span
            style={{
              marginLeft: "0.5rem",
              fontSize: "1rem",
              fontWeight: "bold",
            }}
          >
            Free
          </span>
        </div>
        <label>Subtitles</label>
        <div className={style["subtitles"]}>
          {subtitles.map((element, index) => (
            <>
              <input
                required
                type="text"
                placeholder="Subtitle name .."
                name="subtitle"
                value={element.subtitle || ""}
                onChange={(e) => handleChange(index, e)}
              />
              {index > 0 ? (
                <button
                  type="button"
                  className="button remove"
                  style={{
                    width: "5rem",
                    height: "2rem",
                    backgroundColor: "red",
                    color: "white",
                    border: "none",
                  }}
                  onClick={() => removeFormFields(index)}
                >
                  Remove
                </button>
              ) : null}
            </>
          ))}
          backgroundColor: "#a00407"
          <span className="button-section">
            <button
              className="button add"
              type="button"
              style={{
                backgroundColor: "#a00407",
                width: "5rem",
                height: "2rem",
                backgroundColor: "green",
                color: "white",
                border: "none",
              }}
              onClick={() => addFormFields()}
            >
              Add
            </button>
          </span>
        </div>
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
        <p className={style["end"]}>
          By completing your creation you agree to these{" "}
          <Link to="/instructor/terms" style={{ color: "#a00407" }}>
            Terms of Service
          </Link>
        </p>
        <Button variant="dark" type="submit" style={{ borderRadius: "0" }}>
          Finish{" "}
        </Button>
      </form>
    </div>
  );
};

export default CreateCourse;
