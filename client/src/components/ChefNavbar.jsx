import React from "react";
import { Link } from "react-router-dom";
import "./../styles/global.css";
import "./../styles/Navbar.css";

const ChefNavbar = () => {
  return (
    <header className="navbar">
      <div className="navbar-logo">
        <h1>Recipe Hub</h1>
      </div>
      <nav className="navbar-links">
        <Link to="/recipes" className="nav-link">My Recipes</Link>
        

        <a href="#footer" className="nav-link">About</a>
      </nav>

    </header>
  );
};

export default ChefNavbar;