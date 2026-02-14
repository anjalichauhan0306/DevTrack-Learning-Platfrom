import {
  User,
  LogOut,
  ChevronRight,
  Home,
  Camera,
  Edit2,
  Check,
  X
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { serverURL } from "../App";
import { setUserData } from "../redux/userSlice.js";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";

const Profile = () => {
  const { userData } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");

  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (userData) {
      setName(userData.name || "");
      setDescription(userData.description || "");
      setPreviewUrl(userData.photoUrl || "");
    }
  }, [userData]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleUpdateProfile = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      if (selectedFile) {
        formData.append("photoUrl", selectedFile);
      }

      const result = await axios.post(`${serverURL}/api/user/profile`, formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });
      dispatch(setUserData(result.data));
      toast.success("Profile Updated Successfully");
      setIsEditing(false);
      setSelectedFile(null);
    } catch (error) {
      toast.error(error.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post(`${serverURL}/api/auth/logout`, {}, { withCredentials: true });
      dispatch(setUserData(null));
      navigate("/login");
    } catch (error) {
      toast.error("Logout failed");
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#f8fafc] font-sans pb-20">
      {/* --- Breadcrumb Header (Wahi Purana Style) --- */}
      <nav className="max-w-7xl mx-auto px-6 py-6 flex items-center gap-3 text-sm font-medium">
        <Link
          to="/"
          className="text-slate-400 hover:text-indigo-600 flex items-center gap-1.5 transition-colors"
        >
          <Home size={16} /> Home
        </Link>
        <ChevronRight size={14} className="text-slate-300" />
        <span className="text-slate-900 font-bold italic">Account Settings</span>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-4 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Sidebar Panel */}
        <aside className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm p-8 flex flex-col items-center text-center">
            
            {/* Avatar with Camera Overlay */}
            <div className="relative group mb-6">
              <div className="w-32 h-32 rounded-full p-1 bg-white ring-2 ring-indigo-50 overflow-hidden shadow-inner">
                {previewUrl ? (
                  <img src={previewUrl} className="w-full h-full rounded-full object-cover" alt="profile" />
                ) : (
                  <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center text-white text-4xl font-black">
                    {userData?.name?.charAt(0)?.toUpperCase()}
                  </div>
                )}
              </div>
              
              {isEditing && (
                <button 
                  onClick={() => fileInputRef.current.click()}
                  className="absolute bottom-1 right-1 p-2 bg-indigo-600 text-white rounded-full shadow-lg hover:scale-110 transition-transform border-4 border-white"
                >
                  <Camera size={16} />
                </button>
              )}
              <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*" />
            </div>

            <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight">
              {userData?.name}
            </h2>
            <p className="text-slate-500 text-sm font-medium mb-8">
              {userData?.email}
            </p>

            <div className="w-full border-t border-slate-100 pt-6 space-y-3">
              <div className="w-full flex items-center gap-3 px-5 py-3.5 rounded-2xl font-bold text-sm text-indigo-600 bg-indigo-50 border border-indigo-100">
                <User size={18} /> Personal Info
              </div>

              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-5 py-3.5 rounded-2xl font-bold text-sm text-rose-500 hover:bg-rose-50 transition-all group"
              >
                <LogOut size={18} className="group-hover:translate-x-1 transition-transform" /> 
                Sign Out
              </button>
            </div>
          </div>
        </aside>

        {/* Content Panel */}
        <div className="lg:col-span-8">
          <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden">
            
            <div className="px-8 py-7 border-b border-slate-50 flex justify-between items-center bg-white">
              <div>
                <h3 className="text-xl font-black text-slate-900">Personal Details</h3>
                <p className="text-xs text-slate-400 mt-0.5">Update your basic information here.</p>
              </div>

              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-6 py-2.5 bg-slate-100 text-slate-600 hover:bg-slate-900 hover:text-white rounded-xl text-sm font-bold transition-all flex items-center gap-2"
                >
                  <Edit2 size={14} /> Edit Profile
                </button>
              ) : (
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setIsEditing(false);
                      setName(userData.name);
                      setDescription(userData.description);
                      setPreviewUrl(userData.photoUrl);
                      setSelectedFile(null);
                    }}
                    className="p-2.5 text-slate-400 hover:text-rose-500 transition-colors"
                  >
                    <X size={20} />
                  </button>
                  <button
                    onClick={handleUpdateProfile}
                    disabled={loading}
                    className="px-6 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-bold shadow-lg shadow-indigo-100 flex items-center gap-2"
                  >
                    {loading ? <ClipLoader size={16} color="white" /> : <><Check size={16} /> Save Changes</>}
                  </button>
                </div>
              )}
            </div>

            <div className="p-8 space-y-8 max-w-2xl">
              {/* Name Input */}
              <div className="space-y-2">
                <label className="text-[11px] font-black uppercase tracking-widest text-slate-400 ml-1">
                  Full Name
                </label>
                <input
                  disabled={!isEditing}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={`w-full px-5 py-4 rounded-2xl border transition-all outline-none font-medium ${
                    isEditing 
                    ? "bg-white border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50/50" 
                    : "bg-slate-50 border-transparent text-slate-500"
                  }`}
                />
              </div>

              {/* Email Input */}
              <div className="space-y-2">
                <label className="text-[11px] font-black uppercase tracking-widest text-slate-400 ml-1">
                  Email Address
                </label>
                <div className="w-full px-5 py-4 rounded-2xl border border-transparent bg-slate-50 text-slate-400 font-medium flex items-center justify-between">
                  {userData?.email}
                  <span className="text-[9px] bg-slate-200 px-2 py-0.5 rounded-md text-slate-500 uppercase">Read Only</span>
                </div>
              </div>

              {/* Bio Input */}
              <div className="space-y-2">
                <label className="text-[11px] font-black uppercase tracking-widest text-slate-400 ml-1">
                  About You
                </label>
                <textarea
                  disabled={!isEditing}
                  rows="4"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className={`w-full px-5 py-4 rounded-2xl border transition-all outline-none resize-none font-medium ${
                    isEditing 
                    ? "bg-white border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50/50" 
                    : "bg-slate-50 border-transparent text-slate-500"
                  }`}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;