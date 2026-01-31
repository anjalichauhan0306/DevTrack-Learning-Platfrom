import React from 'react';
import { useEffect } from 'react';
import axios from 'axios'
import {useDispatch, useSelector} from 'react-redux'
import { setCreatorCourseData } from '../redux/courseSliec';
import { serverURL } from '../App';

const GetCreatorCourse = () => {
    const dispatch = useDispatch()
            const {userData} = useSelector(state=>state.user);
    return (
        useEffect(()=>{
            const creatorCourses = async () => {
                try {
                    const result = await axios.get(serverURL + "/api/course/getcreator",{withCredentials:true})

                    console.log(result.data);
                    dispatch(setCreatorCourseData(result.data))
                    
                } catch (error) {
                    console.log(error);
                }
            }
            creatorCourses()
        },[userData])
    );
}

export default GetCreatorCourse;
