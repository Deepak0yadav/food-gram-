import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../styles/theme.css";
import "../../styles/auth.css";

function UserLogin() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e)=> 
    {
    e.preventDefault();
   const response = await axios.post("http://localhost:3000/api/auth/user/login",
      {
        email,
        password
      }
      ,{withCredentials:true}
    )
    console.log(response.data);
    if(response.data)
    {
      navigate("/");
    }

  }

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2 className="auth-title">User Login</h2>

        <div className="form-group">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-input"
            placeholder="Enter your email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-input"
            placeholder="Enter your password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="submit-button">
          Login
        </button>

        <div className="auth-links">
          <Link
            to="/foodpartner/login"
            className="auth-link">
            Login as Food Partner
          </Link>
          <Link
            to="/user/register"
            className="auth-link">
            Don't have an account? Register
          </Link>
        </div>
      </form>
    </div>
  );
}

export default UserLogin;
