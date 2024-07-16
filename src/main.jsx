import React from "react";
import ReactDOM from "react-dom/client";
import { ToastContainer } from "react-toastify";
import { HelmetProvider } from "react-helmet-async";
import { RouterProvider } from "react-router-dom";
import { router } from "./Routes/Routes";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HelmetProvider>
      <RouterProvider router={router} />
      <ToastContainer />
    </HelmetProvider>
  </React.StrictMode>
);
