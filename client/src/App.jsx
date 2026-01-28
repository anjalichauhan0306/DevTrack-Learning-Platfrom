import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import ForgotPassword from "./pages/ForgotPassword";

import GetCurrentUser from "./customHooks/getCurrentUser";

export const serverURL = "http://localhost:5000";

const App = () => {
  GetCurrentUser(); 
  const { userData } = useSelector((state) => state.user);

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/signup"
          element={!userData ? <Signup /> : <Navigate to="/" />}
        />
        <Route
          path="/login"
          element={!userData ? <Login /> : <Navigate to="/" />}
        />
        <Route
          path="/forgot"
          element={!userData ? <ForgotPassword /> : <Navigate to="/" />}
        />

        <Route
          path="/profile"
          //element={<Profile/>}
          element={!userData ?  <Navigate to="/login" /> : <Profile />}
        />
        
      </Routes>

    </>
  );
};

export default App;
