import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const StudentCard = ({ student }) => {
  return (
    <div className="col-md-4 mb-4">
      <div className="card shadow-lg border-0 rounded-4 h-100">
        <div className="card-header bg-light d-flex justify-content-between align-items-center">
          <span className="badge bg-primary fs-6 px-3 py-2">
            Hostel {student.hostelNo}
          </span>
          <span className="text-muted">Room {student.roomNo}</span>
        </div>
        <div className="card-body">
          <h5 className="card-title fw-bold text-dark mb-3">
            {student.name}
          </h5>
          <p className="mb-2"><strong>Father’s Name:</strong> {student.fatherName}</p>
          <p className="mb-0"><strong>Phone:</strong> {student.phone}</p>
        </div>
      </div>
    </div>
  );
};

export default StudentCard;
