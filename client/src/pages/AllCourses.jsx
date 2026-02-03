import React, { useEffect, useState } from "react";
import { Search, Filter, Sparkles } from "lucide-react";
import Navbar from "../component/Nav";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Card from "../component/Card";

const CoursePage = () => {
  const navigate = useNavigate();
  const { courseData } = useSelector((state) => state.course);

  const [category, setCategory] = useState([]);
  const [filterCourse, setFilteredCourse] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Sidebar toggle state
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory((prev) => prev.filter((c) => c !== e.target.value));
    } else {
      setCategory((prev) => [...prev, e.target.value]);
    }

    // mobile par select karte hi sidebar band
    if (window.innerWidth < 768) {
      setIsSidebarOpen(false);
    }
  };

  const applyFilter = () => {
    let courseCopy = courseData?.slice();

    if (category.length > 0) {
      courseCopy = courseCopy.filter((c) =>
        category.includes(c.category)
      );
    }

    setFilteredCourse(courseCopy);
  };

  useEffect(() => {
    setFilteredCourse(courseData);
  }, [courseData]);

  useEffect(() => {
    applyFilter();
  }, [category, searchQuery, courseData]);

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Navbar />

      <header className="relative bg-[#0a0a23] pt-28 pb-12 px-4 overflow-hidden border-b border-white/5">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-indigo-500/10 via-transparent to-transparent"></div>

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">
            Explore <span className="text-indigo-400">Universe</span> of Knowledge
          </h1>

          <div className="relative max-w-xl mx-auto group">
            <div className="relative flex items-center bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-1 transition-all">
              <div className="flex items-center flex-1 px-3">
                <Search className="text-slate-400" size={18} />
                <input
                  type="text"
                  placeholder="Search courses..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent border-none text-white outline-none py-2.5 px-2"
                />
              </div>

              <button className="bg-indigo-600 text-white px-5 py-2 rounded-lg text-sm flex items-center gap-2">
                <Sparkles size={14} /> Ask AI
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-10 flex flex-col md:flex-row gap-8">

        {/* MOBILE FILTER BUTTON */}
        <div className="md:hidden flex justify-end mb-4">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg"
          >
            <Filter size={16} />
            {isSidebarOpen ? "Hide Filters" : "Show Filters"}
          </button>
        </div>

        {/* SIDEBAR */}
        <aside
          className={`
            w-full md:w-1/4 space-y-8 
            fixed md:relative top-0 left-0 h-full md:h-auto z-50 
            bg-white md:bg-transparent transition-transform duration-300
            ${isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
          `}
        >
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 sticky top-24">
            <div className="flex items-center gap-2 mb-6 border-b pb-2">
              <Filter size={18} className="text-indigo-600" />
              <h3 className="font-bold text-gray-800 text-lg">Filters</h3>

              <button
                className="md:hidden ml-auto text-gray-600"
                onClick={() => setIsSidebarOpen(false)}
              >
                ✖
              </button>
            </div>

            <div>
              <h4 className="font-semibold text-gray-700 mb-3 text-sm">
                Category
              </h4>

              {[
                "Development",
                "Design",
                "Business",
                "Web Development",
                "Mobile App Development",
                "AI Tools",
                "Data Analytics",
                "Ethical Hacking",
                "Data Science",
                "AI/ML",
              ].map((cat) => (
                <label
                  key={cat}
                  className="flex items-center gap-2 mb-2 cursor-pointer"
                >
                  <input
                    onChange={toggleCategory}
                    value={cat}
                    type="checkbox"
                  />
                  {cat}
                </label>
              ))}
            </div>
          </div>
        </aside>

        {/* COURSE GRID */}
        <main className="w-full md:w-3/4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">
              {searchQuery
                ? `Search results for "${searchQuery}"`
                : "All Courses"}
            </h2>

            <h2 className="bg-white border p-2 rounded-lg text-sm">
              {courseData.length}
            </h2>
          </div>

          {filterCourse.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filterCourse.map((course, index) => (
                <Card
                  key={course._id || index}
                  thumbnail={course.thumbnail}
                  title={course.title}
                  category={course.category}
                  price={course.Price}
                  id={course._id}
                  subtitle={course.subtitle}
                  level={course.level}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg">
                No courses found matching your search.
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default CoursePage;
