const { GoogleGenerativeAI } = require("@google/generative-ai");

// Initialize the Google Generative AI with your API key
const genAI = new GoogleGenerativeAI(process.env.AI_API_KEY); // Replace with your actual API key
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Function to generate a recipe based on user query
exports.generateRecipe = async (req, res) => {
  const { query } = req.body; // Get the user's query (e.g., "Give me a recipe for kaju katli")

  try {
    // Construct the prompt for the AI model
    const prompt = `Provide a recipe for ${query}. Format it as follows: 
    Ingredients: (list of ingredients)
    Steps: (step-by-step preparation)`;

    // Await the result of the generateContent call
    const result = await model.generateContent(prompt);

    // Get the generated recipe text from the AI response
    const generatedRecipe = result?.response?.text();


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

    // Respond with the generated recipe
    return res.status(200).json({
      message: "Recipe generated successfully",
      recipe: {
        title: query, // Use the query as the recipe title
        ingredients, // Parsed ingredients
        steps, // Parsed steps
      },
    });
  } catch (error) {
    // Handle any errors during the recipe generation process
    console.error("Error generating recipe:", error);
    return res.status(500).json({
      message: "Error generating recipe",
      error: error.message,
    });
  }
};
