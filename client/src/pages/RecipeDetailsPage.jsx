
import r1 from "../assets/kadaipaneer.jpeg";
import r2 from "../assets/soyamalaichap.jpeg";
import r3 from "../assets/chickencurry.jpeg";
import r4 from "../assets/cake.jpeg";


import React from "react";
import { useLocation } from "react-router-dom";
import "./../styles/RecipeDetailsPage.css";

// Hardcoded recipe object
const recipe = {
  id: 1,
  name: "Kadai Paneer",
  image: r1, // Make sure r1 is imported at the top
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
};

const RecipeDetailsPage = () => {
  // Remove the useLocation since we are using a hardcoded recipe
  // const location = useLocation();
  // const { recipe } = location.state || {}; // Destructure recipe from state with fallback

  // Check if the recipe exists
  if (!recipe) {
    return <p>Error: Recipe not found.</p>;
  }

  // Ensure recipe.steps is an array
  const steps = Array.isArray(recipe.steps) ? recipe.steps : [];

  // Ensure ingredients are arrays (fallback to empty array if undefined)
  const ingredientsMasala = recipe.ingredients.masala || [];
  const ingredientsGravy = recipe.ingredients.gravy || [];

  return (
    <div className="recipe-details-page">
      <h1 className="recipe-title">{recipe.name}</h1>
      <img src={recipe.image} alt={recipe.name} className="recipe-image" />

      {/* Ingredients Section */}
      <div className="ingredients-section">
        <h3>Ingredients</h3>
        <h4>For Kadai Masala:</h4>
        <ul>
          {ingredientsMasala.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
        <h4>For Gravy:</h4>
        <ul>
          {ingredientsGravy.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>

      {/* Steps Section */}
      <div className="steps-section">
        <h3>Steps</h3>
        {steps.length > 0 ? (
          <ol>
            {steps.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ol>
        ) : (
          <p>No steps available for this recipe.</p>
        )}
      </div>
    </div>
  );
};

export default RecipeDetailsPage;