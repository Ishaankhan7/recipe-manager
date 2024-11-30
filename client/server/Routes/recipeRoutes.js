const express = require("express");
const router = express.Router();
const {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
} = require("../controllers/recipeController");
const jwtVerify = require("../Middleware/jwtVerify");
const upload = require("../Middleware/multerSetup"); // Import Multer setup

// Recipe routes
router.post("/createRecipe", jwtVerify, upload.single("image"), createRecipe); // Create a recipe with image upload
router.get("/getallrecipe",jwtVerify, getAllRecipes); // Get all recipes
router.get("/:id",jwtVerify, getRecipeById); // Get a single recipe
router.put("/:id", jwtVerify, upload.single("image"), updateRecipe); // Update a recipe with image upload
router.delete("/:id", jwtVerify, deleteRecipe); // Delete a recipe

module.exports = router;
 