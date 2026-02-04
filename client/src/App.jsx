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
import Analytics from "./pages/Educator/Analytics";
import Students from "./pages/Educator/Students";
import CreateCourse from "./pages/Educator/CreateCourse";
import MyCourses from "./pages/Educator/Mycourses";
import GetCreatorCourse from "./customHooks/getCreatorCourse";
import EditCourse from "./pages/Educator/EditCourse";
import GetPublishedCourse from "./customHooks/getPublishedCourse";
import AllCourses from "./pages/AllCourses";
import CreateLecture from "./pages/Educator/CreateLecture";
export const serverURL = "http://localhost:5000";

const App = () => {
  GetCurrentUser(); 
  GetCreatorCourse();
  GetPublishedCourse();
  const { userData } = useSelector(state => state.user);

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
          element={!userData ?  <Navigate to="/login" /> : <Profile />}
        />

         <Route
          path="/allcourses"
          element={!userData ?  <Navigate to="/login" /> : <AllCourses />}
        />

        <Route 
        path="/analytics"
        element={userData?.role === "educator" ?  <Analytics /> :  <Navigate to="/signup" />}
        />


        
        <Route 
        path="/courses"
        element={userData?.role === "educator" ? <Navigate to="/signup"/> : <MyCourses /> }
        />

        <Route 
        path="/students"
        element={userData?.role === "educator" ? <Students/> : <Navigate to="/signup" /> }
        />

        <Route 
        path="/createcourse"
        element={userData?.role === "educator" ? <Navigate to="/signup" /> : <CreateCourse/>  }
        />

        <Route 
        path="/editcourse/:courseId"
        element={userData?.role === "educator" ? <Navigate to="/signup" /> : <EditCourse/>  }
        />

      <Route 
        path="/createlecture/:courseId"
        element={userData?.role === "educator" ? <Navigate to="/signup" /> : <CreateLecture/>  }
        />
        
        <Route 
        path="/editlecture/:courseId/:lectureId"
        element={userData?.role === "educator" ? <Navigate to="/signup" /> : <CreateLecture/>  }
        />
      </Routes>
    </>
  );
};

export default App;
