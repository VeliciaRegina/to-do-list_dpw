import { NavLink } from "react-router-dom";
import { LayoutDashboard, ClipboardList, Heart, Flower2 } from "lucide-react";

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-icon">
          <Flower2 size={25} />
        </div>
        <div>
          <h2>Taskify</h2>
          <p>Organize your day </p>
        </div>
      </div>

      <div className="sidebar-menu">
        <p className="menu-label">MENU</p>

        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          <LayoutDashboard size={19} />
          <span>Dashboard</span>
        </NavLink>

        <NavLink
          to="/tasks"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          <ClipboardList size={19} />
          <span>My Tasks</span>
        </NavLink>
      </div>

      <div className="sidebar-footer">
        <Heart size={15} fill="currentColor" />
        <span>Made with care</span>
      </div>
    </aside>
  );
}

export default Sidebar;
