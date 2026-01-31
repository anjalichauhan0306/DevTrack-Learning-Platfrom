import { createSlice } from "@reduxjs/toolkit";

const courseSlice = createSlice({
    name : "Course",
    initialState :{
        creatorCourseData : null
    },
    reducers : {
        setCreatorCourseData :(state,action)=>{
            state.creatorCourseData = action.payload
        }
    }
})

export const {setCreatorCourseData} = courseSlice.actions
export default courseSlice.reducer