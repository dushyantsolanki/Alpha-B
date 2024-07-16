import { createSlice } from "@reduxjs/toolkit";

let shopSlice = createSlice({
  name: "shopSlice",
  initialState: [],
  reducers: {
    go_for_shop(state, action) {
      state.push(action.payload);
    },

    product_clear(state, action) {
      state.length = 0;
    },
  },
});

export const { go_for_shop, product_clear } = shopSlice.actions;
export default shopSlice.reducer;
