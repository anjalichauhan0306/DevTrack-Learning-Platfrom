import {
  User,
  BookOpen,
  Award,
  Settings,
  LogOut,
  ChevronRight,
  Home,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { Camera } from "lucide-react";
import axios from "axios";
import { useState, useEffect } from "react";
import { serverURL } from "../App";
import { setUserData } from "../redux/userSlice.js";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";

const Profile = () => {
  const { userData } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [name, setName] = useState(userData?.name || "");
  const [description, setDescription] = useState(userData?.description || "");
  const [photoUrl, setPhotourl] = useState(userData?.photoUrl || "");
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("personal");
  const [isEditing, setIsEditing] = useState(false);

  // Sync userData with local state
  useEffect(() => {
    if (userData) {
      setName(userData.name || "");
      setDescription(userData.description || "");
      setPhotourl(userData.photoUrl || "");
    }
  }, [userData]);

  const handleEditProfile = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", name || userData?.name || "");
      formData.append(
        "description",
        description || userData?.description || "",
      );
      formData.append("photoUrl", photoUrl || userData?.photoUrl || "");

      const result = await axios.post(
        serverURL + "/api/user/profile",
        formData,
        { withCredentials: true },
      );
      dispatch(setUserData(result.data));
      setLoading(false);
      setIsEditing(false);
      navigate("/");
      toast.success("Profile Updated successfully");
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error(error.response?.data?.message);
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post(
        `${serverURL}/api/auth/logout`,
        {},
        { withCredentials: true },
      );
      dispatch(setUserData(null));
      navigate("/login");
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message);
    }
  };

  const tabs = [
    { id: "personal", label: "Personal Info", icon: <User size={18} /> },
    { id: "learning", label: "My Learning", icon: <BookOpen size={18} /> },
    { id: "certificates", label: "Certificates", icon: <Award size={18} /> },
    { id: "settings", label: "Settings", icon: <Settings size={18} /> },
  ];

  return (
    <div className="w-full min-h-screen bg-white font-sans selection:bg-indigo-100">
      <nav className="max-w-7xl mx-auto px-6 py-6 flex items-center gap-3 text-sm font-medium">
        <Link
          to="/"
          className="text-slate-400 hover:text-indigo-600 transition-colors flex items-center gap-1.5"
        >
          <Home size={16} /> Home
        </Link>
        <ChevronRight size={14} className="text-slate-300" />
        <span className="text-slate-900 font-semibold">Profile</span>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-12 gap-12">
        <aside className="lg:col-span-4 space-y-6">
          <div className="relative overflow-hidden p-6 rounded-4xl bg-white border border-slate-100 shadow-xl shadow-slate-200/40 flex flex-col items-center text-center">
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-indigo-50 rounded-full blur-3xl opacity-60" />

            <div className="relative mb-4 group cursor-pointer">
              <div className="absolute inset-0 bg-indigo-500 rounded-full blur-xl opacity-10 animate-pulse" />
              <div className="relative p-0.5 rounded-full bg-linear-to-tr from-indigo-500 to-purple-500 transition-transform group-hover:scale-105">
                {userData?.photoUrl ? (
                  <img
                    src={userData?.photoUrl}
                    className="w-20 h-20 rounded-full object-cover border-2 border-white"
                    alt="profile"
                  />
                ) : (
                  <div className="w-20 h-20 rounded-full bg-[#0a0a23] flex items-center justify-center text-white text-2xl font-black border-2 border-white">
                    {userData?.name?.charAt(0).toUpperCase() || "A"}
                  </div>
                )}
                <label className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-all cursor-pointer">
                  <Camera size={22} className="text-white" />
                  <input
                    type="file"
                    className="hidden"
                    onChange={(e) => setPhotourl(e.target.files[0])}
                    accept="image/*"
                    value={photoUrl}
                    placeholder="photoUrl"
                  />
                </label>
              </div>
            </div>

            <div className="relative">
              <h2 className="text-xl font-bold text-slate-900 tracking-tight leading-none">
                {userData?.name}
              </h2>
              <p className="text-indigo-600 font-bold text-[9px] uppercase tracking-widest mt-2 bg-indigo-50 px-2.5 py-1 rounded-lg inline-block">
                {userData?.email || "Student@gmail.com"}
              </p>
              <p className="text-slate-500 text-[12px] font-medium mt-3 px-1 leading-tight line-clamp-2 italic">
                {userData?.description}
              </p>
            </div>
            <div className="mt-5 w-full grid grid-cols-3 divide-x divide-slate-100 bg-slate-50/50 rounded-2xl py-2 border border-slate-100">
              <div className="flex flex-col items-center">
                <span className="text-[9px] text-slate-400 uppercase font-bold tracking-tighter">
                  Enrolled
                </span>
                <span className="text-sm font-black text-slate-700">05</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-[9px] text-slate-400 uppercase font-bold tracking-tighter">
                  Done
                </span>
                <span className="text-sm font-black text-emerald-600">04</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-[9px] text-slate-400 uppercase font-bold tracking-tighter">
                  Certis
                </span>
                <span className="text-sm font-black text-amber-500">01</span>
              </div>
            </div>
          </div>
          <nav className="bg-white/60 backdrop-blur-md p-3 rounded-4xl border border-slate-100 space-y-1">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full group flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-300 font-bold text-sm ${
                    isActive
                      ? "bg-indigo-900 text-white shadow-lg shadow-indigo-200 -translate-y-0.5"
                      : "text-slate-500 hover:bg-white hover:text-indigo-600 hover:shadow-sm"
                  }`}
                >
                  <span
                    className={`transition-transform duration-300 ${isActive ? "scale-110" : "group-hover:scale-110"}`}
                  >
                    {tab.icon}
                  </span>
                  {tab.label}
                </button>
              );
            })}
            <div className="pt-3 mt-3 border-t border-slate-100">
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-rose-500 hover:bg-rose-50 transition-all duration-300 font-bold text-sm group"
              >
                <LogOut
                  size={18}
                  className="group-hover:-translate-x-1 transition-transform"
                />
                Sign Out
              </button>
            </div>
          </nav>
        </aside>
        <div className="lg:col-span-8">
          <div className="min-h-125">
            {activeTab === "personal" && (
              <div className="space-y-6 max-w-2xl">
                <div className="flex items-center justify-between border-b pb-4">
                  <h3 className="text-xl font-bold text-slate-800">
                    Profile Settings
                  </h3>
                  <button
                    disabled={loading}
                    onClick={() => {
                      if (isEditing) {
                        handleEditProfile();
                      } else {
                        setIsEditing(true);
                      }
                    }}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all relative ${
                      isEditing
                        ? "bg-indigo-600 text-white"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    } ${loading ? "opacity-80 cursor-not-allowed" : ""}`}
                  >
                    {loading ? (
                      <>
                        {" "}
                        <ClipLoader size={30} color="white" />{" "}
                        <span>Saving...</span>{" "}
                      </>
                    ) : isEditing ? (
                      "Save"
                    ) : (
                      "Edit Profile"
                    )}
                  </button>
                </div>

                <div onSubmit={(e) => e.preventDefault()} className="space-y-4">
                  <div>
                    <label className="text-[10px] font-bold uppercase text-slate-400 ml-1">
                      Full Name
                    </label>
                    <input
                      disabled={!isEditing}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className={`w-full mt-1 px-4 py-3 rounded-xl border transition-all ${
                        isEditing
                          ? "border-indigo-500 bg-white shadow-sm"
                          : "border-transparent bg-slate-50 opacity-70"
                      } font-semibold text-slate-700 outline-none`}
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-bold uppercase text-slate-400 ml-1">
                      Email (Read Only)
                    </label>
                    <div className="w-full mt-1 px-4 py-3 rounded-xl bg-slate-100/50 text-slate-400 font-medium border border-transparent">
                      {userData?.email}
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-bold uppercase text-slate-400 ml-1">
                      Bio
                    </label>
                    <textarea
                      disabled={!isEditing}
                      rows="3"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className={`w-full mt-1 px-4 py-3 rounded-xl border transition-all ${
                        isEditing
                          ? "border-indigo-500 bg-white shadow-sm"
                          : "border-transparent bg-slate-50 opacity-70"
                      } font-medium text-slate-600 outline-none resize-none`}
                    />
                  </div>
                </div>

                {isEditing && (
                  <button
                    onClick={() => setIsEditing(false)}
                    className="text-sm text-slate-400 hover:text-red-500 font-medium ml-1"
                  >
                    Cancel changes
                  </button>
                )}
              </div>
            )}

            {activeTab === "learning" && (
              <div className="animate-in fade-in duration-500">
                <h3 className="text-3xl font-black text-slate-900 mb-8">
                  Learning Path
                </h3>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
