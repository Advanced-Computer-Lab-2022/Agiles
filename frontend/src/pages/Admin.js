import { useState } from "react";
import axios from "axios";
import "./Admin.css";

const Admin = () => {
  const [adminUsername, setAdminUsername] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [instUsername, setInstUsername] = useState("");
  const [instPassword, setInstPassword] = useState("");
  const [corporateUsername, setCorporateUsername] = useState("");
  const [corporatePassword, setCorporatePassword] = useState("");
  const [adminmessage, setAdminMessage] = useState("");
  const [instmessage, setInstMessage] = useState("");
  const [corporatemessage, setCorporateMessage] = useState("");
  const handleAddAdmin = async (event) => {
    const admin = { username: adminUsername, password: adminPassword };
    event.preventDefault();
    event.target.reset();
    let config = {
      headers: {
        header1: "Access-Control-Allow-Origin",
      },
    };
    try {
      const res = await axios.post("/api/admin/addAdmin", admin, config);
      console.log(res.data);
      setAdminMessage("new Admin added successfully");
    } catch (e) {
      console.log(e);
      setAdminMessage("Error happend");
    }
  };
  const handleAddInstructor = async (event) => {
    const inst = { username: instUsername, password: instPassword };
    event.preventDefault();
    event.target.reset();
    let config = {
      headers: {
        header1: "Access-Control-Allow-Origin",
      },
    };
    try {
      const res = await axios.post("/api/admin/addInstructor", inst, config);
      console.log(res.data);
      setInstMessage("new Inst added successfully");
    } catch (e) {
      console.log(e);
      setInstMessage("Error happend");
    }
  };
  const handleAddCorporate = async (event) => {
    const corporate = {
      username: corporateUsername,
      password: corporatePassword,
    };
    event.preventDefault();
    event.target.reset();
    let config = {
      headers: {
        header1: "Access-Control-Allow-Origin",
      },
    };
    try {
      const res = await axios.post(
        "/api/admin/addCorporate",
        corporate,
        config
      );
      console.log(res.data);
      setCorporateMessage("new Corporate added successfully");
    } catch (e) {
      console.log(e);
      setCorporateMessage("Error happend");
    }
  };
  return (
    <div className="adminContainer">
      <form onSubmit={handleAddAdmin} id="admin">
        <label>Add new Admin</label>
        <br></br>
        <label>
          Name:
          <br></br>
          <input
            type="text"
            name="username"
            onChange={(e) => setAdminUsername(e.target.value)}
          />
          <br></br>
          <input
            type="password"
            name="password"
            onChange={(e) => setAdminPassword(e.target.value)}
          />
        </label>
        <br></br>
        <input type="submit" />
        <br></br>
        {adminmessage && <label className="label">{adminmessage}</label>}
      </form>

      <form onSubmit={handleAddInstructor} id="inst">
        <label>Add new Instructor</label>
        <br></br>
        <label>
          Name:
          <br></br>
          <input
            type="text"
            name="username"
            onChange={(e) => setInstUsername(e.target.value)}
          />
          <br></br>
          <input
            type="password"
            name="password"
            onChange={(e) => setInstPassword(e.target.value)}
          />
        </label>
        <br></br>
        <input type="submit" />
        <br></br>
        {instmessage && <label className="label">{instmessage}</label>}
      </form>

      <form onSubmit={handleAddCorporate} id="corporate">
        <label>Add new Corporate</label>
        <br></br>
        <label>
          Name:
          <br></br>
          <input
            type="text"
            name="username"
            onChange={(e) => setCorporateUsername(e.target.value)}
          />
          <br></br>
          <input
            type="password"
            name="password"
            onChange={(e) => setCorporatePassword(e.target.value)}
          />
        </label>
        <br></br>
        <input type="submit" />
        <br></br>
        {corporatemessage && (
          <label className="label">{corporatemessage}</label>
        )}
      </form>
    </div>
  );
};

export default Admin;
