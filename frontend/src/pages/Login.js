import "./Login.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import axios from "axios";
const LOGIN_URL = "/admin/logIn";
const cookies = new Cookies();
const Login = () => {
    const errRef = useRef();
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    const [errMsg, setErrMsg] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    setErrMsg("");
  }, [username, password]);
  const handleSumbit = async (event) => {
    event.preventDefault();
    const user = {
      username: username,
      password: password,
    };
    let config = {
      headers: {
        header1: "Access-Control-Allow-Origin",
      },
    };
    try {
      const res = await axios.post(LOGIN_URL, user, config);
      localStorage.setItem("username", res.data.username);
      if (cookies.get("status")==3){
        navigate("/admin");
      }
      else{
        navigate("/");
      }
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Username not exist");
      } else {
        setErrMsg("Invalid Credentials");
      }
    }
  };
  return (
    <div className="Auth-form-container">
      <form className="Auth-form" onSubmit={handleSumbit}>
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Log In</h3>
          <p
            ref={errRef}
            className={errMsg ? "errmsg" : "offscreen"}
            aria-live="assertive"
          >
            {errMsg}
          </p>
          <div className="form-group mt-3">
            <label className="Auth-label">username</label>
            <input
              type="username"
              className="form-control "
              
              required
              placeholder="Enter username"
              onChange={(e) => setUsername(e.target.value)}

            />
          </div>
          <div className="form-group mt-3">
            <label className="Auth-label">password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Enter password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="d-grid gap-2 mt-2">
            <button
              disabled={!username || !password ? true : false}
              className="btn btn-primary"
              style={{backgroundColor:'#a00407',border:'none'}}
            >
              Log In
            </button>
          </div>
          <p className="footforget">
             <Link to="/forgotpassword" style={{color:'#a00407'}}>Forgotten password?</Link>
          </p>
          <p className="NoAccount">
            Don't have account? <Link to="/signUp" style={{color:'#a00407 '}}>Sign up</Link> </p>
      
          
        </div>
      </form>
    </div>
  );
};

export default Login;
