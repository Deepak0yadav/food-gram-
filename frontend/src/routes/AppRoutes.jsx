import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import UserRegister from "../pages/auth/UserRegister";
import UserLogin from "../pages/auth/UserLogin";
import FoodPartnerRegister from "../pages/auth/FoodPartnerRegister";
import FoodPartnerLogin from "../pages/auth/FoodPartnerLogin";
import Home from "../pages/general/Home";
import CreateFood from "../pages/food/CreateFood";


function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route
          path="/user/register"
          element={<UserRegister />}
        />
        <Route
          path="/user/login"
          element={<UserLogin />}
        />
        <Route
          path="/foodpartner/register"
          element={<FoodPartnerRegister />}
        />
        <Route
          path="/foodpartner/login"
          element={<FoodPartnerLogin />}
        />
        <Route path="/" element={<Home />} />
        <Route path="/createfood" element={<CreateFood />} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;
