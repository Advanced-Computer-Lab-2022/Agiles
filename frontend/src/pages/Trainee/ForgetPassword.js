import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Login.css";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Swal from "sweetalert2";
const FORGOT_URL = "/individualtrainee/forgotpassword";
const VERIFY_URL = "/individualtrainee/verifyCode";
const ForgetPassword = () => {
  const navigate = useNavigate();
  const [result0, setResult0] = useState(0);
  const [result1, setResult1] = useState(0);
  const [result2, setResult2] = useState(0);
  const [result3, setResult3] = useState(0);
  const [result4, setResult4] = useState(0);
  const [result5, setResult5] = useState(0);
  const [email, setEmail] = useState("");
  const [show, setShow] = useState(false);
  const handleClose = ()=>setShow (false);
  const handleSend = async(e) => {
    e.preventDefault();
    const data = ""+result0+result1+result2+result3+result4+result5;
    const body = {
      email : email,
      code :data
    }
    try{
      const res = await axios.post(VERIFY_URL,body);
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
        title: 'correct code'
      })
      setShow(false);
      navigate("/updateforgotpassword",{state:{email:email}});
    }
    catch(err){
      if (!err?.response) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Server error!",
        });
      } else  {
        Swal.fire({
          icon: "error",
          title: "incorrect Code !..",
          text: "try again",
          
        });
    }
  }
}
  const handleSumbit = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.post(FORGOT_URL, { email: email });
      setShow(true);
      //navigate("/forgotpassword/verifyCode")
    } catch (err) {
      if (!err?.response) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Server error!",
        });
      } else if (err.response?.status === 403) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
          footer: '<a href="">Why do I have this issue?</a>',
        });
      } else if (err.response?.status === 406) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Operation is forbidden!",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
      }
    }
  };
  return (
    <div className="Auth-form-container">
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Verify Code </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <form style={{display:'grid' ,justifyContent:'center'}}>
        <div style={{display:'grid' , gridTemplateColumns:'3rem 3rem 3rem 3rem 3rem 3rem' ,gap:'0.5rem' ,marginBottom:'1rem'}}>
        <input
            type='text'
            inputMode="numeric"
            pattern="[0-9]{1}"
            min="0"
            max ="9"
            maxLength="1"
            autoComplete="off"
            onChange={(e)=>setResult0(e.target.value)}
            required
          />
           <input
            type='text'
            inputMode="numeric"
            pattern="[0-9]{1}"
            min="0"
            max ="9"
            maxLength="1"
            autoComplete="off"
            onChange={(e)=>setResult1(e.target.value)}
            required
          />
           <input
            type='text'
            inputMode="numeric"
            pattern="[0-9]{1}"
            min="0"
            max ="9"
            maxLength="1"
            autoComplete="off"
            required
            onChange={(e)=>setResult2(e.target.value)}
          />
           <input
            type='text'
            inputMode="numeric"
            pattern="[0-9]{1}"
            min="0"
            max ="9"
            maxLength="1"
            autoComplete="off"
            required
            onChange={(e)=>setResult3(e.target.value)}
          />
           <input
            type='text'
            inputMode="numeric"
            pattern="[0-9]{1}"
            min="0"
            max ="9"
            maxLength="1"
            autoComplete="off"
            onChange={(e)=>setResult4(e.target.value)}
            required
          />
           <input
            type='text'
            inputMode="numeric"
            pattern="[0-9]{1}"
            min="0"
            max ="9"
            maxLength="1"
            autoComplete="off"
            onChange={(e)=>setResult5(e.target.value)}
            required
          />
          </div> 
         
          <button style = {{backgroundColor:'#1c1d1f' , color :'White' ,marginBottom:'0.25rem'}}  onClick={handleSend}>
            Send Code
          </button>
          <p className="footForm">
            Back to Log In? <a href="/logIn">Log In</a>
          </p>
      </form>
        </Modal.Body>
      </Modal>
      <form className="Auth-form" onSubmit={handleSumbit}>
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Forgot Password</h3>
          <div className="form-group d-grid gap-2 mt-3">
            <label className="Auth-label">email</label>
            <input
              type="email"
              className="form-control d-grid gap-2 mt-1"
              required
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button
            disabled={!email ? true : false}
            className="btn btn-primary"
            style={{ marginTop: "1rem" }}
          >
            sumbit
          </button>

          <p className="footForm">
            Back to Log In? <a href="/logIn">Log In</a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default ForgetPassword;
