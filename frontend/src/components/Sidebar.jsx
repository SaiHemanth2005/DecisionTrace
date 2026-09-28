import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  AlertTriangle,
  FolderKanban,
  Settings,
  Plus,
} from "lucide-react";

function Sidebar() {
  const navigation = [
    {
      name: "Dashboard",
      path: "/",
      icon: LayoutDashboard,
    },
    {
      name: "Decisions",
      path: "/decisions",
      icon: FileText,
    },
    {
      name: "Review Alerts",
      path: "/review-alerts",
      icon: AlertTriangle,
    },
    {
      name: "Projects",
      path: "/projects",
      icon: FolderKanban,
    },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <div className="brand-mark">D</div>

        <div>
          <div className="brand-name">DecisionTrace</div>
          <div className="brand-subtitle">Decision Intelligence</div>
        </div>
      </div>

      <div className="sidebar-section">
        <div className="sidebar-label">WORKSPACE</div>

        <nav className="sidebar-nav">
          {navigation.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `sidebar-link ${isActive ? "active" : ""}`
                }
              >
                <Icon size={18} />
                <span>{item.name}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>

      <NavLink to="/decisions/new" className="sidebar-new-button">
        <Plus size={18} />
        New Decision
      </NavLink>

      <div className="sidebar-bottom">
        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `sidebar-link ${isActive ? "active" : ""}`
          }
        >
          <Settings size={18} />
          <span>Settings</span>
        </NavLink>
      </div>
    </aside>
  );
}

export default Sidebar;