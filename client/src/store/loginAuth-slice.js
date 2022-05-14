import { createSlice } from "@reduxjs/toolkit";

const initialLoginState = { isLoggedIn: false };

const loggedInSlice = createSlice({
  name: "showLoginState",
  initialState: initialLoginState,
  reducers: {
    setLoginState(state, action) {
      state.isLoggedIn = action.payload;
    },
  },
});

export const loggedInActions = loggedInSlice.actions;
export default loggedInSlice;
