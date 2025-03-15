import { Link } from "react-router-dom";
import { logout } from "../api/auth";

const Navbar = () => {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/dashboard">Dashboard</Link>
      <button onClick={logout}>Logout</button>
    </nav>
  );
};

export default Navbar;
