import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios"; // Import axios for API calls
import "./../styles/LoginPage.css";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!username || !password) {
      setError("Please fill in both username and password");
      return;
    }

    try {
      // Make a POST request to the backend
      const response = await axios.post(
        "https://recipe-manager-v96b.onrender.com/signin", // Backend login URL
        {
          Username: username,
          Password: password,
        },
        { withCredentials: true } // Allow cookies to be sent and received
      );

      const { role } = response.data; // Extract role from response

      // Navigate to the appropriate dashboard based on role
      if (role === "Chef") {
        navigate("/chef");
      } else if (role === "User") {
        navigate("/user");
      }
    } catch (err) {
      // Display error message from backend or fallback message
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("An error occurred. Please try again later.");
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-header">
        <h1>Welcome Back!</h1>
        <p>Log in to explore and manage your favorite recipes.</p>
      </div>
      <form className="login-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit">Login</button>
      </form>
      <div className="login-footer">
        <p>
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
