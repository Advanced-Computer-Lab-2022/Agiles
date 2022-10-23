import "./Navbar.css"
const Navbar = () => {
    return (
        <nav className = "navbar">
            <h1>Agiles</h1>
            <div className="links">
                <a href ="/">Home</a>
                <a href = "/courses">Courses</a>
                <a href ="/login">Log in</a>
                <a href ="/signup">Sign up</a>
            </div>

        </nav>
      );
}
 
export default Navbar;