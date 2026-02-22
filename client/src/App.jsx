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
import ViewLecture from './pages/ViewLecture'
import EditCourse from "./pages/Educator/EditCourse";
import GetPublishedCourse from "./customHooks/getPublishedCourse";
import SearchWithAI from './pages/SearchWithAI'
import AllCourses from "./pages/AllCourses";
import CreateLecture from "./pages/Educator/CreateLecture";
import EditLecture from "./pages/Educator/EditLecture";
import ViewCourse from "./pages/ViewCourse";
import ScrollToTop from "./component/ScrollToTop";
import MyLearning from "./pages/MyLeaning";
export const serverURL = "http://localhost:5000";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import PaymentSuccess from "./component/paymentSuccess";
import GetAllReviews from "./customHooks/getAllReviews";
import QuizAttempt from "./pages/quizAttempt";
import MentorsList from "./pages/Mentor";
import ContactSection from "./component/Contact";

const stripePromise = loadStripe(
  import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY
);

const App = () => {
  GetCurrentUser(); 
  GetCreatorCourse();
  GetPublishedCourse();
  GetAllReviews();
  const { userData } = useSelector(state => state.user);

  return ( 
    <>
    <Elements stripe={stripePromise}>
      <ToastContainer position="top-right" autoClose={3000} />
       <ScrollToTop />
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

        <Route path="/payment-success" element={<PaymentSuccess />} />


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
        element={userData?.role === "educator" ?   <Navigate to="/signup" /> : <Analytics /> }
        />
        
        <Route 
        path="/courses"
        element={userData?.role === "educator" ? <Navigate to="/signup"/> : <MyCourses /> }
        />

        <Route 
        path="/students"
        element={userData?.role === "educator" ? <Navigate to="/signup" /> : <Students/> }
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
        element={userData?.role === "educator" ? <Navigate to="/signup" /> : <EditLecture/>  }
        />

         
        <Route 
        path="/viewcourse/:courseId"
        element={!userData ? <Navigate to="/signup" /> : <ViewCourse/>  }
        />

        <Route
          path="/viewlecture/:courseId"
          element={!userData ?  <Navigate to="/login" /> : <ViewLecture />}
        />

        <Route
          path="/mylearning"
         element={!userData ?  <Navigate to="/login" /> : <MyLearning />}
        />

        <Route
          path="/search"
         element={!userData ?  <Navigate to="/login" /> : <SearchWithAI />}
        />        

        <Route
        path = "/quiz-attempt/:courseId"
        element={!userData ?  <Navigate to="/login" /> : <QuizAttempt />} />

        <Route
        path = "/mentors"
        element={!userData ?  <Navigate to="/login" /> : <MentorsList />} />

        <Route
        path = "/contact"
        element={<ContactSection />} />

      </Routes>
      </Elements>
      </>
  );
};

export default App;
