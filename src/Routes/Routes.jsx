import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import Login from "./../components/Login";
import Register from "../components/Register";
import Dashboard from "../Layout/Dashboard";
import UserProfile from "../pages/Dashboard/UserProfile";
import ManageUsers from "../pages/Dashboard/AdminPage/ManageUsers";
import BalanceInquiry from "../pages/Dashboard/BalanceInquiry";
import SendMoney from "../pages/Dashboard/UserPage/SendMoney";
import CashOut from "../pages/Dashboard/UserPage/CashOut";
import CashIn from "../pages/Dashboard/UserPage/CashIn";
import TransactionManage from "../pages/Dashboard/AgentPage/TransactionManage";
import TransactionAgent from "../pages/Dashboard/AgentPage/TransactionAgent";
import TransactionAdmin from "../pages/Dashboard/AdminPage/TransactionAdmin";

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
        element: <TransactionAdmin />,
      },
      {
        path: "/dashboard/balance",
        element: <BalanceInquiry />,
      },

      // user router
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

      // agent router
      {
        path: "/dashboard/cash-manage",
        element: <TransactionManage />,
      },
      {
        path: "/dashboard/agent-transactions",
        element: <TransactionAgent />,
      },
    ],
  },
]);
