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
        <div className="top">
          <h1 className="h1Class">Add New Admin</h1>
        </div>
        <div className="bottom-admin">
          <div className="right">
            <form className="formClassAdmin" onSubmit={handleSumbit}>
              <div style={{ width: "70%" }}>
                <div className="formInputAdmin">
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
                <div className="formInputAdmin">
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
              </div>
              <div className="buttonContAdmin">
                <button className="buttonClass">Send</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AddAdmin;
