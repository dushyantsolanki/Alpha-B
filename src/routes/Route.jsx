import React, { useEffect } from "react";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import { DashboardLayout, AuthLayout, HomeLayout } from "../layout";
import {
  ErrorPage,
  Login,
  Signup,
  Dashboard,
  Editor,
  ForgotPassword,
  Profile,
  Blogs,
  FullBlog,
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
        const {
          displayName,
          email,
          emailVerified,
          photoURL,
          uid,
          providerData,
        } = user;
        dispatch(
          currentUser({
            displayName,
            email,
            emailVerified,
            photoURL,
            uid,
            providerData,
          })
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
        <Navigate to="/home" />
      ) : (
        <Navigate to="/auth" />
      ),
    },
    {
      path: "/auth",
      element: userData?.payload?.emailVerified ? (
        <Navigate to="/home" />
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
      path: "/home",
      element: userData?.payload?.emailVerified ? (
        <HomeLayout />
      ) : (
        <Navigate to="/auth" />
      ),

      children: [
        { path: "", element: <Blogs /> },
        {
          path: "/home/blogs/:blogId",
          element: <FullBlog />,
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
        { path: "profile", element: <Profile /> },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}
export default Route;
