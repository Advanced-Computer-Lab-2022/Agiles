import { useState } from "react";
import axios from "axios";
import "./AddInstructor.css";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
const AddInstructor = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const handleSumbit = async (event) => {
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
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className="new">
      <div className="newContainer">
        <div className="top">
          <h1 className="h1Class">Add new instructor</h1>
        </div>
        <div className="bottom">
          <div className="right">
            <form className="formClass" onSubmit={handleSumbit}>
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
                  style={{ padding: "0", borderRadius: "25px" }}
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
                {/* <label className="labelClass">gender</label>
                <select
                  id="gender"
                  name="gender "
                  className="selectClass"
                  onChange={(e) => {
                    setGender(e.target.value);
                    console.log(gender);
                  }}
                > */}
                {/* <option value="male">Male</option>
                  <option value="female">Female</option>
                </select> */}
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
