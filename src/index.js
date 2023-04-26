import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import VocaNote from "./pages/VocaNote";
import OnlineTest from "./pages/OnlineTest";
import ScoreResult from "./pages/ScoreResult";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import VocaNotes from "./pages/VocaNotes";
import SortProvider from "./components/SortContext";

const queryClient = new QueryClient();
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Home /> },
      { path: "/voca-notes", element: <VocaNotes /> },
      { path: "/voca-notes/:noteId", element: <VocaNote /> },
      { path: "/voca-notes/:noteId/online-test", element: <OnlineTest /> },
      {
        path: "/voca-notes/:noteId/online-test/:timeTitle",
        element: <ScoreResult />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <SortProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router}>
          <App />
        </RouterProvider>
      </QueryClientProvider>
    </SortProvider>
  </React.StrictMode>
);
