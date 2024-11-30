import React, { useState } from "react";
import axios from "axios"; // For API calls
import { useNavigate } from "react-router-dom";
import "./../styles/AddRecipePage.css";

const AddRecipePage = () => {
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [steps, setSteps] = useState("");
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!title || !ingredients || !steps || !image) {
      setError("All fields are required, including an image.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append(
        "ingredients",
        JSON.stringify(ingredients.split(",").map((item) => item.trim())) // Convert ingredients to array
      );
      formData.append(
        "steps",
        JSON.stringify(steps.split(".").map((item) => item.trim())) // Convert steps to array
      );
      formData.append("image", image);

      const response = await axios.post(
        "http://localhost:7000/createRecipe", // Backend API endpoint
        formData,
        {
          withCredentials: true, // Send cookies for authentication
          headers: {
            "Content-Type": "multipart/form-data", // Required for file uploads
          },
        }
      );

      setSuccess("Recipe added successfully!");
      setError(null);
      setTimeout(() => navigate("/recipes"), 1500); // Redirect after success
    } catch (err) {
      if (err.response && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("An error occurred while adding the recipe.");
      }
      setSuccess(null);
    }
  };

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  return (
    <div className="add-recipe-container">
      <h1>Add a New Recipe</h1>
      <p className="add-recipe-description">
        Share your favorite recipe with the world! Fill in the details below and upload a picture to get started.
      </p>
      <form className="add-recipe-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Recipe Name"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Ingredients Used (comma-separated)"
          rows="3"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          required
        ></textarea>
        <textarea
          placeholder="Recipe Details (steps separated by periods)"
          rows="5"
          value={steps}
          onChange={(e) => setSteps(e.target.value)}
          required
        ></textarea>
        <div className="file-input-container">
          <label htmlFor="recipe-image" className="file-label">
            Upload an Image
          </label>
          <input
            type="file"
            id="recipe-image"
            accept="image/*"
            onChange={handleImageChange}
            required
          />
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {success && <p style={{ color: "green" }}>{success}</p>}
        <button type="submit">Add Recipe</button>
      </form>
    </div>
  );
};

export default AddRecipePage;