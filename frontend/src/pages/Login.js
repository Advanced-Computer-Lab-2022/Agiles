import "./Login.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import clearAuth from "../clearAuth";
import Cookies from "universal-cookie";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import Swal from "sweetalert2";
const LOGIN_URL = "/admin/logIn";
const cookies = new Cookies();
const Login = () => {
  const errRef = useRef();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [show, setShow] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirm] = useState("");
  const handleClose = () => setShow(false);

  const navigate = useNavigate();
  useEffect(() => {
    setErrMsg("");
  }, [username, password]);
  useEffect(() => {
    clearAuth();
  }, []);
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
      if (cookies.get("status") == 3) {
        navigate("/admin/dashboard");
      } else if (cookies.get("status") == 1) {
        if (res.data.firstLogIn) {
          setShow(true);
        } else {
          navigate("/");
        }
      } else {
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
  const ResetPassword = async (event) => {
    event.preventDefault();
    if (newPassword!=confirmPassword){
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
      
      Toast.fire({
        icon: 'error',
        title: 'passwords must match'
      })
    }
    else{
      try{
        await axios.post('/instructor/firstLoginReset',{password:newPassword});
        setShow(false);
        navigate("/");
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })
        
        Toast.fire({
          icon: 'success',
          title: 'password reset successfully'
        })
      }
      catch(e){
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })
        
        Toast.fire({
          icon: 'error',
          title: 'server error'
        })
      }
    }
  };
  return (
    <div className="Auth-form-container">
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Reset password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={ResetPassword}>
            <div className="Auth-form-content">
              <div className="form-group mt-3">
                <label className="Auth-label">password</label>
                <input
                  type="password"
                  className="form-control "
                  required
                  placeholder="Enter password"
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
              <div className="form-group mt-3">
                <label className="Auth-label">confrim password</label>
                <input
                  type="password"
                  className="form-control mt-1"
                  placeholder="confirm password"
                  required
                  onChange={(e) => setConfirm(e.target.value)}
                />
              </div>
              <div className="d-grid gap-2 mt-2">
                <button
                  disabled={!username || !password ? true : false}
                  className="btn btn-primary"
                  style={{ backgroundColor: "#a00407", border: "none" }}
                >
                  Proceed
                </button>
              </div>
              <div className="footForm">
                <input type="checkbox" required />
                <p>
                  I agree to{" "}
                  <Link to="/user/terms" style={{ color: "#a00407" }}>
                    terms & conditions{" "}
                  </Link>
                </p>
              </div>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            close
          </Button>
        </Modal.Footer>
      </Modal>
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
          <div className="d-grid gap-2 mt-3">
            <button
              disabled={!username || !password ? true : false}
              className="btn btn-primary"
              style={{ backgroundColor: "#a00407", border: "none" }}
            >
              Log In
            </button>
          </div>
          <p className="footforget">
            <Link to="/forgotpassword" style={{ color: "#a00407" }}>
              Forgotten password?
            </Link>
          </p>
          <p className="NoAccount">
            Don't have account?{" "}
            <Link to="/signUp" style={{ color: "#a00407 " }}>
              Sign up
            </Link>{" "}
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
