import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { serverURL } from '../App';
import { useDispatch } from 'react-redux';
import { setCourseData } from '../redux/courseSliec';

const GetPublishedCourse = () => {
    const dispatch = useDispatch()

    useEffect(()=>{

        const getCourseData = async () => {
            try{
            const result = await axios.get(serverURL +"/api/course/getpublished",{withCredentials:true})
            dispatch(setCourseData(result.data))
            console.log(result.data);
            }catch(error){
                console.log(error);
            }
        }

    })
}

export default GetPublishedCourse;
