import { createSlice } from "@reduxjs/toolkit";

const initialUserInfo = { email: "", name: "", userId: 11 };

const userInfoSlice = createSlice({
  name: "userInfoState",
  initialState: initialUserInfo,
  reducers: {
    setUserInfoState(state, action) {
      state.email = action.payload.email;
      state.name = action.payload.name;
      state.userId = action.payload.id;
    },
  },
});

export const userInfoActions = userInfoSlice.actions;
export default userInfoSlice;
