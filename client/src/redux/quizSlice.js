import { createSlice } from "@reduxjs/toolkit";

const quizSlice = createSlice({
  name: "quiz",
  initialState: {
        quizData :[]
  },
  reducers: {
    setQuizData: (state, action) => {
      state.quizData = action.payload;
    },
  },
});

export const {setQuizData} = quizSlice.actions;
export default quizSlice.reducer;
