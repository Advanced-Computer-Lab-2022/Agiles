import { useState } from "react";
import axios from "axios";
import "./AddInstructor.css";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Alert from "@mui/material/Alert";

const AddInstructor = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("male");
  const [alert, setAlert] = useState("");
  const [flag, setFlag] = useState(false);
  const handleSubmit = async (event) => {
    const instructor = {
      firstname: firstname,
      lastname: lastname,
      username: username,
      password: password,
      email: email,
      gender: gender,
    };
    event.preventDefault();
    event.target.reset();
    let config = {
      headers: {
        header1: "Access-Control-Allow-Origin",
      },
    };
    try {
      const res = await axios.post("/admin/addInstructor", instructor, config);
      setAlert("success");
      setFlag(true);
    } catch (e) {
      console.log(e);
      setAlert("error");
      setFlag(true);
    }
    setTimeout(() => {
      setFlag(false);
    }, 3000);
  };
  return (
    <div className="new">
      <div className="newContainer">
      <div
          className="alertContainer"
          style={{
            margin: "15px",
            width: "50%",
            minWidth: "500px",
            borderRadius: "25px",
          }}
        >
          {flag && (
            <Alert severity={alert} style={{ fontSize: "20px" }}>
              {alert == "success"
                ? "Instructor added successfully"
                : "username already taken"}
            </Alert>
          )}
        </div>
        <div className="top">
          <h1 className="h1Class">Add New Instructor</h1>
        </div>
        <div className="bottom">
          <div className="right">
            <form className="formClass" onSubmit={handleSubmit}>
              <div className="formInput">
                <label className="labelClass">
                  First Name <span className="required">*</span>
                </label>
                <input
                  type="text"
                  name="firstname"
                  required
                  placeholder="first name.."
                  className="inputClass"
                  onChange={(e) => setFirstname(e.target.value)}
                />
              </div>
              <div className="formInput">
                <label className="labelClass">
                  Last Name <span className="required">*</span>
                </label>
                <input
                  type="text"
                  name="last name"
                  required
                  placeholder="last name.."
                  className="inputClass"
                  onChange={(e) => setLastname(e.target.value)}
                />
              </div>
              <div className="formInput">
                <label className="labelClass">
                  Email <span className="required">*</span>
                </label>
                <input
                  type="text"
                  name="email"
                  placeholder="Email.."
                  required
                  className="inputClass"
                  onChange={(e) => setEmail(e.target.value)}
                />{" "}
              </div>
              <div className="formInput">
                <label className="labelClass">
                  Username <span className="required">*</span>
                </label>
                <input
                  type="text"
                  name="username"
                  required
                  placeholder="username.."
                  className="inputClass"
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="formInput">
                <label className="labelClass">
                  Password <span className="required">*</span>
                </label>
                <input
                  type="password"
                  name="password"
                  required
                  placeholder="password.."
                  className="inputClass"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="formInput">
                <label className="labelClass">Gender</label>
                <Select
                  style={{ padding: "0", borderRadius: "5px" }}
                  className="inputClass"
                  labelId="gender"
                  id="gender"
                  value={gender}
                  label="Age"
                  onChange={(e) => setGender(e.target.value)}
                >
                  <MenuItem value={"male"}>male</MenuItem>
                  <MenuItem value={"female"}>female</MenuItem>
                </Select>
              </div>
              <div className="buttonContainer">
                <button className="buttonClass">Submit</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddInstructor;
