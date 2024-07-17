import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import Login from "./../components/Login";
import Register from "../components/Register";
import Dashboard from "../Layout/Dashboard";
import UserProfile from "../pages/Dashboard/UserProfile";
import Transactions from "../pages/Dashboard/UserPage/TransactionsUser";
import ManageUsers from "../pages/Dashboard/AdminPage/ManageUsers";
import BalanceInquiry from "../pages/Dashboard/BalanceInquiry";
import SendMoney from "../pages/Dashboard/UserPage/SendMoney";
import CashOut from "../pages/Dashboard/UserPage/CashOut";
import CashIn from "../pages/Dashboard/UserPage/CashIn";

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

      {
        path: "/dashboard/balance",
        element: <BalanceInquiry />,
      },

      {
        path: "/dashboard/send-money",
        element: <SendMoney />,
      },

      {
        path: "/dashboard/cash-out",
        element: <CashOut />,
      },
      {
        path: "/dashboard/cash-in",
        element: <CashIn />,
      },
    ],
  },
]);
