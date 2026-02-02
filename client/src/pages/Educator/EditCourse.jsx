import {
  ArrowLeft,
  Edit3Icon,
  Save,
  X,
  Rocket,
  Trash2,
  IndianRupee,
  Layers,
  Info,
} from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import empty from "../../assets/empty.jpg";
import axios from "axios";
import { serverURL } from "../../App";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";

const EditCourse = () => {
  const thumbRef = useRef();
  const navigate = useNavigate();
  const [isPublished, setIsPublished] = useState(false);
  const [isPaid, setIsPaid] = useState(false);
  const { courseId } = useParams();
  const [selectCourseData, setSelectedCourseData] = useState(null);
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [level, setLevel] = useState("");
  const [Price, setPrice] = useState("");
  const [loading, setLoading] = useState(false);
  const [frontedImage, setFrontedImage] = useState(empty);
  const [BackendImage, setBackendImage] = useState(null);

  const handleThumbanil = (e) => {
    const file = e.target.files[0];
    setBackendImage(file);
    setFrontedImage(URL.createObjectURL(file));
  };

  const getCourseById = async () => {
    try {
      const result = await axios.get(
        serverURL + `/api/course/getcourse/${courseId}`,
        { withCredentials: true },
      );
      setSelectedCourseData(result.data);
      console.log(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (selectCourseData) {
      setTitle(selectCourseData.title || "");
      setSubTitle(selectCourseData.subTitle || "");
      setDescription(selectCourseData.description || "");
      setLevel(selectCourseData.Level || "");
      setCategory(selectCourseData.category || "");
      setPrice(selectCourseData.Price || "");
      setIsPaid(selectCourseData.isPaid);
      setIsPublished(selectCourseData.isPublished);
      setFrontedImage(selectCourseData.thumbnail || empty);
    }
  }, [selectCourseData]);

  useEffect(() => {
    getCourseById();
  }, []);

  const handleEditCourse = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("subtitle", subTitle);
    formData.append("description", description);
    formData.append("Level", level);
    formData.append("category", category);
    formData.append("isPaid", isPaid);
    formData.append("isPublished", isPublished);
    formData.append("Price", Price);
    formData.append("thumbnail", BackendImage);

    try {
      const result = await axios.post(
        serverURL + `/api/course/editcourse/${courseId}`,
        formData,
        { withCredentials: true },
      );
      console.log(result.data);
      setLoading(false);
      navigate("/courses");
      toast.success("course Updated successfully");
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  const categories = [
    "Web Development",
    "Mobile App Development",
    "AI Tools",
    "Data Analytics",
    "Design",
    "Ethical Hacking",
    "Data Science",
    "AI/ML",
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] py-10 px-4 md:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
          <div className="flex items-center gap-5">
            <button
              onClick={() => navigate("/courses")}
              className="group p-3 bg-white hover:bg-black rounded-xl transition-all shadow-sm border border-gray-200"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600 group-hover:text-white" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-slate-900">
                Course Settings
              </h1>
              <p className="text-sm text-slate-500">
                Fine-tune your course details and pricing
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 bg-white border border-slate-200 text-slate-700 px-5 py-2.5 rounded-xl font-semibold hover:bg-slate-50 transition-all shadow-sm">
              <Rocket className="w-4 h-4" />
              Go to Lectures
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Form Details */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100">
              <div className="flex items-center gap-2 mb-6 text-slate-800">
                <Info className="w-5 h-5 text-indigo-500" />
                <h2 className="font-bold text-lg">Basic Information</h2>
              </div>

              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Course Title
                  </label>
                  <input
                    type="text"
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-4 focus:ring-indigo-50 focus:border-indigo-500 transition-all outline-none"
                    placeholder="e.g. Fullstack Web Development with MERN"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Subtitle
                  </label>
                  <input
                    type="text"
                    onChange={(e) => setSubTitle(e.target.value)}
                    value={subTitle}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-4 focus:ring-indigo-50 focus:border-indigo-500 transition-all outline-none"
                    placeholder="A brief catchy line for your course"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Description
                  </label>
                  <textarea
                    rows="5"
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-4 focus:ring-indigo-50 focus:border-indigo-500 transition-all outline-none resize-none"
                    placeholder="Describe what students will achieve..."
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Category
                    </label>
                    <select
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:ring-4 focus:ring-indigo-50 outline-none"
                      onChange={(e) => setCategory(e.target.value)}
                      value={category}
                    >
                      <option value="">Select Category</option>
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Course Level
                    </label>
                    <select
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:ring-4 focus:ring-indigo-50 outline-none"
                      onChange={(e) => setLevel(e.target.value)}
                      value={level}
                    >
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Advanced">Advanced</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2 text-slate-800">
                  <IndianRupee className="w-5 h-5 text-emerald-500" />
                  <h2 className="font-bold text-lg">Pricing Strategy</h2>
                </div>

                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={isPaid}
                    onChange={() => setIsPaid(!isPaid)}
                  />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                  <span className="ms-3 text-sm font-bold text-slate-600">
                    {isPaid ? "Paid" : "Free"}
                  </span>
                </label>
              </div>

              <div className="transition-all duration-300">
                <div
                  className={`p-5 rounded-2xl border-2 border-dashed transition-all ${isPaid ? "bg-indigo-50/30 border-indigo-200" : "bg-slate-50 border-slate-200"}`}
                >
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2">
                    {isPaid ? "Set Course Price" : "Course Price"}
                  </label>

                  <div className="relative max-w-50">
                    <span
                      className={`absolute left-4 top-1/2 -translate-y-1/2 font-bold ${isPaid ? "text-indigo-600" : "text-slate-400"}`}
                    >
                      ₹
                    </span>
                    <input
                      type="number"
                      disabled={!isPaid}
                      onChange={(e) => setPrice(e.target.value)}
                      value={Price}
                      className={`w-full pl-8 pr-4 py-3 rounded-xl border transition-all outline-none font-bold ${
                        isPaid
                          ? "border-indigo-300 bg-white text-slate-700 focus:ring-4 focus:ring-indigo-100"
                          : "border-slate-200 bg-slate-100 text-slate-400 cursor-not-allowed"
                      }`}
                      placeholder={isPaid ? "499" : "0"}
                    />
                  </div>

                  {!isPaid ? (
                    <p className="text-xs text-slate-500 mt-3 flex items-center gap-1">
                      <Info className="w-3.5 h-3.5" />
                      Course is currently{" "}
                      <span className="font-bold text-emerald-600 italic underline">
                        Free
                      </span>{" "}
                      for all students.
                    </p>
                  ) : (
                    <p className="text-xs text-indigo-500 mt-3 flex items-center gap-1">
                      <Info className="w-3.5 h-3.5" />
                      Students must pay the above amount to enroll.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Thumbnail & Actions */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
              <h2 className="font-bold text-slate-800 mb-4">Course Preview</h2>
              <div
                className="relative group aspect-video rounded-xl overflow-hidden border-2 border-dashed border-slate-200 hover:border-indigo-400 transition-all cursor-pointer bg-slate-50"
                onClick={() => thumbRef.current.click()}
              >
                <img
                  src={frontedImage}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  alt="Course Thumbnail"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="bg-white p-2 rounded-lg shadow-xl">
                    <Edit3Icon className="w-5 h-5 text-indigo-600" />
                  </div>
                </div>
                <input
                  type="file"
                  hidden
                  ref={thumbRef}
                  accept="image/*"
                  onChange={handleThumbanil}
                />
              </div>
              <p className="text-[11px] text-slate-400 mt-3 text-center uppercase tracking-wider font-semibold">
                Click image to upload thumbnail
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 space-y-3">
              <h2 className="font-bold text-slate-800 mb-2">Status Control</h2>
              <button
                onClick={() => setIsPublished(!isPublished)}
                className={`w-full py-3 rounded-xl font-bold transition-all border ${
                  isPublished
                    ? "bg-amber-50 border-amber-200 text-amber-700 hover:bg-amber-100"
                    : "bg-green-50 border-green-200 text-green-700 hover:bg-green-100"
                }`}
              >
                {isPublished ? "Unpublish Course" : "Publish Course"}
              </button>
              <button className="w-full py-3 rounded-xl font-bold bg-red-50 border border-red-100 text-red-600 hover:bg-red-100 transition-all flex items-center justify-center gap-2">
                <Trash2 className="w-4 h-4" />
                Delete Course
              </button>
            </div>

            <div className="flex flex-col gap-3 pt-4">
              <button
                onClick={handleEditCourse}
                className="w-full py-3.5 rounded-xl font-bold bg-slate-900 text-white hover:bg-slate-800 shadow-xl shadow-slate-200 transition-all flex items-center justify-center gap-2"
              >
                <Save className="w-4 h-4" />
                {loading ? <ClipLoader size={20} color="white" /> : "Save"}
              </button>
              <button
                onClick={() => navigate("/courses")}
                className="w-full py-3.5 rounded-xl font-bold text-slate-500 hover:bg-slate-100 transition-all"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditCourse;
