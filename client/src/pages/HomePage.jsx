
import img from "../assets/heo-image.jpg";
import r1 from "../assets/kadaipaneer.jpeg";
import r2 from "../assets/soyamalaichap.jpeg";
import r3 from "../assets/chickencurry.jpeg";
import r4 from "../assets/cake.jpeg";
import bg from "../assets/bg1.png";



import React from 'react';
import { Link } from "react-router-dom";
import "./../styles/HomePage.css";
import Navbar from '../components/Navbar';
import Footer from "../components/Footer";


const HomePage = () => {
  return (
    <div>
      <Navbar />
      <section className="hero">
        <div className="hero-content">
          <h2>Welcome to Recipe Collection</h2>
          <p>Explore a variety of recipes tailored for your taste. Find your favorite and start cooking today!</p>
        </div>
      </section>

    <section className="featured-recipes">
      <h1>Featured Recipes</h1>
      <div className="recipe-cards-container">
    <div className="recipe-card">
      <img src={r1} alt="Recipe 1" />
      <h3>Kadai Paneer</h3>
      <p>A spicy paneer dish with bell peppers and aromatic spices in a tangy gravy.</p>
      <Link to="/login" className="view-recipe-link">View Recipe</Link>
    </div>
    <div className="recipe-card">
      <img src={r2} alt="Recipe 2" />
      <h3>Soya Malai Chaap</h3>
      <p>A creamy dish of soya chaap with rich spices.</p>
      <Link to="/login" className="view-recipe-link">View Recipe</Link>
    </div>
    <div className="recipe-card">
      <img src={r3} alt="Recipe 3" />
      <h3>Chicken Curry</h3>
      <p>Aromatic and flavorful curry with tender chicken pieces.</p>
      <Link to="/login" className="view-recipe-link">View Recipe</Link>
    </div>
    <div className="recipe-card">
      <img src={r4} alt="Recipe 4" />
      <h3>Chocolate Cake</h3>
      <p>Decadent chocolate cake with rich frosting.</p>
      <Link to="/login" className="view-recipe-link">View Recipe</Link>
    </div>
  </div>
      </section>

      <Footer />
    </div>
  );
};

export default HomePage;
