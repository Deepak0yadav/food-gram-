import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/theme.css";
import "../../styles/auth.css";
import axios from "axios";

function UserRegister() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/user/register",
        {
          fullName,
          email,
          password,
        },
        { withCredentials: true }
      );
      console.log(response.data);

      if (response.data) {
        navigate("/");
      }
    } catch (error) {
      console.error("Registration failed:", error);
      alert("Something went wrong! Please try again.");
    }
  };

  return (
    <div className="auth-container">
      <form
        className="auth-form"
        onSubmit={onSubmit}>
        <h2 className="auth-title">User Registration</h2>

        <div className="form-group">
          <label className="form-label">Full Name</label>
          <input
            value={fullName}
            type="text"
            className="form-input"
            placeholder="Enter your full name"
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Email</label>
          <input
            value={email}
            type="email"
            className="form-input"
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Password</label>
          <input
            value={password}
            type="password"
            className="form-input"
            placeholder="Create a password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="submit-button">
          Register
        </button>

        <div className="auth-links">
          <Link
            to="/foodpartner/register"
            className="auth-link">
            Register as Food Partner
          </Link>
          <Link
            to="/user/login"
            className="auth-link">
            Already have an account? Login
          </Link>
        </div>
      </form>
    </div>
  );
}

export default UserRegister;
