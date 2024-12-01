const express = require("express");
const router = express.Router();
const { generateRecipe } = require("../controllers/genAIController");
const jwtVerify = require("../Middleware/jwtVerify"); // Ensure the user is authenticated

// Route to generate recipe suggestions based on user query
router.post("/api/ai/generateRecipe", generateRecipe);

module.exports = router;