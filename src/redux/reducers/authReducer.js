import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  auth: false,
};
const authReducer = createSlice({
  name: "authReducer",
  initialState,
  reducer: [
    {
      authenticated_data: (state) => {},
    },
  ],
});

export const { authenticated_data } = authReducer.actions;
export default authReducer.reducer;

