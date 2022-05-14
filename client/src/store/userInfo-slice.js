import { createSlice } from "@reduxjs/toolkit";

const initialUserInfo = { email: "", name: "" };

const userInfoSlice = createSlice({
  name: "userInfoState",
  initialState: initialUserInfo,
  reducers: {
    setUserInfoState(state, action) {
      state.email = action.payload.email;
      state.name = action.payload.name;
    },
  },
});

export const userInfoActions = userInfoSlice.actions;
export default userInfoSlice;
