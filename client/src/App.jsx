import React from 'react';
import { Routes,Route } from 'react-router-dom';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import { ToastContainer } from 'react-toastify';
import GetCurrentUser from './customHooks/getCurrentUser';
export const serverURL = "http://localhost:5000"
const App = () => {
  GetCurrentUser()
  return (
    <>
    <ToastContainer />
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
