import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { FiArrowLeft, FiLock, FiPlay, FiStar } from "react-icons/fi";
import axios from "axios";
import { serverURL } from "../App.jsx";
import emy from "../assets/empty.jpg";
import { setSelectedCourse } from "../redux/courseSliec";
import Card from "../component/Card.jsx";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import { setUserData } from "../redux/userSlice.js";
import {
  enrollFreeCourse,
  enrollPaidCourse,
  getCreator,
  submitReview,
  verifyPaymentSession,
} from "../api/courseApi.js";

const CourseDetailPage = () => {
  const navigate = useNavigate();
  const { courseId } = useParams();
  const { userData } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [creatorData, setCreatorData] = useState(null);
  const { courseData, selectedCourse } = useSelector((state) => state.course);

  const [creatorCourses, setCreatorCourses] = useState(null);
  const [selectedLecture, setSelectedLecture] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const fetchCourseData = () => {
    if (courseData && courseData.length > 0) {
      const course = courseData.find((c) => c._id === courseId);
      if (course) {
        dispatch(setSelectedCourse(course));
      }
    }
  };

  const checkEnrollment = () => {
    if (userData?.role === "Educator") {
      setIsEnrolled(false);
      return;
    }
    const verify = userData?.enrolledCourses?.some(
      (c) =>
        (typeof c === "string" ? c : c._id).toString() === courseId?.toString(),
    );

    setIsEnrolled(verify);
  };

  useEffect(() => {
    fetchCourseData();
  }, [courseData, courseId]);

  useEffect(() => {
    if (userData && courseId) {
      checkEnrollment();
    }
  }, [userData, courseId]);
  useEffect(() => {
    const handleCreator = async () => {
      if (selectedCourse?.creator) {
        try {
          const result = await getCreator({ userId: selectedCourse?.creator });
          setCreatorData(result.data);
        } catch (error) {
          console.log(error);
        }
      }
    };
    handleCreator();
  }, [selectedCourse]);

  useEffect(() => {
    if (selectedCourse && courseData.length > 0) {
      const creatorCourse = courseData.filter(
        (course) =>
          course.creator?.toString() === selectedCourse.creator?.toString() &&
          course._id?.toString() !== courseId?.toString(),
      );

      setCreatorCourses(creatorCourse);
    }
  }, [selectedCourse, courseData]);

  const handleEnroll = async () => {
    try {
      const { data } = await enrollPaidCourse({
        courseId,
        userId: userData._id,
      });

      window.location.href = data.url;
    } catch (error) {
      toast.error("Payment Failed");
    }
  };

  useEffect(() => {
    const sessionId = new URLSearchParams(window.location.search).get(
      "session_id",
    );
    if (sessionId) {
      verifyPaymentSession({ sessionId })
        .then((result) => {
          toast.success("Enrollment Successful 🎉");
          dispatch(setUserData(result.data));
        })
        .catch(() => {
          toast.error("Verification Failed");
        });
    }
  }, []);

  const enrollFree = async (userId, courseId) => {
    try {
      const response = await enrollFreeCourse({ courseId, userId });
      setIsEnrolled(true);
      toast.success(response.data.message || "Enrolled Successfully!");
      dispatch(setUserData(response.data));
    } catch (error) {
      toast.error(error.response?.data?.message || "Enrollment failed");
    }
  };

  const handleReview = async () => {
    setLoading(true);
    try {
      const result = await submitReview({ rating, comment, courseId });
      toast.success("Review Added");
      setLoading(false);
      setRating(0);
      setComment("");
    } catch (error) {
      toast.error(error.response?.data?.message);
      setLoading(false);
      setRating(0);
      setComment("");
    }
  };

  const calculateAvgReview = (reviews) => {
    if (!reviews || reviews.length === 0) {
      return 0;
    }

    const total = reviews.reduce((sum, review) => sum + review.rating, 0);

    return (total / reviews.length).toFixed(1);
  };

  const avgRating = calculateAvgReview(selectedCourse?.reviews);

  return (
    <div className="max-w-6xl mx-auto bg-white shadow-xl rounded-2xl p-6 md:p-8 space-y-8">
      <div
        className="flex items-center gap-2 text-gray-700 cursor-pointer hover:text-black transition"
        onClick={() => navigate("/allcourses")}
      >
        <FiArrowLeft className="w-6 h-6" />
        <span className="font-medium">Back to Courses</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="rounded-xl overflow-hidden h-70 shadow">
          {selectedCourse?.thumbnail ? (
            <img
              src={selectedCourse.thumbnail}
              alt="course"
              className="w-full h-full object-cover block"
            />
          ) : (
            <img
              src={emy}
              alt="placeholder"
              className="w-full h-full object-cover block"
            />
          )}
        </div>
        <div className="space-y-4">
          <h2 className="text-3xl font-bold text-gray-900">
            {selectedCourse?.title}
          </h2>

          <p className="text-gray-600">{selectedCourse?.subTitle}</p>

          <div className="flex items-center gap-2 text-yellow-500">
            <FiStar />
            <span className="font-semibold">{avgRating}</span>
            <span className="text-gray-500">(1200 Reviews)</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-2xl font-bold text-black">
              ₹{selectedCourse?.Price}
            </span>
            <span className="line-through text-gray-400">₹599</span>
          </div>

          <ul className="text-gray-700 list-disc pl-5 space-y-1">
            <li>10+ hours of video content</li>
            <li>Lifetime access to course</li>
          </ul>
          {userData?.role !== "Educator" &&
            (isEnrolled ? (
              <button
                className="bg-green-600 text-white px-6 py-3 rounded-xl w-full md:w-auto"
                onClick={() => navigate(`/viewlecture/${courseId}`)}
              >
                Watch Now
              </button>
            ) : (
              <button
                className="bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition w-full md:w-auto"
                onClick={() => {
                  if (!selectedCourse?.isPaid) {
                    enrollFree(userData._id, courseId);
                  } else {
                    handleEnroll();
                  }
                }}
              >
                {selectedCourse?.isPaid ? "Enroll Now" : "Enroll Free"}
              </button>
            ))}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-gray-50 p-5 rounded-xl">
          <h2 className="text-xl font-semibold mb-2">What you'll learn</h2>
          <ul className="list-disc pl-5 text-gray-700">
            <li>Learn {selectedCourse?.category} from beginning</li>
          </ul>
        </div>

        <div className="bg-gray-50 p-5 rounded-xl">
          <h2 className="text-xl font-semibold mb-2">Who this course is for</h2>
          <ul className="list-disc pl-5 text-gray-700">
            <li>Beginner level {selectedCourse?.level} learners</li>
          </ul>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <div className="bg-white col-span-2 p-6 rounded-2xl shadow-lg">
          <h2 className="text-xl font-semibold mb-2">Course Curriculum</h2>

          <p className="text-sm text-gray-500 mb-4">
            {selectedCourse?.lectures?.length || 0} Lectures
          </p>

          <div className="flex flex-col gap-3 max-h-87.5 overflow-y-auto pr-2">
            {selectedCourse?.lectures?.map((lecture, index) => (
              <button
                key={index}
                disabled={!lecture.isPreviewFree}
                onClick={() => {
                  if (lecture.isPreviewFree) {
                    setSelectedLecture(lecture);
                  }
                }}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg border transition-all text-left
                ${
                  lecture.isPreviewFree
                    ? "hover:bg-gray-100 cursor-pointer border-gray-300"
                    : "cursor-not-allowed opacity-60 border-gray-200"
                }
                ${
                  selectedLecture?.lectureTitle === lecture?.lectureTitle
                    ? "bg-gray-100 border-gray-400"
                    : ""
                }
              `}
              >
                <span className="text-lg">
                  {lecture.isPreviewFree ? <FiPlay /> : <FiLock />}
                </span>

                <span className="text-sm font-medium">
                  {lecture.lectureTitle}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white col-span-3 p-6 rounded-2xl shadow-lg">
          <div className="aspect-video w-full rounded-xl overflow-hidden bg-black flex items-center justify-center">
            {selectedLecture?.videoUrl ? (
              <video
                className="w-full h-full object-cover"
                src={selectedLecture.videoUrl}
                controls
              />
            ) : (
              <span className="text-white text-sm">
                Select a preview lecture to watch
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="pt-5 mt-6">
        <div className="rounded-xl p-4">
          <h2 className="text-base font-semibold text-gray-900 mb-3">
            Add a Review
          </h2>

          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-gray-600">Your Rating</span>

            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <FiStar
                  key={star}
                  onClick={() => setRating(star)}
                  className={`w-5 h-5 cursor-pointer transition-all duration-200
              ${
                star <= rating
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-gray-300 hover:text-yellow-400"
              }`}
                />
              ))}
            </div>
          </div>

          <div className="mb-3">
            <textarea
              rows="2"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Write your feedback..."
              className="w-full p-2.5 text-sm rounded-lg border border-gray-300 
                   focus:ring-1 focus:ring-black 
                   outline-none transition resize-none"
            />
          </div>

          <button
            onClick={handleReview}
            disabled={loading}
            className="bg-black text-white px-5 py-2 rounded-lg 
                 hover:bg-gray-800 transition text-sm font-medium"
          >
            {" "}
            {loading ? <ClipLoader size={18} color="white" /> : "Submit Review"}
          </button>
        </div>
      </div>

      <div className="flex items-center gap-4 pt-4">
        <img
          src={creatorData?.photoUrl || emy}
          alt="creator"
          className="border border-gray-200 w-16 h-16 rounded-full object-cover"
        />

        <div>
          <h2 className="font-semibold">{creatorData?.name}</h2>
          <p className="text-sm text-gray-600">{creatorData?.description}</p>
          <p className="text-sm text-gray-500">{creatorData?.email}</p>
        </div>
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-4">
          Other Published Courses by Educator
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {creatorCourses?.map((course, index) => (
            <Card
              key={index}
              thumbnail={course.thumbnail}
              id={course._id}
              level={course.level}
              price={course.Price}
              title={course.title}
              category={course.category}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CourseDetailPage;
