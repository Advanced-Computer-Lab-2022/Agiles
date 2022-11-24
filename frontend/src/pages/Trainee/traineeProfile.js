import React, { useState, useEffect } from "react";
import TraineeProfileStyles from "./TraineeProfile.module.css";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import "../Login.css";

function TraineeProfile() {
  const [errMsg, setErrMsg] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [oldPassword, setOldPassword] = useState(null);
  const [newPassword, setNewPassword] = useState(null);
  const [username, setUsername] = useState("");
  const [instructor, setInstructor] = useState({});
  const iTraineeId = "637ab83325ee8c662d55b415";
  useEffect(() => {
    setErrMsg("");
  }, [oldPassword, newPassword]);

  const handleUpdatingPassword = async (event) => {
    event.preventDefault();
    event.target.reset();
    const passwordObject = {
      oldPass: oldPassword,
      newPass: newPassword,
    };

    let config = {
      headers: {
        header1: "Access-Control-Allow-Origin",
      },
    };
    try {
      const res = await axios.patch(
        `/individualtrainee/updatePassword?id=${iTraineeId}`,
        passwordObject,
        config
      );
      alert("Password Updated succesfuly");
    } catch (err) {
      console.log(err);
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("wrong username fetched not exist");
      } else if (err.response?.status === 401) {
        setErrMsg("old Password incorrect");
      } else if (err.response?.status === 500) {
        setErrMsg("please Fill all fields");
      }
    }
  };

  const handleUpdateUsername = async (e) => {
    // e.preventDefault();
    try {
      await fetch(`/individualtrainee/updateUsername?id=${iTraineeId}`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "PATCH",
        body: JSON.stringify({ username: username }),
      });
    } catch (e) {
      console.log(e);
    }
    setUsername(username);
  };

  const handleUpdateEmail = async (e) => {
    e.preventDefault();
    e.target.reset();
    try {
      await fetch(`/individualtrainee/updateEmail?id=${iTraineeId}`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "PATCH",
        body: JSON.stringify({ email: email }),
      });
      setEmail(email);
    } catch (e) {
      console.log(e);
    }
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };
  return (
    <div>
      <div className={TraineeProfileStyles["mainTop"]}>My Profile</div>

      <div className={TraineeProfileStyles["head"]}>
        Edit your profile section :
      </div>
      <br></br>
      <div className={TraineeProfileStyles["bigDiv"]}>
        {/* <form onSubmit={handleUpdateEmail}>
          <div className={TraineeProfileStyles["subtitleItem"]}>
            Change Email:{" "}
          </div>
          <input
            required
            type="email"
            placeholder="enter new email"
            value={email}
            onChange={handleEmailChange}
          ></input>
          <button type="submit" className={TraineeProfileStyles["button"]}>
            update Email
          </button>
        </form> */}
        <form onSubmit={handleUpdatingPassword}>
          <div className={TraineeProfileStyles["subtitleItem"]}>
            Change password:{" "}
          </div>
          {/* old */}
          <p className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">
            {errMsg}
          </p>
          <input
            required
            type="password"
            placeholder="enter old password"
            onChange={(e) => {
              setOldPassword(e.target.value);
            }}
          ></input>
          <br></br>
          {/* new */}
          <input
            required
            type="password"
            placeholder="enter new password"
            onChange={(e) => {
              setNewPassword(e.target.value);
            }}
          ></input>
          <button type="submit" className={TraineeProfileStyles["button"]}>
            update Password
          </button>
        </form>
        {/* <form>
          <div className={TraineeProfileStyles["subtitleItem"]}>
            Change Username:{" "}
          </div>
          <input
            required
            placeholder="enter new Username"
            value={username}
            onChange={handleUsernameChange}
          ></input>{" "}
          <button
            type="submit"
            onClick={handleUpdateUsername}
            className={TraineeProfileStyles["button"]}
          >
            Update Username
          </button>
        </form> */}
      </div>
    </div>
  );
}

export default TraineeProfile;
