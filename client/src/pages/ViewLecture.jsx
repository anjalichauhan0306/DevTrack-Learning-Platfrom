import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { serverURL } from "../App";

const ViewLecture = () => {
  const { courseId } = useParams();
  const { userdata } = useSelector((state) => state.course);
  const selectedCourse = courseData?.find((course) => course._id === courseId);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [creatorData, setCreatorData] = useState(null);
  const { courseData } = useSelector((state) => state.course);

  useEffect(() => {
    const handleCreator = async () => {
      if (selectedCourse?.creator) {
        console.log(selectedCourse?.creator);
        try {
          const result = await axios.post(
            serverURL + "/api/course/creator",
            { userId: selectedCourse?.creator },
            { withCredentials: true },
          );
          console.log(result.data);
          setCreatorData(result.data);
        } catch (error) {
          console.log(error);
        }
      }
    };
    handleCreator();
  }, [selectedCourse]);

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex flex-col">
      <div className=""></div>
    </div>
  );
};

export default ViewLecture;
