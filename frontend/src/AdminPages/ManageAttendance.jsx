import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Table, Form, Button, Spinner } from "react-bootstrap";
import { CSVLink } from "react-csv";
// import WardenLayout from "../WardenComponent/WardenLayout";
import AdminLayout from "../AdminComponent/AdminLayout";

export default function AttendanceReport() {
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    startDate: "",
    endDate: "",
    room: "",
    studentName: "",
  });

const fetchReport = async () => {
  setLoading(true);
  try {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      alert("Please log in again. Token missing.");
      return;
    }

    const params = new URLSearchParams(filters).toString();
    const res = await fetch(`http://localhost:5000/api/admin/attendance/report?${params}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await res.json();
    console.log("Fetched attendance:", data);

    if (res.status === 401) {
      alert("Session expired. Please log in again.");
      localStorage.removeItem("token");
      window.location.href = "/warden/login"; // or your login route
      return;
    }

    if (Array.isArray(data.attendance)) {
      setAttendance(data.attendance);
    } else if (Array.isArray(data)) {
      setAttendance(data);
    } else {
      setAttendance([]);
    }

  } catch (error) {
    console.error("Error fetching report:", error);
    setAttendance([]);
  } finally {
    setLoading(false);
  }
};



  useEffect(() => {
    fetchReport();
  }, []);

  return (
    <AdminLayout>
      <Container className="py-4">
        <Row className="mb-3 align-items-center">
          <Col md={2}>
            <Form.Control
              type="date"
              value={filters.startDate}
              onChange={(e) => setFilters({ ...filters, startDate: e.target.value })}
              placeholder="Start Date"
            />
          </Col>
          <Col md={2}>
            <Form.Control
              type="date"
              value={filters.endDate}
              onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}
              placeholder="End Date"
            />
          </Col>
          {/* <Col md={2}>
            <Form.Control
              type="text"
              value={filters.room}
              onChange={(e) => setFilters({ ...filters, room: e.target.value })}
              placeholder="Room"
            />
          </Col> */}
          <Col md={3}>
            <Form.Control
              type="text"
              value={filters.studentName}
              onChange={(e) => setFilters({ ...filters, studentName: e.target.value })}
              placeholder="Student Name"
            />
          </Col>
          <Col md={3}>
            <Button variant="primary" onClick={fetchReport} className="me-2">
              Search
            </Button>
            <CSVLink data={attendance} filename={`attendance_report.csv`} className="btn btn-success">
              Export CSV
            </CSVLink>
          </Col>
        </Row>

        <Row>
          <Col>
            <Card>
              <Card.Body>
                {loading ? (
                  <div className="text-center py-4">
                    <Spinner animation="border" />
                  </div>
                ) : (
                  <div className="table-responsive">
                    <Table bordered hover>
                      <thead className="table-light">
                        <tr>
                          <th>Room No</th>
                          <th>Student Name</th>
                          <th>Father Name</th>
                          <th>Year</th>
                          <th>Date</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {attendance.length === 0 ? (
                          <tr>
                            <td colSpan={5} className="text-center">
                              No records found
                            </td>
                          </tr>
                        ) : (
                          attendance.map((a, idx) => (
                            <tr key={idx}>
                              <td>{a.room}</td>
                              <td>{a.studentName}</td>
                              <td>{a.fatherName}</td>
                              <td>{a.year}</td>
                              <td>{new Date(a.date).toLocaleDateString()}</td>
                              {/* <td>{a.status}</td> */}
                              <td>
                              {a.status === "Present" && (
                              <span className="badge bg-success">Present</span>
                              )}
                              {a.status === "Absent" && (
                              <span className="badge bg-danger">Absent</span>
                                )}
                                {a.status === "Leave" && (
                                <span className="badge bg-warning text-dark">Leave</span>
                              )}
                            </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </Table>
                  </div>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </AdminLayout>
  );
}
