import React from "react";
import InstructorProfileStyles from "./InstructorProfile.module.css";

function InstructorProfile() {
  return (
    <div>
      <h3>InstructorProfile:</h3>
      <form>
        <div>Change Email:</div>
        <input type="text" placeholder="enter new email"></input>
        <button type="submit" className={InstructorProfileStyles["button"]}>
          update Email
        </button>
      </form>
      <form>
        <div>Change Bio: </div>
        <textarea placeholder="enter new Bio"></textarea>{" "}
        <button type="submit" className={InstructorProfileStyles["button"]}>
          update Bio
        </button>
      </form>
    </div>
  );
}

export default InstructorProfile;
