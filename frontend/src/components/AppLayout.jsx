import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import "./AppLayout.css";

// Shared shell (sidebar + content area) for every page behind login.
export default function AppLayout() {
  return (
    <div className="app-layout">
      <Sidebar />
      <main className="app-content">
        <div className="container">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
