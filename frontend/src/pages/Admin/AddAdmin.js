import { useState } from "react";
import axios from "axios";
import "./AddInstructor.css";
const AddAdmin = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  props.funcNav(false);
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
      console.log(res.data);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className="contains">
      <h1 className="title">Add A NEW ADMIN</h1>
      <form onSubmit={handleSumbit}>
        <label>
          username <span className="required">*</span>
        </label>
        <input
          type="text"
          name="username"
          placeholder="username.."
          onChange={(e) => setUsername(e.target.value)}
        />
        <label>
          password <span className="required">*</span>
        </label>
        <input
          type="password"
          name="password"
          placeholder="password.."
          onChange={(e) => setPassword(e.target.value)}
        />

        <input type="submit" />
      </form>
    </div>
  );
};

export default AddAdmin;
