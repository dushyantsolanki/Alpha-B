import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  userData: null,
};

export const authReducer = createSlice({
  name: "authReducer",
  initialState,
  reducers: {
    currentUser: (state, action) => {
      state.userData = action;
    },

    logout: (state) => {
      state.userData = null;
    },
  },
});

export const { currentUser, logout } = authReducer.actions;
export default authReducer.reducer;
