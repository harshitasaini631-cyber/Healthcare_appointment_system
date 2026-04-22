import { Link } from "react-router-dom";
import { useThemeContext } from "../context/ThemeContext";

function Navbar() {
  const { darkMode, toggleDarkMode } = useThemeContext();

  return (
    <nav>
      <h2>MediBook</h2>

      <div className="nav-right">
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/doctors">Doctors</Link>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/analytics">Analytics</Link>
        </div>

        <button className="theme-toggle-btn" onClick={toggleDarkMode}>
          {darkMode ? "Light" : "Dark"}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;