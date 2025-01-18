import { ConfigProvider, theme } from "antd";
import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import {
  RouterProvider,
  createBrowserRouter,
  Outlet,
  Navigate,
} from "react-router-dom";
import Activation from "routes/activation";
import AppLayout from "routes/app_layout";
import CreateSession from "routes/create_session";
import Error from "routes/error";
import HomeLayout from "routes/home_layout"; // Homelayout isn't being actively used, but deleting it messes with our css for some reason
import NotFound from "routes/not_found";
import Session, {
  action as sessionAction,
  loader as sessionLoader,
} from "routes/session";
import ShareLayout from "routes/share_layout";
import SharedSession, {
  loader as sharedSessionLoader,
} from "routes/shared_session";
import reportWebVitals from "./reportWebVitals";

const queryClient = new QueryClient();
const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/app" replace />, // Redirect from "/" to "/app"
  },
  {
    element: <Outlet />,
    errorElement: <Error />,
    children: [
      {
        path: "/app",
        element: <AppLayout />,
        children: [
          {
            element: <CreateSession />,
            index: true,
          },
          {
            path: "sessions/:sessionId",
            element: <Session />,
            loader: sessionLoader,
            action: sessionAction,
          },
        ],
      },
    ],
  },
  {
    path: "/activate/:key",
    element: <Activation />,
    errorElement: <Error />,
  },
  {
    element: <ShareLayout />,
    errorElement: <Error />,
    children: [
      {
        path: "share/:sessionId",
        element: <SharedSession />,
        loader: sharedSessionLoader,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ConfigProvider
      theme={{
        algorithm: theme.compactAlgorithm,
      }}
    >
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </ConfigProvider>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
