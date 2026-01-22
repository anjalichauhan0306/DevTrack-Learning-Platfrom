import React, { useState, useRef, useEffect } from "react";
import logo from "../assets/logo.png";
import axios from "axios";
import { serverURL } from '../App';
import { Link } from "react-router-dom";
import { 
  Bell, 
  LogOut, 
  Settings, 
  ChevronDown, 
  UserCircle, 
  Menu, 
  X 
} from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { setUserData } from "../redux/userSlice";

const Navbar = () => {
  const { userData } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const dropdownRef = useRef(null);
  const mobileMenuRef = useRef(null);

  const isLoggedIn = !!userData;
  const role = userData?.role || "Student";
  const userName = userData?.name || "";
  const firstLetter = userName.charAt(0).toUpperCase();

  const handleLogOut = async () => {
    try {
      await axios.get(serverURL + "/api/auth/logout", { withCredentials: true });
      dispatch(setUserData(null));
      toast.success("Logged out successfully");
      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "Logout failed");
    }
  };

  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);



  const NavLinks = () => (
    <>
      {!isLoggedIn ? (
        <>
          <Link onClick={() => navigate("/")} className="hover:text-indigo-600 transition" href="/">Home</Link>
          <Link onClick={() => navigate("/courses")} className="hover:text-indigo-600 transition" href="/courses">Explore</Link>
          <Link onClick={() => navigate("/about")} className="hover:text-indigo-600 transition" href="/about">About</Link>
          <Link onClick={() => navigate("/contact")} className="hover:text-indigo-600 transition" href="/contact">Contact</Link>
        </>
      ) : role === "Student" ? (
        <>
          <Link onClick={() => navigate("/courses")} className="hover:text-indigo-600 transition" href="/courses">Courses</Link>
          <Link onClick={() => navigate("/mentors")} className="hover:text-indigo-600 transition" href="/mentors">Mentors</Link>
          <Link onClick={() => navigate("/dashboard")} className="hover:text-indigo-600 transition" href="/dashboard">My Learning</Link>
          <Link onClick={() => navigate("/resources")} className="hover:text-indigo-600 transition" href="/resources">Resources</Link>
        </>
      ) : (
        <>
          <Link onClick={() => navigate("/teacher/courses")} className="hover:text-indigo-600 transition" href="/teacher/courses">My Courses</Link>
          <Link onClick={() => navigate("/teacher/students")} className="hover:text-indigo-600 transition" href="/teacher/students">Students</Link>
          <Link onClick={() => navigate("/teacher/analytics")} className="hover:text-indigo-600 transition" href="/teacher/analytics">Analytics</Link>
        </>
      )}
    </>
  );

  return (
    <div className="relative">
      <header className="fixed top-4 left-0 right-0 z-50 mx-auto w-[92%] lg:w-[83%] max-w-7xl bg-white border border-slate-200 rounded-full px-4 lg:px-8 py-2.5 shadow-md flex items-center justify-between">
        
        {/* Logo */}
        <Link onClick={() => navigate("/")} href="/" className="flex items-center gap-2 shrink-0">
          <img src={logo} alt="logo" className="w-6 h-6 lg:w-7 lg:h-7" />
          <span className="font-bold text-lg lg:text-xl tracking-tight text-slate-900">
            Dev<span className="text-indigo-600">Track</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8 text-[14.5px] font-semibold text-slate-600">
          <NavLinks />
        </nav>

        {/* Right Section */}
        <div className="flex items-center gap-2 lg:gap-4">
          {!isLoggedIn ? (
            <Link
              onClick={() => navigate ("/signup")}
              href="/signup"
              className="bg-indigo-600 text-white px-4 lg:px-6 py-2 rounded-full text-xs lg:text-sm font-semibold hover:bg-indigo-700 transition shadow-sm"
            >
              Get Started
            </Link>
          ) : (
            <div className="flex items-center gap-2 lg:gap-3">
              <button className="relative p-2 hover:bg-slate-50 rounded-full transition text-slate-600">
                <Bell size={20} />
                <span className="absolute top-2 right-2 bg-red-500 border-2 border-white size-2.5 rounded-full"></span>
              </button>

              <div className="hidden sm:block h-6 w-px bg-slate-200 mx-1"></div>

              {/* Profile Dropdown */}
              <div ref={dropdownRef} className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-2 p-0.5 pr-2 hover:bg-slate-50 rounded-full transition group"
                >
                  <div className="bg-slate-900 text-white size-8 lg:size-9 rounded-full flex items-center justify-center font-bold text-sm group-hover:bg-indigo-600 transition">
                    {firstLetter}
                  </div>
                  <div className="hidden md:flex flex-col items-start">
                    <span className="text-[12px] lg:text-[13px] font-bold text-slate-800 leading-tight">{userName}</span>
                    <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">{role}</span>
                  </div>
                  <ChevronDown size={14} className={`transition-transform duration-200 ${isProfileOpen ? "rotate-180" : ""}`} />
                </button>

                {/* Dropdown Menu */}
                {isProfileOpen && (
                  <div className="absolute right-0 mt-3 w-48 bg-white border border-slate-100 rounded-2xl shadow-xl py-2 z-50 overflow-hidden anim-fade-in">
                    <Link onClick={(e) => navigate("/profile")} href="/profile" className="flex items-center gap-3 px-4 py-2 text-sm text-slate-700 hover:bg-indigo-50 transition">
                      <UserCircle size={18} /> Profile
                    </Link>
                    <Link onClick={() =>navigate("/settings")} href="/settings" className="flex items-center gap-3 px-4 py-2 text-sm text-slate-700 hover:bg-indigo-50 transition">
                      <Settings size={18} /> Settings
                    </Link>
                    <hr className="my-1 border-slate-100" />
                    <button onClick={handleLogOut} className="w-full flex items-center gap-3 px-4 py-2 text-sm text-rose-600 hover:bg-rose-50 transition">
                      <LogOut size={18} /> Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Mobile Menu Button (Hamburger) */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-full hover:bg-slate-100 text-slate-600"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* MOBILE MENU OVERLAY */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-slate-900/20 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)}></div>
          
          {/* Menu Card */}
          <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[92%] bg-white border border-slate-200 rounded-3xl shadow-2xl p-6 flex flex-col gap-4 animate-in fade-in zoom-in duration-200">
            <nav className="flex flex-col gap-4 text-slate-700 font-semibold">
              <NavLinks />
            </nav>
            
            {!isLoggedIn && (
               <Link
               onClick={(e) =>navigate("/signup")}
               href="/signup"
               className="bg-indigo-600 text-white text-center py-3 rounded-2xl font-bold shadow-lg shadow-indigo-200"
             >
               Get Started
             </Link>
            )}
            
            {isLoggedIn && (
              <div className="pt-4 border-t border-slate-100">
                <button 
                  onClick={handleLogOut}
                  className="flex items-center gap-3 text-rose-600 font-bold"
                >
                  <LogOut size={20} /> Logout
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;