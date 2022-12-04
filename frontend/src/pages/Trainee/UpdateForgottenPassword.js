import { useState, useEffect } from "react";
import "../Login.css";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Swal from "sweetalert2";
import axios from "axios";
import { Link, useLocation,useNavigate } from "react-router-dom";
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const CHANGE_PASSWORD = "individualtrainee/changePassword";
const UpdateForgottenPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state.email;
  const [password, setPassword] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      password: password,
      email: email,
    };
    let config = {
        headers: {
          header1: "Access-Control-Allow-Origin",
        },
      };
    if (password != confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "passwords must match !..",
        text: "try again",
      });
    } else {
      try {
        const res = await axios.patch('individualtrainee/changePassword', data,config);
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
          },
        });

        Toast.fire({
          icon: "success",
          title: "password changed",
        });
        navigate ('/logIn');
      } catch (err) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Server error!",
        });
      }
    }
  };
  useEffect(() => {
    setValidPwd(PWD_REGEX.test(password));
  }, [password]);
  return (
    <div className="Auth-form-container">
      <form className="Auth-form" onSubmit={handleSubmit}>
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Reset Password</h3>
          <div className="form-group mt-3">
            <label className="Auth-label">
              password
              <FontAwesomeIcon
                icon={faCheck}
                className={validPwd ? "valid" : "hide"}
              />
              <FontAwesomeIcon
                icon={faTimes}
                className={validPwd || !password ? "hide" : "invalid"}
              />
            </label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Enter password"
              required
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => setPwdFocus(true)}
              onBlur={() => setPwdFocus(false)}
            />
            <p
              id="pwdnote"
              className={pwdFocus && !validPwd ? "instructions" : "offscreen"}
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              8 to 24 characters.
              <br />
              Must include uppercase and lowercase letters,number and a special
              character.
              <br />
              Allowed special characters:{" "}
              <span aria-label="exclamation mark">!</span>{" "}
              <span aria-label="at symbol">@</span>{" "}
              <span aria-label="hashtag">#</span>{" "}
              <span aria-label="dollar sign">$</span>{" "}
              <span aria-label="percent">%</span>
            </p>
          </div>
          <div className="form-group mt-3">
            <label className="Auth-label">Re-type password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Re-type password"
              required
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <div className="d-grid gap-2 mt-2">
            <button
              disabled={
                !password || !confirmPassword || !validPwd ? true : false
              }
              className="btn btn-primary"
            >
              save
            </button>
          </div>
          <p className="footForm">
            <Link to="/logIn">Back to Login?</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default UpdateForgottenPassword;
