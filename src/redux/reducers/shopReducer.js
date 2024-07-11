import { createSlice } from "@reduxjs/toolkit";

let shopSlice = createSlice({
  name: "shopSlice",
  initialState: [],
  reducers: {
    go_for_shop(state, action) {
      state.push(action.payload);
    },
  },
});

export const { go_for_shop } = shopSlice.actions;
export default shopSlice.reducer;
