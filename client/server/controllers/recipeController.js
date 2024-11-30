const RecipeModel = require("../Models/recipeSchema");
const UserModel = require("../Models/userSchema");

// Create Recipe
exports.createRecipe = async (req, res) => {
  const { title, ingredients, steps } = req.body;
  const image = req.file?.path || req.body.image; // Handle uploaded file or URL

  try {
    // Ensure the user is a Chef
    if (req.user.role !== "Chef") {
      return res
        .status(403)
        .json({ message: "Only chefs can create recipes." });
    }

    if (!image) {
      return res.status(400).json({ message: "Image is required for the recipe." });
    }

    // Create a new recipe
    const recipe = await RecipeModel.create({
      title,
      ingredients,
      steps,
      image,
      createdBy: req.user.id,
    });

    // Add the recipe ID to the Chef's CreatedRecipes
    await UserModel.findByIdAndUpdate(req.user.id, {
      $push: { CreatedRecipes: recipe._id },
    });

    res.status(201).json({ message: "Recipe created successfully", recipe });
  } catch (error) {
    res.status(500).json({ message: "Error creating recipe", error: error.message });
  }
};

// Get All Recipes
exports.getAllRecipes = async (req, res) => {
  const { chefId, search } = req.query;

  try {
    const query = {};

    // Filter by chef ID if provided
    if (chefId) {
      query.createdBy = chefId;
    }

    // Filter by search keyword in title or ingredients
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { ingredients: { $regex: search, $options: "i" } },
      ];
    }

    const recipes = await RecipeModel.find(query).populate(
      "createdBy",
      "Username Specialty"
    );

    res.status(200).json({ recipes });
  } catch (error) {
    res.status(500).json({ message: "Error fetching recipes", error: error.message });
  }
};

// Get Recipe by ID
exports.getRecipeById = async (req, res) => {
  const { id } = req.params;

  try {
    const recipe = await RecipeModel.findById(id).populate(
      "createdBy",
      "Username Specialty"
    );

    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    res.status(200).json({ recipe });
  } catch (error) {
    res.status(500).json({ message: "Error fetching recipe", error: error.message });
  }
};

// Update Recipe
exports.updateRecipe = async (req, res) => {
  const { id } = req.params;
  const { title, ingredients, steps } = req.body;
  const image = req.file?.path || req.body.image; // Handle uploaded file or URL

  try {
    const recipe = await RecipeModel.findById(id);

    // Ensure the recipe exists and the logged-in chef owns it
    if (!recipe || recipe.createdBy.toString() !== req.user.id) {
      return res
        .status(404)
        .json({ message: "Recipe not found or unauthorized access." });
    }

    // Update the recipe fields
    if (title) recipe.title = title;
    if (ingredients) recipe.ingredients = ingredients;
    if (steps) recipe.steps = steps;
    if (image) recipe.image = image;

    recipe.updatedAt = Date.now();
    await recipe.save();

    res.status(200).json({ message: "Recipe updated successfully", recipe });
  } catch (error) {
    res.status(500).json({ message: "Error updating recipe", error: error.message });
  }
};

// Delete Recipe
exports.deleteRecipe = async (req, res) => {
  const { id } = req.params;

  try {
    const recipe = await RecipeModel.findById(id);

    // Ensure the recipe exists and the logged-in chef owns it
    if (!recipe || recipe.createdBy.toString() !== req.user.id) {
      return res
        .status(404)
        .json({ message: "Recipe not found or unauthorized access." });
    }

    await recipe.remove();

    // Remove the recipe ID from the Chef's CreatedRecipes
    await UserModel.findByIdAndUpdate(req.user.id, {
      $pull: { CreatedRecipes: id },
    });

    res.status(200).json({ message: "Recipe deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting recipe", error: error.message });
  }
};


// Add a Review to a Recipe
exports.addReview = async (req, res) => {
  const { recipeId } = req.params;
  const { comment, rating } = req.body;

  try {
    // Validate rating range
    if (rating < 1 || rating > 5) {
      return res
        .status(400)
        .json({ message: "Rating must be between 1 and 5." });
    }

    // Find the recipe by ID
    const recipe = await RecipeModel.findById(recipeId);
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found." });
    }

    // Add the review to the recipe
    const review = {
      user: req.user.id, // Assuming `req.user` is populated via JWT middleware
      comment,
      rating,
    };
    recipe.reviews.push(review);

    // Save the updated recipe
    await recipe.save();

    res.status(200).json({
      message: "Review added successfully.",
      review,
    });
  } catch (error) {
    res.status(500).json({ message: "Error adding review.", error: error.message });
  }
};

// Get Reviews for a Recipe
exports.getReviews = async (req, res) => {
  const { recipeId } = req.params;

  try {
    // Find the recipe by ID
    const recipe = await RecipeModel.findById(recipeId).populate(
      "reviews.user",
      "Username Email"
    );

    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found." });
    }

    res.status(200).json({
      message: "Reviews fetched successfully.",
      reviews: recipe.reviews,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching reviews.", error: error.message });
  }
};

// Delete a Review
exports.deleteReview = async (req, res) => {
  const { recipeId, reviewId } = req.params;

  try {
    // Find the recipe by ID
    const recipe = await RecipeModel.findById(recipeId);
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found." });
    }

    // Find and remove the review by ID
    const reviewIndex = recipe.reviews.findIndex(
      (review) => review._id.toString() === reviewId && review.user.toString() === req.user.id
    );

    if (reviewIndex === -1) {
      return res.status(403).json({
        message: "Review not found or unauthorized to delete.",
      });
    }

    recipe.reviews.splice(reviewIndex, 1);

    // Save the updated recipe
    await recipe.save();

    res.status(200).json({ message: "Review deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: "Error deleting review.", error: error.message });
  }
};
