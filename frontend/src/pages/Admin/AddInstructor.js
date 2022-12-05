import { useState } from "react";
import axios from "axios";
import "./AddInstructor.css";
import Instimg from "../../static/Instructor.png"

const AddInstructor = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const handleSumbit = async (event) => {
    const instructor = {
      firstname: firstname,
      lastname :lastname,
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
      console.log(res.data);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className="new">
      <div className="newContainer">
        <div className="top">
          <h1 className="h1Class">Add new Instructor</h1>
        </div>
        <div className="bottom">
          <div className="right">
      <form  className = "formClass" onSubmit={handleSumbit}>
      <div className="formInput">
                <label className="labelClass">
                  First name <span className="required">*</span>
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
                  Last name <span className="required">*</span>
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
        <label  className="labelClass">
          Email <span className="required">*</span>
        </label>
        <input
          type="text"
          name="email"
          placeholder="Email.."
          required
          className="inputClass"

          onChange={(e) => setEmail(e.target.value)}
        />        </div>
        <div className="formInput">


        <label className="labelClass">
          username <span className="required">*</span>
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
          password <span className="required">*</span>
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

        <label className="labelClass">gender</label>
        <select
          id="gender"
          name="gender "
          className="selectClass"
          onChange={(e) => setGender(e.target.value)}
        >
          <option value="male">male</option>
          <option value="female">female</option>
        </select>
        </div>

        <button className="buttonClass">Send</button>
      </form>
      </div>
      </div>
      </div>
    </div>
  );
};

export default AddInstructor;
