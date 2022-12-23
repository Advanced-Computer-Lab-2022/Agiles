import { useState } from "react";
import axios from "axios";
import "./AddInstructor.css";
import Alert from "@mui/material/Alert";

const AddAdmin = (props) => {
  const [username, setUsername] = useState("");
  const [confirm, setConfirm] = useState("");

  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState("");
  const [flag, setFlag] = useState(false);
  const handleSubmit = async (event) => {
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
            <form className="formClassAdmin" onSubmit={handleSubmit}>
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
                <div className="formInputAdmin">
                  <label className="labelClass">
                    Confirm Password <span className="required">*</span>
                  </label>
                  <input
                    type="password"
                    name="confirm"
                    required
                    placeholder="password.."
                    className="inputClass"
                    onChange={(e) => setConfirm(e.target.value)}
                  />
                </div>
              </div>
              <div className="buttonContAdmin">
                <button className="buttonClass">Send</button>
              </div>
            </form>
          </div>
        </div>
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
                ? "admin added successfully"
                : "username already taken"}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
};
export default AddAdmin;
