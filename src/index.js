import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import VocaNote from "./pages/VocaNote";
import OnlineTest from "./pages/OnlineTest";
import PrintPage from "./pages/PrintPage";
import ScoreResult from "./pages/ScoreResult";
import { SortProvider } from "./SortContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Home /> },
      { path: "/voca-notes/:noteTitle", element: <VocaNote /> },
      { path: "/voca-notes/:noteTitle/online-test", element: <OnlineTest /> },
      {
        path: "/voca-notes/:noteTitle/online-test/:timeTitle",
        element: <ScoreResult />,
      },
    ],
  },
  {
    path: "/voca-notes/:noteTitle/print-page",
    element: <PrintPage />,
    errorElement: <NotFound />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <SortProvider>
        <RouterProvider router={router}>
          <App />
        </RouterProvider>
      </SortProvider>
    </QueryClientProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
