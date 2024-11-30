const { GoogleGenerativeAI } = require("@google/generative-ai");
const RecipeModel = require("../Models/recipeSchema"); // Assuming the Recipe model is in this file
const UserModel = require("../Models/userSchema"); // Assuming the User model is in this file

// Initialize the Google Generative AI with your API key
const genAI = new GoogleGenerativeAI("AIzaSyAx2k4EZWCnArsFAmvpArtjUwajmVdc3DI"); // Replace with your actual API key
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Function to generate recipe based on user query and save to DB
exports.generateRecipe = async (req, res) => {
  const { query } = req.body; // Get the user's query (e.g., "Give me a recipe for kaju katli")
  const userId = req.user.id; // Assuming the user is authenticated and we have access to the user ID from JWT

  try {
    // Construct the prompt for the AI model
    const prompt = `Provide a recipe for ${query}. Format it as follows: 
    Ingredients: (list of ingredients)
    Steps: (step-by-step preparation)`;

    // Await the result of the generateContent call
    const result = await model.generateContent(prompt);

    // Get the generated recipe text from the AI response
    const generatedRecipe = result?.response?.text();

    // Log the AI response for debugging
    console.log("Generated Recipe Response:", generatedRecipe);

    // Validate the response
    if (!generatedRecipe || generatedRecipe.trim().length === 0) {
      return res.status(400).json({ message: "AI could not generate a valid recipe." });
    }

    // Parse the response for ingredients and steps
    const [ingredientsPart, stepsPart] = generatedRecipe.split(/Steps?:/i); // Split response into ingredients and steps
    const ingredients = ingredientsPart
      ?.replace(/Ingredients?:/i, "") // Remove "Ingredients:" label
      ?.split("\n")
      ?.map((line) => line.trim())
      ?.filter((line) => line.length > 0); // Filter out empty lines
    const steps = stepsPart
      ?.split("\n")
      ?.map((line) => line.trim())
      ?.filter((line) => line.length > 0); // Filter out empty lines

    // Check if valid ingredients and steps were extracted
    if (!ingredients || !steps || ingredients.length === 0 || steps.length === 0) {
      console.error("Invalid AI Response:", generatedRecipe);
      return res.status(400).json({
        message: "AI did not return valid ingredients or steps.",
        aiResponse: generatedRecipe, // Include the raw AI response for debugging
      });
    }

    // Create a new recipe object in the database
    const newRecipe = new RecipeModel({
      title: query, // Use the query as the recipe title
      ingredients, // Parsed ingredients
      steps, // Parsed steps
      createdBy: userId, // Link the recipe to the logged-in user (chef)
    });

    // Save the recipe to the database
    const savedRecipe = await newRecipe.save();

    // Optionally, add the recipe to the user's created recipes list
    await UserModel.findByIdAndUpdate(userId, {
      $push: { CreatedRecipes: savedRecipe._id },
    });

    // Respond with success and the saved recipe data
    return res.status(201).json({
      message: "Recipe generated and saved successfully",
      recipe: savedRecipe,
    });
  } catch (error) {
    // Handle any errors during the recipe generation or saving process
    console.error("Error generating or saving recipe:", error);
    return res.status(500).json({
      message: "Error generating or saving recipe",
      error: error.message,
    });
  }
};
