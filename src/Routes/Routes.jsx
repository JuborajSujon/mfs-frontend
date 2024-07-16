import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import Login from "./../components/Login";
import Register from "../components/Register";
import Dashboard from "../Layout/Dashboard";
import UserProfile from "../pages/Dashboard/UserProfile";
import Transactions from "../pages/Dashboard/Transactions";
import ManageUsers from "../pages/Dashboard/AdminPage/ManageUsers";

// TODO: Dashboard Routes Protection

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/dashboard",
        element: <UserProfile />,
      },
      {
        path: "/dashboard/user-manage",
        element: <ManageUsers />,
      },
      {
        path: "/dashboard/transactions",
        element: <Transactions />,
      },
    ],
  },
]);
