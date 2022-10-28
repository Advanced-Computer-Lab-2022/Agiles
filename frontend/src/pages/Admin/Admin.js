import "./Admin.css";
import AdminNavbar from './adminComponents/AdminNavbar';
import AdminSidebar from './adminComponents/AdminSidebar';
const Admin = (props) => {
  props.funcNav(false);
  return (
    <div className="admin">
      <AdminSidebar/>
      <div className='adminContainer'>
        <h1>Admin home page</h1>

      <AdminNavbar/>
      </div>

    </div>
  );
};

export default Admin;
