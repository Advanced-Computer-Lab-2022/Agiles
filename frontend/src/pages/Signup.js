import "./Login.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useRef, useState, useEffect } from "react";
import Swal from "sweetalert2";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
//validation
const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const SIGNUP_URL ="/admin/signUp";
const SignUp = () => {
  const userRef = useRef();
  const errRef = useRef();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [password, setPassword] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [email, setEmail] = useState("");

  const [firstname, setFirstname] = useState("");

  const [lastname, setLastname] = useState("");

  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    setValidName(USER_REGEX.test(username));
  }, [username]);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(password));
  }, [password]);
  useEffect(() => {
    setErrMsg("");
  }, [username, password]);
  const handleSumbit = async (event) => {
    event.preventDefault();
    const v1 = USER_REGEX.test(username);
    const v2 = PWD_REGEX.test(password);
    if (!v1 || !v2) {
        setErrMsg("Invalid Entry");
        return;
    }
    const user = {
      username: username,
      email: email,
      password: password,
      firstname: firstname,
      lastname: lastname,
    };
    let config = {
      headers: {
        header1: "Access-Control-Allow-Origin",
      },
    };
    try {
       await axios.post(SIGNUP_URL, user, config);
       const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
      
      Toast.fire({
        icon: 'success',
        title: 'Signed in successfully'
      })
      navigate('/login');
    } catch (err) {
      if (!err?.response) {
        setErrMsg('No Server Response');
    } else if (err.response?.status === 409) {
        setErrMsg('Username Taken');
    } else {
        setErrMsg('Registration Failed')
    }
    errRef.current.focus();

    }
  };

  return (
    <div className="Auth-form-container">
      <form className="Auth-form" onSubmit={handleSumbit}>
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign Up</h3>
          <div className="text-center">
            Already registered? <Link to="/Login" style={{color:'#a00407'}}>Log In</Link>
          </div>
          <p
            ref={errRef}
            className={errMsg ? "errmsg" : "offscreen"}
            aria-live="assertive"
          >
            {errMsg}
          </p>
          <div className="form-group mt-1">
            <label className="Auth-label">First Name
            <FontAwesomeIcon
                icon={faCheck}
                className={firstname ? "valid" : "hide"}
              />
            </label>
            <input
              className="form-control mt-1"
              placeholder="e.g Hossam "
              required
              onChange={(e) => setFirstname(e.target.value)}
            />
          </div>
          <div className="form-group mt-1">
            <label className="Auth-label">Last Name
            <FontAwesomeIcon
                icon={faCheck}
                className={lastname ? "valid" : "hide"}
              /></label>
            <input
              className="form-control mt-1"
              placeholder="e.g  Elfar"
              required
              onChange={(e) => setLastname(e.target.value)}
            />
          </div>

          <div className="form-group mt-1">
            <label className="Auth-label">Email address
            <FontAwesomeIcon
                icon={faCheck}
                className={email ? "valid" : "hide"}
              /></label>
            <input
              type="email"
              className="form-control mt-1"
              placeholder="Email Address"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group mt-1">
            <label className="Auth-label">
              username
              <FontAwesomeIcon
                icon={faCheck}
                className={validName ? "valid" : "hide"}
              />
              <FontAwesomeIcon
                icon={faTimes}
                className={validName || !username ? "hide" : "invalid"}
              />
            </label>
            <input
              className="form-control mt-1"
              placeholder="username"
              required
              onChange={(e) => setUsername(e.target.value)}
              aria-invalid={validName ? "false" : "true"}
              aria-describedby="uidnote"
              onFocus={() => setUserFocus(true)}
              onBlur={() => setUserFocus(false)}
            />
          </div>
          <p
            id="uidnote"
            className={
              userFocus && username && !validName ? "instructions" : "offscreen"
            }
          >
            <FontAwesomeIcon icon={faInfoCircle} />
            4 to 24 characters.
            <br />
            Must begin with a letter.
            <br />
            Letters, numbers, underscores, hyphens allowed.
          </p>

          <div className="form-group mt-1">
            <label className="Auth-label">
              Password
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
              placeholder="Password"
              required
              onChange={(e) => setPassword(e.target.value)}
              aria-invalid={validPwd ? "false" : "true"}
              aria-describedby="pwdnote"
              onFocus={() => setPwdFocus(true)}
              onBlur={() => setPwdFocus(false)}
            />
          </div>
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

          <div className="d-grid gap-2 mt-3 ">
            <button disabled={!validName || !validPwd || !firstname ||!lastname ||!email? true : false} className="btn btn-primary"   style={{backgroundColor:'#a00407',border:'none'}}>
              Submit
            </button>
          </div>
          <div className="footForm">
            <input type="checkbox" required />
            <p>
              I agree to <Link to="/user/terms" style={{color:'#a00407'}}>terms & conditions </Link>
            </p>
          </div>
        </div>
      </form>
    </div>)
};

export default SignUp;
