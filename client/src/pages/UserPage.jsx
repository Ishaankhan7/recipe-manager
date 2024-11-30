import React from "react";
import { useNavigate } from "react-router-dom";
import "./../styles/UserPage.css";
import UserNavbar from "../components/UserNavbar";
import Footer from "../components/Footer";

import r1 from "../assets/kadaipaneer.jpeg";
import r2 from "../assets/soyamalaichap.jpeg";
import r3 from "../assets/chickencurry.jpeg";
import r4 from "../assets/cake.jpeg";

const UserPage = () => {
  const navigate = useNavigate();
  
  

  const recipes = [
    {
      id: 1,
      name: "Kadai Paneer",
      image: r1,
      ingredients: {
        masala: [
          "1 tbsp coriander seeds",
          "1 tsp cumin seeds",
          "3-4 dry red chilies",
          "1 tsp black peppercorns",
        ],
        gravy: [
          "200-250 g paneer (cubed)",
          "1 medium onion (chopped)",
          "1 large tomato (pureed)",
          "1 small capsicum (cubed)",
          "1-2 green chilies (slit)",
          "1 tsp ginger-garlic paste",
          "1/2 tsp turmeric",
          "1 tsp red chili powder",
          "1/2 tsp garam masala",
          "1 tsp kasuri methi",
          "salt (to taste)",
          "2 tbsp oil or ghee",
          "coriander leaves (garnish)",
        ],
      },
      steps: [
        "Make Masala: Dry roast coriander seeds, cumin, peppercorns, and red chilies. Grind coarsely.",
        "Prepare Paneer: Optionally, lightly fry paneer cubes and soak in warm water.",
        "Cook Base: Heat oil, sauté onions until golden. Add ginger-garlic paste, cook 1 min. Add tomato puree, cook until oil separates.",
        "Season: Mix turmeric, red chili powder, salt, and kadai masala. Cook for 2 mins.",
        "Add Veggies: Add capsicum and green chilies, cook 2-3 mins.",
        "Finish: Add paneer, garam masala, and crushed kasuri methi. Simmer for 2-3 mins.",
        "Garnish & Serve: Top with coriander leaves. Serve hot with naan or rice.",
      ],
    },
    {
      id: 2,
      name: "Soya Malai Chaap",
      description: "A creamy soya chaap dish.",
      image: r2,
      ingredients: {
        masala: ["Soya Chaap", "Cream", "Spices"],
        gravy: ["No separate gravy ingredients"],
      },
      steps: [
        "Marinate soya chaap.",
        "Cook with cream and spices.",
        "Serve hot.",
      ],
    },
    {
      id: 3,
      name: "Chicken Curry",
      description: "Aromatic and flavorful curry with tender chicken.",
      image: r3,
      ingredients: {
        masala: ["Chicken", "Onion", "Tomato"],
        gravy: ["Spices"],
      },
      steps: [
        "Sauté onions and tomatoes.",
        "Add chicken and cook for 30 minutes.",
        "Serve.",
      ],
    },
    {
      id: 4,
      name: "Chocolate Cake",
      description: "Decadent chocolate cake with rich frosting.",
      image: r4,
      ingredients: {
        masala: ["Flour", "Cocoa Powder", "Sugar"],
        gravy: ["Eggs", "Butter"],
      },
      steps: [
        "Mix ingredients.",
        "Bake for 30 minutes at 180°C.",
        "Add frosting.",
      ],
    },
  ];

  const handleCardClick = (recipe) => {
    // Navigating to the recipe details page and passing recipe data through state
    navigate(`/recipe/${recipe.id}`, { state: { recipe } });
  };
  

  return (
    <>
      <UserNavbar />
      <div className="search-section">
        <h2>Find Your Favorite Recipes</h2>
        <p>Search for delicious recipes to try out or get inspired!</p>
        <input type="text" placeholder="Search Recipes..." className="search-box" />
        <button className="search-button">Search</button>
      </div>
      <section id="recipes-section" className="featured-recipes">
        <h1>Recipes</h1>
        <div className="recipes-container">
          {recipes.map((recipe) => (
            <div
              key={recipe.id}
              className="recipe-card"
              onClick={() => handleCardClick(recipe)}
            >
              <img src={recipe.image} alt={recipe.name} />
              <h3>{recipe.name}</h3>
              <p>{recipe.description || "Click to view the recipe!"}</p>
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </>
  );
};

export default UserPage;
