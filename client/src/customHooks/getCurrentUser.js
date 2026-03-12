import React from "react";
import { useEffect } from "react";
import { serverURL } from "../App";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setUserData } from "../redux/userSlice";

const GetCurrentUser = () => {
  const dispatch = useDispatch();
  return useEffect(() => {
    const fetchUser = async () => {
      try {
        const result = await axios.get(serverURL + "/api/user/getcurrentuser", {
          withCredentials: true,
        });
        dispatch(setUserData(result.data));
      } catch (error) {
       dispatch(setUserData(null))
      }
    };
    fetchUser();
  }, []);
};

export default GetCurrentUser;
