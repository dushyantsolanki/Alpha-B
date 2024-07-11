import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import authReducer from "../reducers/authReducer";
import cartReducer from "../reducers/cartReducer";
import shopReducer from "../reducers/shopReducer";

const rootReducer = combineReducers({
  authReducer: authReducer,
  cartReducer: cartReducer,
  shopReducer: shopReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
