import { Link, Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="d-flex vh-100">
      {/* Sidebar */}
      <div className="bg-dark text-white p-3" style={{ width: "250px" }}>
        <h4 className="text-center mb-4">🏨 Hostel</h4>
        <ul className="nav flex-column">
          <li className="nav-item">
            <Link to="/" className="nav-link text-white">Dashboard</Link>
          </li>
          <li className="nav-item">
            <Link to="/students" className="nav-link text-white">Students</Link>
          </li>
          <li className="nav-item">
            <Link to="/warden" className="nav-link text-white">Warden</Link>
          </li>
          <li className="nav-item">
            <Link to="/fees" className="nav-link text-white">Fees</Link>
          </li>
          <li className="nav-item">
            <Link to="/attendance" className="nav-link text-white">Attendance</Link>
          </li>
          <li className="nav-item">
            <Link to="/complaints" className="nav-link text-white">Complaints</Link>
          </li>
          <li className="nav-item">
            <Link to="/rooms" className="nav-link text-white">Rooms</Link>
          </li>
          <li className="nav-item">
            <Link to="/settings" className="nav-link text-white">Settings</Link>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-grow-1 bg-light">
        <nav className="navbar navbar-light bg-white shadow-sm px-3">
          <span className="navbar-brand">Hostel Management</span>
        </nav>
        <div className="p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
