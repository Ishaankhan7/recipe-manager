import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import UserPage from "./pages/UserPage";
import ChefPage from "./pages/ChefPage";
import AddRecipePage from "./pages/AddRecipePage";
import MyRecipes from "./pages/MyRecipes";
import RecipeDetailsPage from "./pages/RecipeDetailsPage";
import AIHelp from "./pages/AIHelp";

function App() {
  return (
    <Router>
      <Routes>
        {/* Main Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/user" element={<UserPage />} />
        <Route path="/chef" element={<ChefPage />} />
        <Route path="/add-recipe" element={<AddRecipePage />} />
        <Route path="/recipes" element={<MyRecipes />} />
        
   
        {/* Recipe Details Page */}
        <Route path="/recipe/:id" element={<RecipeDetailsPage />} />
        <Route path="/ai-help" element={<AIHelp />} /> {/* Add route for AIHelp */}
      </Routes>
    </Router>
  );
}

export default App;
