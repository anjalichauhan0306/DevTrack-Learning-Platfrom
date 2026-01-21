import React, { useState, useRef, useEffect } from "react";
import logo from "../assets/logo.png";
import { Bell,BookOpen,LogOut,Settings,ChevronDown,UserCircle } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const Navbar = () => {
  const { userData } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const dropdownRef = useRef(null);

  const isLoggedIn = !!userData;
  const role = userData?.role; // STUDENT | TEACHER
  const userName = userData?.name || "";
  const firstLetter = userName.charAt(0).toUpperCase();

  // close dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <header className="fixed top-5 left-0 right-0 z-50 flex items-center justify-between px-8 py-2.5 shadow-[0_10px_30px_rgba(0,0,0,0.08)] rounded-full mx-auto w-[94%] bg-white border border-slate-200 max-w-350">

      {/* Logo */}
      <Link to="/" className="flex items-center gap-2.5 shrink-0">
        <div className="bg-indigo-600 p-1.5 rounded-xl shadow-sm">
        <img src={logo} alt="logo" />
         </div>
        <span className="font-bold text-xl tracking-tight text-slate-900">
          Edu<span className="text-indigo-600">Flow</span>
        </span>
      </Link>

      {/* NAV LINKS */}
      <nav className="hidden lg:flex items-center gap-10 text-slate-600 text-[14.5px] font-semibold">

        {/* Guest */}
        {!isLoggedIn && (
          <>
            <Link className="hover:text-indigo-600" to="/">Home</Link>
            <Link className="hover:text-indigo-600" to="/courses">Explore</Link>
            <Link className="hover:text-indigo-600" to="/about">About</Link>
            <Link className="hover:text-indigo-600" to="/contact">Contact</Link>
          </>
        )}

        {/* Student */}
        {isLoggedIn && role === "STUDENT" && (
          <>
            <Link className="hover:text-indigo-600" to="/courses">Courses</Link>
            <Link className="hover:text-indigo-600" to="/mentors">Mentors</Link>
            <Link className="hover:text-indigo-600" to="/dashboard">My Learning</Link>
            <Link className="hover:text-indigo-600" to="/resources">Resources</Link>
          </>
        )}

        {/* Teacher */}
        {isLoggedIn && role === "TEACHER" && (
          <>
            <Link className="hover:text-indigo-600" to="/teacher/courses">My Courses</Link>
            <Link className="hover:text-indigo-600" to="/teacher/students">Students</Link>
            <Link className="hover:text-indigo-600" to="/teacher/analytics">Analytics</Link>
          </>
        )}
      </nav>

      {/* Right Section */}
      <div className="flex items-center space-x-3 shrink-0">

        {/* Get Started */}
        {!isLoggedIn && (
          <a
            onClick={navigate("/signup")}
            href="/signup"
            className="bg-indigo-600 text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-indigo-700 transition"
          >
            Get Started
          </a>
        )}

        {/* Logged In UI */}
        {isLoggedIn && (
          <>
            {/* Notification */}
            <div className="relative">
              <button className="p-2 hover:bg-slate-50 rounded-full transition text-slate-600">
                <Bell size={20} />
              </button>
              <span className="absolute top-2 right-2 bg-red-500 border-2 border-white size-2.5 rounded-full"></span>
            </div>

            <div className="h-6 w-px bg-slate-200 mx-1"></div>

            {/* Profile */}
            <div ref={dropdownRef} className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-2.5 p-0.5 pr-2 hover:bg-slate-50 rounded-full transition group"
              >
                <div className="bg-slate-900 text-white size-9 rounded-full flex items-center justify-center font-bold text-sm group-hover:bg-indigo-600 transition">
                  {firstLetter}
                </div>

                <div className="hidden xl:flex flex-col items-start">
                  <span className="text-[13px] font-bold text-slate-800">{userName}</span>
                  <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">
                    {role}
                  </span>
                </div>

                <ChevronDown
                  size={14}
                  className={`transition-transform ${isProfileOpen ? "rotate-180" : ""}`}
                />
              </button>

              {/* Dropdown */}
              {isProfileOpen && (
                <div className="absolute right-0 mt-4 w-52 bg-white border border-slate-100 rounded-2xl shadow-xl py-2 animate-in fade-in slide-in-from-top-2">
                  <div className="p-1">
                    <Link to="/profile" className="flex items-center gap-3 px-3 py-2 text-sm hover:bg-indigo-50 rounded-xl">
                      <UserCircle size={17} /> Profile
                    </Link>
                    <Link to="/settings" className="flex items-center gap-3 px-3 py-2 text-sm hover:bg-indigo-50 rounded-xl">
                      <Settings size={17} /> Settings
                    </Link>
                    <hr className="my-1" />
                    <button className="w-full flex items-center gap-3 px-3 py-2 text-sm text-rose-600 hover:bg-rose-50 rounded-xl">
                      <LogOut size={17} /> Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </header>
  );
};

export default Navbar;
