import "./Login.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const SignUp = () => {
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    const [email,setEmail] = useState('');
    const [firstname,setFirstname] = useState('');
    const [lastname ,setLastname] = useState('');
    const navigate = useNavigate();
    const handleSumbit =async (event)=>{
        event.preventDefault();
        const user = {
            username : username,
            email :email ,
            password : password,
            firstname :firstname,
            lastname : lastname
        }
        let config = {
            headers: {
              header1: "Access-Control-Allow-Origin",
            },
          };
          try {
            const res = await axios.post("/admin/signUp", user, config);
            console.log(res.data);
            navigate("/Login")
          } catch (e) {
            console.log(e);
          }

    }

  return (
    <div className="Auth-form-container">
      <form className="Auth-form" onSubmit={handleSumbit}>
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign Up</h3>
          <div className="text-center">
            Already registered? <a href="/Login">Log In</a>
          </div>
          <div className="form-group mt-3">
            <label className="Auth-label">First Name</label>
            <input
              className="form-control mt-1"
              placeholder="e.g Hossam "
              required
              onChange={(e)=>setFirstname(e.target.value)}
            />
          </div>
          <div className="form-group mt-3">
            <label className="Auth-label">Last Name</label>
            <input
              className="form-control mt-1"
              placeholder="e.g  Elfar"
              required
              onChange={(e)=>setLastname(e.target.value)}
            />
          </div>
          
          <div className="form-group mt-3">
            <label className="Auth-label">Email address</label>
            <input
              type="email"
              className="form-control mt-1"
              placeholder="Email Address"
              required
              onChange={(e)=>setEmail(e.target.value)}
            />
          </div>
          <div className="form-group mt-3">
            <label className="Auth-label">username</label>
            <input
              className="form-control mt-1"
              placeholder="e.g  hossamElfar41"
              required
              onChange={(e)=>setUsername(e.target.value)}
            />
          </div>
          <div className="form-group mt-3">
            <label className="Auth-label">Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Password"
              required
              onChange={(e)=>setPassword(e.target.value)}
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
          <div className="last">
            <input type="checkbox" required/>
            <p className="footForm">
              I agree to <a href="terms-conditions">terms & conditions </a>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
