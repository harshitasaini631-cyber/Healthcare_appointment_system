import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <h2>MediBook</h2>
      <div>
        <Link to="/">Home</Link>
        <Link to="/doctors">Doctors</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/analytics">Analytics</Link>
      </div>
    </nav>
  );
}

export default Navbar;