import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import SignUp from "./components/SignUp.jsx";
import View from "./components/View.jsx";
import SubmitRequest from "./components/SubmitRequest.jsx";
import Approval from "./components/approval.jsx";

const route = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/view", element: <View /> },
  { path: "/signup", element: <SignUp /> },
  { path: "/request", element: <SubmitRequest /> },
  { path: "/approve", element: <Approval /> },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={route} />
  </StrictMode>
);
