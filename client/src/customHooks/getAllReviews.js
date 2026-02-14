import React, { useEffect } from 'react';
import { serverURL } from '../App';
import { linkWithCredential } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { setReviewData } from '../redux/reviewSlice';
import axios from 'axios';

const GetAllReviews = () => {
    const dispatch = useDispatch()
    useEffect(()=>{
        const allReviews = async () => {
            try {
                const result = await  axios.get(serverURL + "/api/review/getreview" , {withCredentials: true })
                dispatch(setReviewData(result.data))
                console.log(result.data);
            } catch (error) {
             console.log(error);
            }
        }
        allReviews()
    },[])
}

export default GetAllReviews;
