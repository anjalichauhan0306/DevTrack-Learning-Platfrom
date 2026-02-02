import axios from 'axios';
import React, { useState } from 'react';
import { serverURL } from '../../App';
import { toast } from 'react-toastify';
import { ClipLoader } from 'react-spinners';
import { useNavigate } from 'react-router-dom';

const CreateCourse = () => {
    const [title , setTitle] =useState("");
    const [subTitle , setSubTitle] =useState("");
    const [category , setCategory] =useState("");
    const [loading , setLoading] = useState(false);
    const [description,setDescription] =useState("");
    const [level ,setLevel] = useState("Beginner");
    const [thumbnail,setThumbnail] = useState(null)
    const [preview, setPreview] = useState(null);
    const navigate = useNavigate()

    const handleCreateCourse = async () => {
        setLoading(true)
        try {
            const formData = new FormData()
            formData.append("title",title)
            formData.append("subTitle",subTitle)
            formData.append("category",category)
            formData.append("description",description)
            formData.append("level",level)
            formData.append("thumbnail", thumbnail);

            const result = await axios.post(serverURL + "/api/course/create" ,formData,{withCredentials:true})
            console.log(result.data);
            setLoading(false)
            navigate("/courses")
            toast.success("Course Created !")
        } catch (error) {
            console.log(error);
            setLoading(false)
            toast.error(error?.response?.data?.message || "Something went wrong");
        }
    }

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-xl my-10 border border-gray-100">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Create New Course</h2>
      
      <form onSubmit={(e) => { e.preventDefault()}}className="space-y-6">
        {/* Title */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Course Title</label>
          <input
            type="text"
            name="title"
            placeholder="e.g. Complete Web Development Boot Camp"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            value={title}
            onChange={(e)=>setTitle(e.target.value)}
            required
          />
        </div>

        {/* Subtitle */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Subtitle</label>
          <input
            type="text"
            name="subtitle"
            value={subTitle}
            onChange={(e)=>setSubTitle(e.target.value)}
            placeholder="A short catch-phrase for your course"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        {/* Description (Rich Text Placeholder) */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
          <textarea
            name="description"
            rows="5"
            value={description}
            onChange={(e)=>setDescription(e.target.value)}
            placeholder="Describe what students will learn..."
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            
          ></textarea>
          <p className="text-xs text-gray-500 mt-1">Rich text editor can be integrated here (e.g., React-Quill).</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Category */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
            <select
              name="category"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white"
              onChange={(e)=>setCategory(e.target.value)}
              value={category}
            >
              <option value="">Select Category</option>
              <option value="Mobile App Development">Mobile App Development</option>
              <option value="AI Tools">AI Tools</option>
              <option value="Data Analytics">Data Analytics</option>
              <option value="UI UX designing">Design</option>
              <option value="Web Development">Web Development</option>
              <option value="Ethical Hacking">Ethical Hacking</option>
              <option value="Data Science">Data Science</option>
              <option value="AI/ML">AI/ML</option>
              <option value="AI Wrapper App Development">AI Wrapper App Development</option>
            </select>
          </div>

          {/* Level */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Level</label>
            <select
              name="level"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white"
              onChange={(e)=>setLevel(e.target.value)}
              value={level}
            >
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>
        </div>

        {/* Thumbnail */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Course Thumbnail</label>
          <div className="flex items-center space-x-4">
            <input
              type="file"
              accept="image/*"
              onChange={(e)=>{
                const file = e.target.files[0];
                setThumbnail(file);
                setPreview(URL.createObjectURL(file));
                }}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            {preview && (
              <img src={preview} alt="Preview" className="w-24 h-14 object-cover rounded border shadow-sm" />
            )}
          </div>
        </div>

        {/* Save Button */}
        <div className="pt-4 border-t border-gray-100 flex justify-end">
          <button
            type="submit"
            onClick={handleCreateCourse}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition-all shadow-md active:scale-95" disabled={loading}
          > {loading ? <ClipLoader size={30} color='white' /> : "Save as Draft"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateCourse;