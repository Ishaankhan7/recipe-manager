import r1 from "../assets/kadaipaneer.jpeg";
import r2 from "../assets/soyamalaichap.jpeg";
import r3 from "../assets/chickencurry.jpeg";
import r4 from "../assets/cake.jpeg";


import React from "react";
import "./../styles/UserPage.css";
import ChefNavbar from "../components/ChefNavbar";
import Footer from "../components/Footer";
import AddRecipePage from "./AddRecipePage";
const ChefPage = () => {
  return (
    <>
      <ChefNavbar/>
      <div className="search-section">
        <h2>Find Your Favorite Recipes</h2>
        <p>Search for delicious recipes to try out or get inspired!</p>
        <input type="text" placeholder="Search Recipes..." className="search-box" />
        <button className="search-button">Search</button>
      </div>
      <section className="featured-recipes"> {/* Match the structure from HomePage.jsx */}
        <h1>Recipes</h1>
        <div className="recipe-cards-container"> {/* Use the same class as in HomePage */}
          <div className="recipe-card">
            <img src={r1} alt="Recipe Name" /> {/* Add appropriate image path */}
            <h3>Kadai Paneer</h3>
            <p>A spicy paneer dish with bell peppers and aromatic spices in a tangy gravy.</p>
          </div>  
          <div className="recipe-card">
            <img src={r2} alt="Recipe Name" /> {/* Add appropriate image path */}
            <h3>Soya Malai Chaap</h3>
            <p>A creamy dish of soya chaap with rich spices.</p>
            
          </div>
          <div className="recipe-card">
            <img src={r3} alt="Recipe Name" /> {/* Add appropriate image path */}
            <h3>Chicken Curry</h3>
            <p>Aromatic and flavorful curry with tender chicken pieces.</p>
            
          </div>
          <div className="recipe-card">
            <img src={r4} alt="Recipe Name" /> {/* Add appropriate image path */}
            <h3>Chocolate Cake</h3>
            <p>Decadent chocolate cake with rich frosting.</p>
            {/*<Link to="/Recipes" className="view-recipe-link">View Recipe</Link>*/}
            
          </div>
          
        </div>
      </section>
        <AddRecipePage/>
      <Footer />
    </>
  );
};

export default ChefPage;