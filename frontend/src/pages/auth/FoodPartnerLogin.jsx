import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/theme.css";
import "../../styles/auth.css";
import axios from "axios";

function FoodPartnerLogin() {
  const navigate = useNavigate();

  // State for form inputs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/foodpartner/login",
        { email, password },
        { withCredentials: true }
      );

      console.log(response.data);

      if (response.data) {
        navigate("/createfood"); // redirect on success
      }
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert(
        err.response?.data || "Login failed. Please check your credentials."
      );
    }
  };

  return (
    <div className="auth-container">
      <form
        className="auth-form"
        onSubmit={handleSubmit}>
        <h2 className="auth-title">Food Partner Login</h2>

        <div className="form-group">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-input"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-input"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="submit-button">
          Login
        </button>

        <div className="auth-links">
          <Link
            to="/user/login"
            className="auth-link">
            Login as User
          </Link>
          <Link
            to="/foodpartner/register"
            className="auth-link">
            Don't have an account? Register
          </Link>
        </div>
      </form>
    </div>
  );
}

export default FoodPartnerLogin;
