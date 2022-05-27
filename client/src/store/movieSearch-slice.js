import { createSlice } from "@reduxjs/toolkit";

const initialSearchInfo = { similarMovieTitle: "", exactMovieTitle: "" };

const searchInfoSlice = createSlice({
  name: "searchInfoState",
  initialState: initialSearchInfo,
  reducers: {
    setSimilarSearch(state, action) {
      state.similarMovieTitle = action.payload.title;
    },
    setExactSearch(state, action) {
      state.exactMovieTitle = action.payload.title;
    },
  },
});

export const searchInfoActions = searchInfoSlice.actions;
export default searchInfoSlice;
