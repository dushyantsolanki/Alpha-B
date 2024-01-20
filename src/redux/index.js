import { useSelector, useDispatch } from "react-redux";
import store from "./store/store";
import { currentUser, logout } from "./reducers/authReducer";

export { store, useSelector, useDispatch, currentUser, logout };
