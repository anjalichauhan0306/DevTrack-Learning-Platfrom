import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { FiArrowLeft, FiLock, FiPlay, FiStar } from "react-icons/fi";
import axios from 'axios';
import { serverURL } from "../App.jsx";
import emy from "../assets/empty.jpg";
import { setSelectedCourse } from "../redux/courseSliec";
import Card from "../component/Card.jsx";
import { toast } from "react-toastify";

const CourseDetailPage = () => {
  const navigate = useNavigate();
  const { courseId } = useParams();
  const {userData} = useSelector(state=>state.user)
  const dispatch = useDispatch();
  const [creatorData , setCreatorData] = useState(null)
  const { courseData, selectedCourse } = useSelector((state) => state.course);
  const [creatorCourses , setCreatorCourses] = useState(null)
  const [selectedLecture , setSelectedLecture] = useState(null)

  const [isEnrolled , setIsEnrolled]  = useState(false)

  const fetchCourseData = async () => {
    courseData.map((course)=>{
      if(course._id === courseId){
        dispatch(setSelectedCourse(course))
        console.log(selectedCourse);
        return null
      }
    })
  }

  const checkEnrollment = () =>{
    const verify = userData?.enrolledCourses?.some(c=>
    (typeof c === 'string' ? c : c._id).toString() === courseId?.toString()
    ) 
    if(verify) {
      setIsEnrolled(true)
    }
  }

  useEffect(()=>{
    fetchCourseData()
    checkEnrollment()
  },[courseData,courseId,userData])

useEffect(()=>{
  const handleCreator = async () => {
     if(selectedCourse?.creator){
      console.log(selectedCourse?.creator)
    try {
      const result = await axios.post(serverURL + "/api/course/creator" , {userId : selectedCourse?.creator} , {withCredentials : true})
      console.log(result.data);
      setCreatorData(result.data)
    } catch (error) {
      console.log(error);
    } 
  }
  }
  handleCreator()
},[selectedCourse])

useEffect(()=>{
  if(creatorData?._id && courseData.length > 0){
    const creatorCourse = courseData.filter((course)=>
      course.creator === creatorData?._id && course._id !== courseId)
      setCreatorCourses(creatorCourse)
  }
},[creatorData ,courseData])

  const handleEnroll = async (userId , courseId) => {
      try {
        const paymentData = await axios.post(serverURL + "/api/payment/razorpay-order",{userId ,courseId } ,{withCredentials:true})

        console.log(paymentData);
        const options = {
          key :import.meta.env.VITE_RAZORPAY_KEY_ID ,
          amount : paymentData.data.amount,
          Currency : 'INR',
          name : "DEVTRACK",
          description : "Course Enrollment Payment",
          order_id : paymentData.data.id,

          handle : async function (response) {
            console.log("Razorpay Response" , response);
            try {
              const verifypayment = await axios.post(serverURL + "/api/payment/verifypayment",{...response,courseId , userId } , {withCredentials:true})
               setIsEnrolled(true)
              toast.success(verifypayment?.data?.message);
            } catch (error) {
              console.log(error.response?.data?.message);
              toast.error("Something went wrong while enrolling.") 
            }
          }
        }
        const razorpay = new window.Razorpay(options)
        razorpay.open()
      } catch (error) {
        console.log(error);
         toast.error("Something went wrong while enrolling.") 
      }
  }

return (

  <div className="max-w-6xl mx-auto bg-white shadow-xl rounded-2xl p-6 md:p-8 space-y-8">

    {/* Back Button */}
    <div
      className="flex items-center gap-2 text-gray-700 cursor-pointer hover:text-black transition"
      onClick={() => navigate("/")}
    >
      <FiArrowLeft className="w-6 h-6" />
      <span className="font-medium">Back to Courses</span>
    </div>

    {/* Top Section */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

      {/* Thumbnail */}
      <div className="rounded-xl overflow-hidden h-[280px] shadow">
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

      {/* Course Details */}
      <div className="space-y-4">
        <h2 className="text-3xl font-bold text-gray-900">
          {selectedCourse?.title}
        </h2>

        <p className="text-gray-600">{selectedCourse?.subTitle}</p>

        <div className="flex items-center gap-2 text-yellow-500">
          <FiStar />
          <span className="font-semibold">5.0</span>
          <span className="text-gray-500">(1200 Reviews)</span>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-2xl font-bold text-black">
            ₹{selectedCourse?.price}
          </span>
          <span className="line-through text-gray-400">₹599</span>
        </div>

        <ul className="text-gray-700 list-disc pl-5 space-y-1">
          <li>10+ hours of video content</li>
          <li>Lifetime access to course</li>
        </ul>

        {isEnrolled ? <button className="bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition w-full md:w-auto" onClick={()=>handleEnroll(userId._id , courseId)}>
          Enroll Now
        </button> : <button className="bg-black text-green-500 px-6 py-3 rounded-xl hover:bg-green-800 transition w-full md:w-auto" onClick={()=>navigate(`/viewlecture/${courseId}`)}>
          Watch Now
        </button>}
      </div>
    </div>

    {/* Info Section */}
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

    {/* Curriculum & Video Section */}
    <div className="grid grid-cols-1 md:grid-cols-5 gap-6">

      {/* Curriculum */}
      <div className="bg-white col-span-2 p-6 rounded-2xl shadow-lg">
        <h2 className="text-xl font-semibold mb-2">Course Curriculum</h2>

        <p className="text-sm text-gray-500 mb-4">
          {selectedCourse?.lectures?.length || 0} Lectures
        </p>

        <div className="flex flex-col gap-3 max-h-[350px] overflow-y-auto pr-2">
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

      {/* Video Preview */}
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

    {/* Creator Section */}
    <div className="flex items-center gap-4 pt-4 border-t">
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

    {/* Other Courses */}
    <div>
      <h2 className="text-xl font-semibold mb-4">
        Other Published Courses by Educator
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {creatorCourses?.map((course,index) => (
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
