const express = require("express");
const router = express.Router();
const {
  createRecipe,
  getAllRecipes,
  updateRecipe,
  deleteRecipe,
  getChefRecipes,
} = require("../controllers/recipeController");
const jwtVerify = require("../Middleware/jwtVerify");
const upload = require("../Middleware/multerSetup"); // Import Multer setup

// Recipe routes
router.post("/createRecipe", jwtVerify, upload.single("image"), createRecipe); // Create a recipe with image upload
router.get("/getallrecipe",jwtVerify, getAllRecipes); // Get all recipes
router.get("/api/chef/recipes", jwtVerify, getChefRecipes);
router.put("/api/update", jwtVerify, upload.single("image"), updateRecipe); // Update a recipe with image upload
router.delete("/api/delete", jwtVerify, deleteRecipe); // Delete a recipe

module.exports = router;
 