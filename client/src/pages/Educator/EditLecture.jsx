import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { serverURL } from "../../App.jsx";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setLectureData } from "../../redux/lectureSliece";
import { ClipLoader } from "react-spinners";

const EditLecture = () => {
  const { lectureId, courseId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { lectureData } = useSelector((state) => state.lecture);

  const [lectureTitle, setLectureTitle] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch single lecture details
  useEffect(() => {
    const fetchLecture = async () => {
      try {
        const result = await axios.get(
          `${serverURL}/api/course/lecture/${lectureId}`,
          { withCredentials: true }
        );

        setLectureTitle(result.data.lecture.lectureTitle);
      } catch (error) {
        toast.error("Failed to load lecture");
      }
    };

    fetchLecture();
  }, [lectureId]);

  // Update lecture
  const handleUpdate = async () => {
    if (!lectureTitle.trim()) {
      return toast.error("Lecture title required");
    }

    setLoading(true);

    try {
      const result = await axios.put(
        `${serverURL}/api/course/updatelecture/${lectureId}`,
        { lectureTitle },
        { withCredentials: true }
      );

      // Update redux state
      const updated = lectureData.map((lec) =>
        lec._id === lectureId ? result.data.lecture : lec
      );

      dispatch(setLectureData(updated));

      toast.success("Lecture updated successfully");

      navigate(`/createlecture/${courseId}`);
    } catch (error) {
      toast.error("Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white shadow-lg rounded-xl w-full max-w-xl p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Edit Lecture
        </h1>

        <p className="text-sm text-gray-500 mb-6">
          Update your lecture details below
        </p>

        <div className="mb-5">
          <label className="block text-sm font-medium mb-2">
            Lecture Title
          </label>

          <input
            type="text"
            value={lectureTitle}
            onChange={(e) => setLectureTitle(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="flex gap-4">
          <button
            onClick={() => navigate(`/createlecture/${courseId}`)}
            className="flex-1 bg-gray-200 py-2 rounded-lg hover:bg-gray-300"
          >
            Cancel
          </button>

          <button
            onClick={handleUpdate}
            disabled={loading}
            className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:opacity-70"
          >
            {loading ? <ClipLoader size={18} color="white" /> : "Update Lecture"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditLecture;
