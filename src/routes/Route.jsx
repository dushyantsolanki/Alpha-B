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
import { useSelector } from "../redux";
import { onAuthStateChanged } from "firebase/auth";

function Route() {
  const [isAuthenticated, setIsAuthenticated] = useState();

  const data = useSelector((state) => state.authReducer);

  console.log("redux authReducer Data : ", data);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(authentication.auth, (user) => {
      if (user) {
        console.log(user);
        setIsAuthenticated(user);
      } else {
        console.log("user logout");
      }
    });
    return () => {
      unsubscribe();
    };
  }, [isAuthenticated]);

  const router = createBrowserRouter([
    { path: "*", element: <ErrorPage /> },
    {
      path: "/",
      element: isAuthenticated?.emailVerified ? (
        <Navigate to="/dashboard" />
      ) : (
        <Navigate to="/auth" />
      ),
    },
    {
      path: "/auth",
      element: isAuthenticated?.emailVerified ? (
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
      element: isAuthenticated ? <DashboardLayout /> : <Navigate to="/auth" />,
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
