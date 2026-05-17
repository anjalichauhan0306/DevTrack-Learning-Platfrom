// import React, { useState, useRef, useEffect } from "react";
// import logo from "../assets/logo.png";
// import { Link, useNavigate } from "react-router-dom";
// import {
//   Bell,
//   LogOut,
//   Settings,
//   ChevronDown,
//   UserCircle,
//   Menu,
//   X,
// } from "lucide-react";
// import { useSelector, useDispatch } from "react-redux";
// import { toast } from "react-toastify";
// import { setUserData } from "../redux/userSlice";
// import { logoutUser } from "../api/authApi";

// const Navbar = () => {
//   const { userData } = useSelector((state) => state.user);
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const [isProfileOpen, setIsProfileOpen] = useState(false);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const [scrolled, setScrolled] = useState(false);
//   const dropdownRef = useRef(null);
//   const isLoggedIn = !!userData;
//   const role = userData?.role || "Student";
//   const userName = userData?.name || "";
//   const firstLetter = userName.charAt(0).toUpperCase();
//   useEffect(() => {
//     const handleScroll = () => setScrolled(window.scrollY > 20);
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   const handleLogOut = async () => {
//     try {
//      await logoutUser()
//       localStorage.removeItem("token");
//       dispatch(setUserData(null));
//       toast.success("Logged out successfully");
//       navigate("/");
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Logout failed");
//     }
//   };

//   const NavLinks = () => (
//     <>
//       {!isLoggedIn ? (
//         <>
//           <Link
//             onClick={() => navigate("/")}
//             className="hover:text-indigo-600 transition"
//             to="/"
//           >
//             Home
//           </Link>
//           <Link
//             onClick={() => navigate("/allcourses")}
//             className="hover:text-indigo-600 transition"
//             to="/allcourses"
//           >
//             Explore
//           </Link>
//           <Link
//             onClick={() => navigate("/about")}
//             className="hover:text-indigo-600 transition"
//             to="/about"
//           >
//             About
//           </Link>
//           <Link
//             onClick={() => navigate("/contact")}
//             className="hover:text-indigo-600 transition"
//             to="/contact"
//           >
//             Contact
//           </Link>
//         </>
//       ) : role === "Student" ? (
//         <>
//           <Link
//             onClick={() => navigate("/")}
//             className="hover:text-indigo-600 transition"
//             to="/"
//           >
//             Home
//           </Link>
//           <Link
//             className="hover:text-indigo-600 transition"
//             to="/allcourses"
//           >
//             Explore Courses
//           </Link>
//           <Link
//             className="hover:text-indigo-600 transition"
//             to="/mentors"
//           >
//             Mentors
//           </Link>
//           <Link
//             className="hover:text-indigo-600 transition"
//             to="/mylearning"
//           >
//             My Learning
//           </Link>
//         </>
//       ) : role === "Educator" ? (
//         <>
//           <Link
//             className="hover:text-indigo-600 transition"
//             to="/"
//           >
//             Home
//           </Link>
//           <Link
//             className="hover:text-indigo-600 transition"
//             to="/courses"
//           >
//             My Courses
//           </Link>
//           <Link
//             className="hover:text-indigo-600 transition"
//             to="/students"
//           >
//             Students
//           </Link>
//           <Link
//             className="hover:text-indigo-600 transition"
//             to="/analytics"
//           >
//             Analytics
//           </Link>
//         </>
//       ) : role === "admin" ? (
//         <>
//           <Link
//             to="/admin/overview"
//             className="hover:text-indigo-600 transition"
//           >
//             Overview
//           </Link>
//           <Link
//             to="/admin/learners"
//             className="hover:text-indigo-600 transition"
//           >
//             Learners
//           </Link>
//           <Link
//             to="/admin/instructors"
//             className="hover:text-indigo-600 transition"
//           >
//             Instructors
//           </Link>
//           <Link
//             to="/admin/courses"
//             className="hover:text-indigo-600 transition"
//           >
//             Courses
//           </Link>
//         </>
//       ) : null}
//     </>
//   );
//   return (
//     <header
//       className={`fixed top-0 left-0 w-full z-100 transition-all duration-300 ${
//         scrolled
//           ? "bg-[#0a0a23]/80 backdrop-blur-md border-b border-white/10 py-3"
//           : "bg-transparent py-5"
//       }`}
//     >
//       <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
//         <Link to="/" className="flex items-center gap-2 group">
//           <img
//             src={logo}
//             alt="logo"
//             className="w-8 h-8 group-hover:scale-110 transition-transform"
//           />
//           <span className="font-bold text-2xl  tracking-tight text-white">
//             Dev<span className="text-indigo-500">Track</span>
//           </span>
//         </Link>
//         <nav className="hidden lg:flex items-center gap-10 text-[15px] font-medium text-slate-300">
//           <NavLinks />
//         </nav>
//         <div className="flex items-center gap-4">
//           {!isLoggedIn ? (
//             <Link
//               to="/signup"
//               className="bg-indigo-600 text-white px-7 py-2.5 rounded-lg text-sm font-bold hover:bg-indigo-500 transition shadow-lg shadow-indigo-600/20"
//             >
//               Get Started
//             </Link>
//           ) : (
//             <div className="flex items-center gap-4">
//               <button className="text-slate-300 hover:text-white transition">
//                 <Bell size={20} />
//               </button>
//               <div ref={dropdownRef} className="relative">
//                 <button
//                   onClick={() => setIsProfileOpen(!isProfileOpen)}
//                   className="flex items-center gap-3 pl-1 pr-2 py-1 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full transition"
//                 >
//                   {userData?.photoUrl ? (
//                     <img
//                       src={userData?.photoUrl}
//                       className="bg-indigo-600 object-cover text-white size-8 rounded-full flex items-center justify-center font-bold text-xs uppercase"
//                     />
//                   ) : (
//                     <div className="bg-indigo-600 text-white size-8 rounded-full flex items-center justify-center font-bold text-xs uppercase">
//                       {firstLetter}
//                     </div>
//                   )}
//                   <ChevronDown
//                     size={14}
//                     className={`text-slate-400 transition-transform ${isProfileOpen ? "rotate-180" : ""}`}
//                   />
//                 </button>
//                 {isProfileOpen && (
//                   <div className="absolute right-0 mt-4 w-52 bg-[#1a1a40] border border-white/10 rounded-xl shadow-2xl py-2 overflow-hidden animate-in fade-in slide-in-from-top-2">
//                     <div className="px-4 py-3 border-b border-white/5">
//                       <p className="text-xs text-slate-400 font-medium">
//                         Signed in as
//                       </p>
//                       <p className="text-sm font-bold text-white truncate">
//                         {userName}
//                       </p>
//                     </div>
//                     <Link
//                       to="/profile"
//                       className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-300 hover:bg-white/5 transition"
//                     >
//                       <UserCircle size={18} /> Profile
//                     </Link>
//                     <Link
//                       to="/"
//                       className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-300 hover:bg-white/5 transition"
//                     >
//                       <Settings size={18} /> Settings
//                     </Link>
//                     <button
//                       onClick={handleLogOut}
//                       className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-rose-400 hover:bg-rose-500/10 transition mt-1"
//                     >
//                       <LogOut size={18} /> Logout
//                     </button>
//                   </div>
//                 )}
//               </div>
//             </div>
//           )}
//           <button
//             onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//             className="lg:hidden text-white"
//           >
//             {isMobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
//           </button>
//         </div>
//       </div>
//       {isMobileMenuOpen && (
//         <div className="fixed inset-0 top-17.5 bg-[#0a0a23] z-50 p-6 flex flex-col gap-6 lg:hidden animate-in slide-in-from-right">
//           <nav className="flex flex-col gap-6 text-xl text-slate-300 font-medium">
//             <NavLinks />
//           </nav>
//           {!isLoggedIn && (
//             <Link
//               to="/signup"
//               className="bg-indigo-600 text-white text-center py-4 rounded-xl font-bold"
//             >
//               Get Started
//             </Link>
//           )}
//         </div>
//       )}
//     </header>
//   );
// };

// export default Navbar;
import React, { useState, useRef, useEffect } from "react";
import logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import {
  Bell,
  LogOut,
  Settings,
  ChevronDown,
  UserCircle,
  Menu,
  X,
} from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { setUserData } from "../redux/userSlice";
import { logoutUser } from "../api/authApi";

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

  // Scroll handler for changing navbar background
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogOut = async () => {
    try {
      await logoutUser();
      localStorage.removeItem("token");
      dispatch(setUserData(null));
      setIsProfileOpen(false);
      setIsMobileMenuOpen(false);
      toast.success("Logged out successfully");
      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "Logout failed");
    }
  };

  // Common link click helper for mobile menu auto-close
  const handleMobileLinkClick = (path) => {
    setIsMobileMenuOpen(false);
    navigate(path);
  };

  const NavLinks = ({ isMobile = false }) => {
    const linkClass = isMobile
      ? "w-full px-4 py-3 rounded-xl text-base font-semibold text-slate-300 hover:text-white hover:bg-white/5 transition duration-200 block"
      : "hover:text-indigo-400 transition text-[15px] font-medium text-slate-300";

    return (
      <>
        {!isLoggedIn ? (
          <>
            <Link to="/" onClick={() => isMobile && setIsMobileMenuOpen(false)} className={linkClass}>Home</Link>
            <Link to="/allcourses" onClick={() => isMobile && setIsMobileMenuOpen(false)} className={linkClass}>Explore</Link>
            <Link to="/about" onClick={() => isMobile && setIsMobileMenuOpen(false)} className={linkClass}>About</Link>
            <Link to="/contact" onClick={() => isMobile && setIsMobileMenuOpen(false)} className={linkClass}>Contact</Link>
          </>
        ) : role === "Student" ? (
          <>
            <Link to="/" onClick={() => isMobile && setIsMobileMenuOpen(false)} className={linkClass}>Home</Link>
            <Link to="/allcourses" onClick={() => isMobile && setIsMobileMenuOpen(false)} className={linkClass}>Explore Courses</Link>
            <Link to="/mentors" onClick={() => isMobile && setIsMobileMenuOpen(false)} className={linkClass}>Mentors</Link>
            <Link to="/mylearning" onClick={() => isMobile && setIsMobileMenuOpen(false)} className={linkClass}>My Learning</Link>
          </>
        ) : role === "Educator" ? (
          <>
            <Link to="/" onClick={() => isMobile && setIsMobileMenuOpen(false)} className={linkClass}>Home</Link>
            <Link to="/courses" onClick={() => isMobile && setIsMobileMenuOpen(false)} className={linkClass}>My Courses</Link>
            <Link to="/students" onClick={() => isMobile && setIsMobileMenuOpen(false)} className={linkClass}>Students</Link>
            <Link to="/analytics" onClick={() => isMobile && setIsMobileMenuOpen(false)} className={linkClass}>Analytics</Link>
          </>
        ) : role === "admin" ? (
          <>
            <Link to="/admin/overview" onClick={() => isMobile && setIsMobileMenuOpen(false)} className={linkClass}>Overview</Link>
            <Link to="/admin/learners" onClick={() => isMobile && setIsMobileMenuOpen(false)} className={linkClass}>Learners</Link>
            <Link to="/admin/instructors" onClick={() => isMobile && setIsMobileMenuOpen(false)} className={linkClass}>Instructors</Link>
            <Link to="/admin/courses" onClick={() => isMobile && setIsMobileMenuOpen(false)} className={linkClass}>Courses</Link>
          </>
        ) : null}
      </>
    );
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0a0a23]/90 backdrop-blur-md border-b border-white/10 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group z-50">
          <img
            src={logo}
            alt="logo"
            className="w-8 h-8 group-hover:scale-110 transition-transform"
          />
          <span className="font-bold text-2xl tracking-tight text-white">
            Dev<span className="text-indigo-500">Track</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          <NavLinks />
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-4 z-50">
          {/* Desktop Get Started Button */}
          {!isLoggedIn && (
            <Link
              to="/signup"
              className="hidden sm:inline-block bg-indigo-600 text-white px-6 py-2 rounded-lg text-sm font-bold hover:bg-indigo-500 transition shadow-lg shadow-indigo-600/20"
            >
              Get Started
            </Link>
          )}

          {isLoggedIn && (
            <div className="flex items-center gap-4">
              <button className="text-slate-300 hover:text-white transition">
                <Bell size={20} />
              </button>
              
              <div ref={dropdownRef} className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-2 pl-1 pr-2 py-1 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full transition"
                >
                  {userData?.photoUrl ? (
                    <img
                      src={userData?.photoUrl}
                      alt="avatar"
                      className="bg-indigo-600 object-cover text-white size-8 rounded-full flex items-center justify-center font-bold text-xs uppercase"
                    />
                  ) : (
                    <div className="bg-indigo-600 text-white size-8 rounded-full flex items-center justify-center font-bold text-xs uppercase">
                      {firstLetter}
                    </div>
                  )}
                  <ChevronDown
                    size={14}
                    className={`text-slate-400 transition-transform ${isProfileOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {/* Profile Dropdown */}
                {isProfileOpen && (
                  <div className="absolute right-0 mt-3 w-52 bg-[#121232] border border-white/10 rounded-xl shadow-2xl py-2 overflow-hidden animate-in fade-in slide-in-from-top-2">
                    <div className="px-4 py-3 border-b border-white/5">
                      <p className="text-[11px] text-slate-400 font-medium">Signed in as</p>
                      <p className="text-sm font-bold text-white truncate">{userName}</p>
                    </div>
                    <Link
                      to="/profile"
                      onClick={() => setIsProfileOpen(false)}
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-300 hover:bg-white/5 transition"
                    >
                      <UserCircle size={18} /> Profile
                    </Link>
                    <Link
                      to="/settings"
                      onClick={() => setIsProfileOpen(false)}
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-300 hover:bg-white/5 transition"
                    >
                      <Settings size={18} /> Settings
                    </Link>
                    <button
                      onClick={handleLogOut}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-rose-400 hover:bg-rose-500/10 transition mt-1 border-t border-white/5"
                    >
                      <LogOut size={18} /> Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden text-white p-1 hover:bg-white/5 rounded-lg transition"
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Modern Mobile Drawer Menu */}
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      <div
        className={`fixed top-0 right-0 h-full w-[280px] bg-[#0c0c26] border-l border-white/10 p-6 pt-24 flex flex-col justify-between z-40 transition-transform duration-300 ease-in-out lg:hidden ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Mobile Navigation Links */}
        <nav className="flex flex-col gap-2">
          <NavLinks isMobile={true} />
        </nav>

        {/* Mobile Action Button Footer */}
        {!isLoggedIn && (
          <div className="mt-auto pt-6 border-t border-white/5">
            <Link
              to="/signup"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block w-full bg-indigo-600 text-white text-center py-3 rounded-xl font-bold hover:bg-indigo-500 transition shadow-lg shadow-indigo-600/20 text-sm"
            >
              Get Started
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;