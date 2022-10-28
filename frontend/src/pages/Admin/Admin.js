import {Link} from 'react-router-dom'
import "./Admin.css";

const Admin = (props) => {
  props.funcNav(false);
  return (
    <div className="adminContainer">
      <Link to="/addAdmin">
        <button className='btn'>Add new Admin</button>
      </Link>
         <Link to="/addInstructor">
        <button className='btn'>Add new Instructor </button>
      </Link>
      <Link to="/addCorporate">
        <button className='btn'>Add new Corporate trainee</button>
      </Link>
    </div>
  );
};

export default Admin;
