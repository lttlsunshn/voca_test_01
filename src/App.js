import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import SideSpace from "./components/SideSpace";

function App() {
  return (
    <>
      <Header />
      <main>
        <SideSpace />
        <div className="sidebar">
          <Sidebar />
        </div>
        <div className="container">
          <Navbar />
          <Outlet />
        </div>
      </main>
    </>
  );
}

export default App;
