import React, { useState, useEffect } from "react";
import InstructorProfileStyles from "./InstructorProfile.module.css";

function InstructorProfile() {
  const [email, setEmail] = useState("");
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
  const handleUpdateEmail = async (e) => {
    e.preventDefault();
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
      <h3>InstructorProfile:</h3>
      <div>
        {Object.keys(instructor).map((key, index) => {
          return (
            <div key={index}>
              <div>
                {key}: {instructor[key]}
              </div>

              <hr />
            </div>
          );
        })}
      </div>
      <form>
        <div>Change Email:</div>
        <input
          required
          type="email"
          placeholder="enter new email"
          value={email}
          onChange={handleEmailChange}
        ></input>
        <button
          type="submit"
          onClick={handleUpdateEmail}
          className={InstructorProfileStyles["button"]}
        >
          update Email
        </button>
      </form>
      <form>
        <div>Change Bio: </div>
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
