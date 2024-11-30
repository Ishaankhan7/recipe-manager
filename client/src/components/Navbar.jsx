


import React from 'react';
import { Link } from 'react-router-dom';
import "./../styles/global.css";



const Navbar = () => {
  return (
    <header className="navbar">
      <div className="navbar-logo">
        <h1>Recipe Hub</h1>
      </div>
      <nav className="navbar-links">
        <Link to="/login">Login</Link>
        <a href="#footer">About</a>
        <a href="#footer">Contact</a>
      </nav>
    </header>
  );
};

export default Navbar;



