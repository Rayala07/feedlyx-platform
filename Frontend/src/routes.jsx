// This file consists of all routes of the website, where each route defined represents to take the user to a specific UI / Page to display

import { createBrowserRouter } from "react-router-dom";
import Login from "./features/auth/pages/Login";
import Register from "./features/auth/pages/Register";
import Feed from "./features/post/pages/Feed";
import CreatePost from "./features/post/pages/CreatePost";
import UserProfile from "./features/profile/pages/UserProfile";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <Feed />
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/create-post",
    element: <CreatePost />
  }, 
  {
    path: "/user-profile",
    element: <UserProfile />
  }
]);
