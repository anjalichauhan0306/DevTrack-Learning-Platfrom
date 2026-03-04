import React from "react";
import { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setCreatorCourseData } from "../redux/courseSliec";
import { serverURL } from "../App";

const GetCreatorCourse = () => {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.user);

  useEffect(() => {
    const creatorCourses = async () => {
      const token = localStorage.getItem('token');  
            
            if (!token) {
              dispatch(setCreatorCourseData(null));
              return; 
            }

      try {
        const result = await axios.get(serverURL + "/api/course/getcreator", {
          withCredentials: true,
        });
         dispatch(setCreatorCourseData(result.data));
      } catch (error) {
        console.log("can not get creator courses");
      }
    };
    creatorCourses();
  }, [userData]);
};

export default GetCreatorCourse;
