import "./Login.css"
import "bootstrap/dist/css/bootstrap.min.css"
import { useState } from "react";
import {useNavigate} from "react-router-dom"
import axios from "axios";
const Login = () => {
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    const navigate = useNavigate();
    const handleSumbit =async (event)=>{
        event.preventDefault();
        const user = {
            username : username,
            password : password
        }
        let config = {
            headers: {
              header1: "Access-Control-Allow-Origin",
            },
          };
          try {
            const res = await axios.post("/admin/logIn", user, config);
            console.log(res.data);
            navigate("/")
          } catch (e) {
            console.log(e);
          }

    }
    return ( 
        <div className="Auth-form-container">
      <form className="Auth-form" onSubmit={handleSumbit}>
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Log In</h3>
          <div className="form-group mt-3">
            <label className="Auth-label">username</label>
            <input
              type="username"
              className="form-control mt-1"
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
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
          <p className = "footForm">
            Don't have account? <a href="/signUp">Sign up</a>
          </p>
        </div>
      </form>
    </div>
  
     );
}
 
export default Login;