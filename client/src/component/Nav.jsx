import React, { useState, useRef, useEffect } from "react";
import logo from "../assets/logo.png";
import axios from "axios";
import { serverURL } from '../App';
import { Link, useNavigate } from "react-router-dom";
import { Bell, LogOut, Settings, ChevronDown, UserCircle, Menu, X } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { setUserData } from "../redux/userSlice";

const Navbar = () => {
  const { userData } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  const dropdownRef = useRef(null);
  const isLoggedIn = !!userData;
  const role = userData?.role || "Student";
  const userName = userData?.name || "";
  const firstLetter = userName.charAt(0).toUpperCase();

  // Scroll effect to change background
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

 const NavLinks = () => (

    <>

      {!isLoggedIn ? (

        <>

          <Link onClick={() => navigate("/")} className="hover:text-indigo-600 transition" to="/">Home</Link>

          <Link onClick={() => navigate("/courses")} className="hover:text-indigo-600 transition" to="/courses">Explore</Link>

          <Link onClick={() => navigate("/about")} className="hover:text-indigo-600 transition" to="/about">About</Link>

          <Link onClick={() => navigate("/contact")} className="hover:text-indigo-600 transition" to="/contact">Contact</Link>

        </>

      ) : role === "Student" ? (

        <>

          <Link onClick={() => navigate("/courses")} className="hover:text-indigo-600 transition" to="/courses">Courses</Link>

          <Link onClick={() => navigate("/mentors")} className="hover:text-indigo-600 transition" to="/mentors">Mentors</Link>

          <Link onClick={() => navigate("/dashboard")} className="hover:text-indigo-600 transition" to="/dashboard">My Learning</Link>

          <Link onClick={() => navigate("/resources")} className="hover:text-indigo-600 transition" to="/resources">Resources</Link>

        </>

      ) : (

        <>

          <Link onClick={() => navigate("/teacher/courses")} className="hover:text-indigo-600 transition" to="/teacher/courses">My Courses</Link>

          <Link onClick={() => navigate("/teacher/students")} className="hover:text-indigo-600 transition" to="/teacher/students">Students</Link>

          <Link onClick={() => navigate("/teacher/analytics")} className="hover:text-indigo-600 transition" to="/teacher/analytics">Analytics</Link>

        </>

      )}

    </>

  );
  return (
    <header 
      className={`fixed top-0 left-0 w-full z-100 transition-all duration-300 ${
        scrolled 
        ? "bg-[#0a0a23]/80 backdrop-blur-md border-b border-white/10 py-3" 
        : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <img src={logo} alt="logo" className="w-8 h-8 group-hover:scale-110 transition-transform" />
          <span className="font-bold text-2xl tracking-tight text-white">
            Dev<span className="text-indigo-500">Track</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-10 text-[15px] font-medium text-slate-300">
          <NavLinks />
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-4">
          {!isLoggedIn ? (
            <Link
              to="/signup"
              className="bg-indigo-600 text-white px-7 py-2.5 rounded-lg text-sm font-bold hover:bg-indigo-500 transition shadow-lg shadow-indigo-600/20"
            >
              Get Started
            </Link>
          ) : (
            <div className="flex items-center gap-4">
              <button className="text-slate-300 hover:text-white transition">
                <Bell size={20} />
              </button>

              {/* Profile Dropdown */}
              <div ref={dropdownRef} className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-3 pl-1 pr-2 py-1 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full transition"
                >
                  <div className="bg-indigo-600 text-white size-8 rounded-full flex items-center justify-center font-bold text-xs uppercase">
                    {firstLetter}
                  </div>
                  <ChevronDown size={14} className={`text-slate-400 transition-transform ${isProfileOpen ? "rotate-180" : ""}`} />
                </button>

                {isProfileOpen && (
                  <div className="absolute right-0 mt-4 w-52 bg-[#1a1a40] border border-white/10 rounded-xl shadow-2xl py-2 overflow-hidden animate-in fade-in slide-in-from-top-2">
                    <div className="px-4 py-3 border-b border-white/5">
                        <p className="text-xs text-slate-400 font-medium">Signed in as</p>
                        <p className="text-sm font-bold text-white truncate">{userName}</p>
                    </div>
                    <Link to="/profile" className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-300 hover:bg-white/5 transition"><UserCircle size={18}/> Profile</Link>
                    <Link to="/settings" className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-300 hover:bg-white/5 transition"><Settings size={18}/> Settings</Link>
                    <button onClick={handleLogOut} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-rose-400 hover:bg-rose-500/10 transition mt-1"><LogOut size={18}/> Logout</button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Mobile Toggle */}
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="lg:hidden text-white">
            {isMobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 top-17.5 bg-[#0a0a23] z-50 p-6 flex flex-col gap-6 lg:hidden animate-in slide-in-from-right">
           <nav className="flex flex-col gap-6 text-xl text-slate-300 font-medium">
             <NavLinks />
           </nav>
           {!isLoggedIn && (
             <Link to="/signup" className="bg-indigo-600 text-white text-center py-4 rounded-xl font-bold">Get Started</Link>
           )}
        </div>
      )}
    </header>
  );
};

export default Navbar;