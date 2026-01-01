import React from "react";
import AdminNavbar from "./AdminNavbar";

const AdminLayout = ({ children }) => {
  return (
    <div className="d-flex">
      <div className="flex-grow-1">
        <AdminNavbar />
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};

export default AdminLayout;
