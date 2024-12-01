import React, { useState, useEffect } from "react";
import axios from "axios";
import Footer from "../components/Footer";
import "./../styles/MyRecipes.css";

const MyRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  // Configure Axios to include cookies in requests
  axios.defaults.withCredentials = true;

  // Fetch recipes on component load
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get("https://recipe-manager-v96b.onrender.com/api/chef/recipes");
        setRecipes(response.data.recipes);
      } catch (error) {
        console.error("Error fetching recipes:", error.message);
      } 
    };

    fetchRecipes();
  }, []);

  // Handle delete
  const handleDelete = async (id) => {
    try {
      await axios.delete("http://localhost:7000/api/delete", {
        data: { recipeId: id }, // Include recipeId in the request body
      });
      setRecipes(recipes.filter((recipe) => recipe._id !== id));
    } catch (error) {
      console.error("Error deleting recipe:", error.message);
    }
  };

  // Handle edit/update
  const handleEdit = (recipe) => {
    setSelectedRecipe(recipe);
    setIsEditing(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedRecipe = {
        recipeId: selectedRecipe._id, // Include recipeId in request body
        title: selectedRecipe.title,
        ingredients: selectedRecipe.ingredients,
        steps: selectedRecipe.steps,
      };
      const response = await axios.put(
        "http://localhost:7000/api/update",
        updatedRecipe
      );
      setRecipes(
        recipes.map((recipe) =>
          recipe._id === selectedRecipe._id ? response.data.recipe : recipe
        )
      );
      setIsEditing(false);
      setSelectedRecipe(null);
    } catch (error) {
      console.error("Error updating recipe:", error.message);
    }
  };

  return (
    <>
      <header className="header">
        <h1 className="my-recipes-heading">My Recipes</h1>
      </header>
      <div className="my-recipes-page">
        <div className="recipes-container">
          {recipes.map((recipe) => (
            <div key={recipe._id} className="recipe-card">
              <h3>{recipe.title}</h3>
              <p>
                <strong>Ingredients:</strong> {recipe.ingredients.join(", ")}
              </p>
              <p>
                <strong>Steps:</strong> {recipe.steps.join(" ")}
              </p>
              <div className="recipe-actions">
                <button
                  onClick={() => handleEdit(recipe)}
                  className="update-button"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDelete(recipe._id)}
                  className="delete-button"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {isEditing && (
        <div className="modal">
          <div className="modal-content">
            <h2>Update Recipe</h2>
            <form onSubmit={handleSubmit} className="recipe-form">
              <label>
                Recipe Name:
                <input
                  type="text"
                  value={selectedRecipe.title}
                  onChange={(e) =>
                    setSelectedRecipe({
                      ...selectedRecipe,
                      title: e.target.value,
                    })
                  }
                />
              </label>
              <label>
                Ingredients:
                <textarea
                  value={selectedRecipe.ingredients.join(", ")}
                  onChange={(e) =>
                    setSelectedRecipe({
                      ...selectedRecipe,
                      ingredients: e.target.value.split(","),
                    })
                  }
                ></textarea>
              </label>
              <label>
                Steps:
                <textarea
                  value={selectedRecipe.steps.join(", ")}
                  onChange={(e) =>
                    setSelectedRecipe({
                      ...selectedRecipe,
                      steps: e.target.value.split(","),
                    })
                  }
                ></textarea>
              </label>
              <div className="modal-actions">
                <button type="submit" className="submit-button">
                  Save Changes
                </button>
                <button
                  type="button"
                  className="cancel-button"
                  onClick={() => {
                    setIsEditing(false);
                    setSelectedRecipe(null);
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
};

export default MyRecipes;
