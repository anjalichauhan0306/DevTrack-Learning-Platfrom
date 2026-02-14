import { configureStore } from "@reduxjs/toolkit";
import userSlice from './userSlice.js'
import courseSlice from './courseSliec.js'
import lectureSlice from './lectureSliece.js'
import reviewSlice from './reviewSlice.js'

export const store = configureStore({
    reducer :{
        user : userSlice,
        course : courseSlice,
        lecture : lectureSlice,
        review : reviewSlice
    }
})