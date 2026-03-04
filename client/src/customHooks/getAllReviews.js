import React, { useEffect } from "react";
import { serverURL } from "../App";
import { useDispatch } from "react-redux";
import { setReviewData } from "../redux/reviewSlice";
import axios from "axios";

const GetAllReviews = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const allReviews = async () => {
      try {
        const result = await axios.get(serverURL + "/api/review/review", {
          withCredentials: true,
        });
        dispatch(setReviewData(result.data));
      } catch (error) {
        console.log("can't get all reviews ");
      }
    };
    allReviews();
  }, []);
};

export default GetAllReviews;
