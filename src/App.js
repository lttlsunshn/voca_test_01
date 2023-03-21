import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import AddWord from "./components/AddWord";
import Header from "./components/Header";
// import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import SideSpace from "./components/SideSpace";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Header />
      <main>
        <SideSpace />
        <div className="sidebar">
          <Sidebar />
        </div>
        <div className="container">
          {/* <Navbar /> */}
          <Outlet />
          <AddWord />
        </div>
      </main>
    </QueryClientProvider>
  );
}

export default App;
