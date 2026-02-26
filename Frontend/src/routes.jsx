// This file consists of all routes of the website, where each route defined represents to take the user to a specific UI / Page to display

import { createBrowserRouter } from "react-router-dom";
import Login from "./features/auth/pages/Login";
import Register from "./features/auth/pages/Register";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <h1>Welcome to Home Page</h1>
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);
