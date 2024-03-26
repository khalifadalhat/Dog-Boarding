import { Link } from "react-router-dom";
import './navbar.css'

export const NavBar = () => {
  return (
    <div className="navbar">
      <div className="right">
      <Link to="/">Home</Link>
      <Link to="/signup">Sign Up</Link>
      <Link to="/login">Login</Link>
      </div>
    </div>
  );
};
