import React, { useState } from "react";
import "./../styles/AIHelp.css"; // Create a CSS file for styling
import axios from "axios";

const AIHelp = () => {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAskAI = async () => {
    if (!query.trim()) {
      setError("Please enter a recipe query.");
      return;
    }

    setLoading(true);
    setError("");
    setResponse("");

    try {
      // Backend API URL
      const url = "https://recipe-manager-v96b.onrender.com/api/ai/generateRecipe";

      // Make the API call
      const res = await axios.post(url, { query });

      // Update the response state with AI's reply
      const { recipe } = res.data;
      setResponse(`
        Title: ${recipe.title}\n
        Ingredients: ${recipe.ingredients.join(", ")}\n
        Steps:\n${recipe.steps.join("\n")}
      `);
    } catch (err) {
      console.error("Error fetching AI response:", err);
      setError(
        err.response?.data?.message || "An error occurred while fetching the AI response."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ai-help-container">
      <h1>Ask AI for Recipe Suggestions</h1>
      <input
        type="text"
        placeholder="What recipe do you want?"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={handleAskAI} disabled={loading}>
        {loading ? "Asking AI..." : "Ask AI"}
      </button>
      {error && <div className="error-message">{error}</div>}
      {response && (
        <div className="ai-response">
          <h2>AI Response</h2>
          <pre>{response}</pre>
        </div>
      )}
    </div>
  );
};

export default AIHelp;
