import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import Login from "../components/Login";
import Register from "./../components/Register";
import Balance from "./../components/Dashboard/Balance";
import SendMoney from "./../components/Dashboard/SendMoney";
import CashOut from "../components/Dashboard/CashOut";
import TransactionHistory from "../components/Dashboard/TransactionHistory";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <div>Home</div>,
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
        path: "/balance",
        element: <Balance />,
      },
      {
        path: "/sendmoney",
        element: <SendMoney />,
      },
      {
        path: "/cashout",
        element: <CashOut />,
      },
      {
        path: "/transactions",
        element: <TransactionHistory />,
      },
    ],
  },
]);
