import { useEffect } from 'react';
import axios from 'axios'
import {useDispatch, useSelector} from 'react-redux'
import { setQuizData } from '../redux/quizSlice.js';
import { serverURL } from '../App';

const GetQuiz = () => {
            const dispatch = useDispatch()
            const {quizData} = useSelector(state=>state.quiz);

        useEffect(()=>{
            const getQuiz = async () => {
                try {
                    const result = await axios.get(serverURL + "/api/quiz/getquiz",{withCredentials:true})

                    console.log(result.data);
                    dispatch(setQuizData(result.data))
                    
                } catch (error) {
                    console.log(error);
                }
            }
            getQuiz()
        },[])
}

export default GetQuiz;
