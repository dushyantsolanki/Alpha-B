import { useSelector, useDispatch } from "react-redux";
import store from "./store/store";
import { currentUser, logout } from "./reducers/authReducer";
import { add, remove, increment, decrement } from "./reducers/cartReducer";
import { go_for_shop } from "./reducers/shopReducer";

export {
  store,
  useSelector,
  useDispatch,
  currentUser,
  logout,
  add,
  remove,
  increment,
  decrement,
  go_for_shop,
};
