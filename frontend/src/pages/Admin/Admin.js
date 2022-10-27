import {Link} from 'react-router-dom'
import "./Admin.css";

const Admin = () => {

  return (
    <div className="adminContainer">
      <Link to="/addAdmin">
        <button>Add new Admin</button>
      </Link>
         <Link to="/addInstructor">
        <button>Add new Instructor </button>
      </Link>
      <Link to="/addCorporate">
        <button>Add new Corporate trainee</button>
      </Link>
    </div>
  );
};

export default Admin;
