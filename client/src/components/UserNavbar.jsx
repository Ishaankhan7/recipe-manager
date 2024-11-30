import React from "react";
import { Link } from "react-router-dom";
import "./../styles/global.css";
import "./../styles/Navbar.css";

const UserNavbar = () => {
  const handleScrollToRecipes = () => {
    const recipesSection = document.getElementById("recipes-section");
    if (recipesSection) {
      const offset = 80; // Adjust this to match the navbar height
      const top = recipesSection.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <header className="navbar">
      <div className="navbar-logo">
        <h1>Recipe Hub</h1>
      </div>
      <nav className="navbar-links">
        <button onClick={handleScrollToRecipes} className="nav-link">
          Recipes
        </button>
        <a href="#footer" className="nav-link">About</a>
        <Link to="/ai-help" className="nav-link">Ask AI</Link> {/* Updated to Link */}
      </nav>
    </header>
  );
};

export default UserNavbar;