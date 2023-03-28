import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <>
      <Header />
      <main>
        <div className="side-space"></div>
        <div className="sidebar">
          <Sidebar />
        </div>
        <div className="container">
          <Outlet />
        </div>
      </main>
    </>
  );
}

export default App;
