import React, { useState, useEffect } from "react";
import InstructorProfileStyles from "./InstructorProfile.module.css";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import "../Login.css";

function InstructorProfile() {
  const navigate = useNavigate();
  const [errMsg, setErrMsg] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [oldPassword, setOldPassword] = useState(null);
  const [newPassword, setNewPassword] = useState(null);
  const [bio, setBio] = useState("");
  const [instructor, setInstructor] = useState({});
  const instructorid = "635fba2f99f3f855c075eb6d";

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handleBioChange = (e) => {
    setBio(e.target.value);
  };
  const handleUpdateBio = async (e) => {
    // e.preventDefault();
    try {
      await fetch(`/instructor/updateBio?id=${instructorid}`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "PATCH",
        body: JSON.stringify({ bio: bio }),
      });
    } catch (e) {
      console.log(e);
    }
    setBio(bio);
  };

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
        `/instructor/updatePassword?id=6379bae73eeedf94f9aa4713`,
        passwordObject,
        config
      );
      alert("Password Updated succesfuly");
    } catch (err) {
      console.log(err);
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Username not exist");
      } else if (err.response?.status === 401) {
        setErrMsg("old Password incorrect");
      } else if (err.response?.status === 500) {
        setErrMsg("please Fill all fields");
      }
    }
  };

  const handleUpdateEmail = async (e) => {
    e.preventDefault();
    e.target.reset();
    try {
      await fetch(`/instructor/updateEmail?id=${instructorid}`, {
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
  useEffect(() => {
    setErrMsg("");
  }, [oldPassword, newPassword]);
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`/instructor/instructorbyid?id=${instructorid}`);
      let jsondata = await res.json();
      if (res.ok) {
        setInstructor(jsondata);
      }
    };
    fetchData();
  }, [bio, email]);
  return (
    <div>
      <div className={InstructorProfileStyles["mainTop"]}>
        Instructor Profile
      </div>
      <div className={InstructorProfileStyles["bigDiv"]}>
        {Object.keys(instructor).map((key, index) => {
          return (
            <div key={index}>
              <div className={InstructorProfileStyles["item"]}>
                {key}: {instructor[key]}
              </div>

              <hr />
            </div>
          );
        })}
      </div>
      <form onSubmit={handleUpdateEmail}>
        <div className={InstructorProfileStyles["head"]}>
          Edit your profile section :
        </div>
        <br></br>

        <div className={InstructorProfileStyles["subtitleItem"]}>
          Change Email:{" "}
        </div>
        <input
          required
          type="email"
          placeholder="enter new email"
          value={email}
          onChange={handleEmailChange}
        ></input>
        <button type="submit" className={InstructorProfileStyles["button"]}>
          update Email
        </button>
      </form>
      <form onSubmit={handleUpdatingPassword}>
        <div className={InstructorProfileStyles["subtitleItem"]}>
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
        <button type="submit" className={InstructorProfileStyles["button"]}>
          update Password
        </button>
      </form>
      <form>
        <div className={InstructorProfileStyles["subtitleItem"]}>
          Change Bio:{" "}
        </div>
        <textarea
          required
          placeholder="enter new Bio"
          value={bio}
          onChange={handleBioChange}
        ></textarea>{" "}
        <button
          type="submit"
          onClick={handleUpdateBio}
          className={InstructorProfileStyles["button"]}
        >
          update Bio
        </button>
      </form>
    </div>
  );
}

export default InstructorProfile;
