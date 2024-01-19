import React from "react";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import { DashboardLayout, AuthLayout } from "../layout";
import { ErrorPage, Login, Signup, Dashboard, Editor } from "../pages";

function Route() {
  const isAuthenticated = 0;
  const router = createBrowserRouter([
    { path: "*", element: <ErrorPage /> },
    {
      path: "/",
      element: isAuthenticated ? (
        <Navigate to="/dashboard" />
      ) : (
        <Navigate to="/auth" />
      ),
    },
    {
      path: "/auth",
      element: isAuthenticated ? <Navigate to="/dashboard" /> : <AuthLayout />,
      children: [
        {
          path: "",
          element: <Signup />,
        },
        {
          path: "login",
          element: <Login />,
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
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}
export default Route;
