import React from "react";
import WardenNavbar from "./WardenNavbar";

const WardenLayout = ({ children }) => {
  return (
    <div className="d-flex">
      <div className="flex-grow-1">
        <WardenNavbar />
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};

export default WardenLayout;
