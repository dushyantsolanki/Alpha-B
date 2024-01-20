import React, { useEffect, useState } from "react";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import { DashboardLayout, AuthLayout } from "../layout";
import {
  ErrorPage,
  Login,
  Signup,
  Dashboard,
  Editor,
  ForgotPassword,
} from "../pages";
import { authentication } from "../firebase/";
import { useSelector, useDispatch, currentUser } from "../redux";
import { onAuthStateChanged } from "firebase/auth";

function Route() {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.authReducer.userData);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(authentication.auth, (user) => {
      if (user) {
        const { displayName, email, emailVerified, photoURL, uid } = user;
        dispatch(
          currentUser({ displayName, email, emailVerified, photoURL, uid })
        );
      } else {
        console.log("user logout");
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const router = createBrowserRouter([
    { path: "*", element: <ErrorPage /> },
    {
      path: "/",
      element: userData?.payload?.emailVerified ? (
        <Navigate to="/dashboard" />
      ) : (
        <Navigate to="/auth" />
      ),
    },
    {
      path: "/auth",
      element: userData?.payload?.emailVerified ? (
        <Navigate to="/dashboard" />
      ) : (
        <AuthLayout />
      ),
      children: [
        {
          path: "",
          element: <Signup />,
        },
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "forgot-password",
          element: <ForgotPassword />,
        },
      ],
    },
    {
      path: "/dashboard",
      element: userData?.payload?.emailVerified ? (
        <DashboardLayout />
      ) : (
        <Navigate to="/auth" />
      ),
      children: [
        {
          path: "",
          element: <Dashboard />,
        },
        {
          path: "editor",
          element: <Editor />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}
export default Route;
