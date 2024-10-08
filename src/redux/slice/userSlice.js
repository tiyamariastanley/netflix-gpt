import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    userInfo: {},
  },
  reducers: {
    addUserInfo: (state, action) => {
      Object.assign(state.userInfo, action.payload);
    },
    removeUserInfo: (state) => {
      state.userInfo = {};
    },
  },
});

export const { addUserInfo, removeUserInfo } = userSlice.actions;
export default userSlice.reducer;
