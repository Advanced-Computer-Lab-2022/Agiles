import { useState } from "react";
import axios from "axios";
import "./AddInstructor.css";
const AddAdmin = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleSumbit = async (event) => {
    const admin = { username: username, password: password };
    event.preventDefault();
    event.target.reset();
    let config = {
      headers: {
        header1: "Access-Control-Allow-Origin",
      },
    };
    try {
      const res = await axios.post("/admin/addAdmin", admin, config);
    } catch (e) {
      console.log(e);
    }
    setUsername("");
    setPassword("");
  };
  return (
    <div className="new">
      <div className="newContainer">
          <h1 >Add new admin</h1>
      
            <form className="formClass" onSubmit={handleSumbit}>
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
              <button className="buttonClass">Send</button>
            </form>
      </div>
    </div>
  );
};

export default AddAdmin;