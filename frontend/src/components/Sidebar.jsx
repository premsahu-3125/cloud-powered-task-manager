import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Sidebar.css";

const links = [
  { to: "/dashboard", label: "Dashboard", icon: "🏠" },
  { to: "/tasks", label: "Tasks", icon: "🗂️" },
  { to: "/tasks/new", label: "New Task", icon: "➕" },
  { to: "/profile", label: "Profile", icon: "👤" },
];

export default function Sidebar() {
  const { logout } = useAuth();

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <span className="sidebar-brand-mark">TM</span>
        <span className="sidebar-brand-name">TaskManager</span>
      </div>

      <nav className="sidebar-nav">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              "sidebar-link" + (isActive ? " sidebar-link-active" : "")
            }
          >
            <span aria-hidden="true">{link.icon}</span>
            {link.label}
          </NavLink>
        ))}
      </nav>

      <button className="sidebar-logout" onClick={logout}>
        Log out
      </button>
    </aside>
  );
}
