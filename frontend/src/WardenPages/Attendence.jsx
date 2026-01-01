
import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Table,
  Button,
  Badge,
  Spinner,
  Form,
} from "react-bootstrap";
import WardenLayout from "../WardenComponent/WardenLayout";

export default function AttendancePage() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));

  useEffect(() => {
    const token = localStorage.getItem("wardenToken");
    if (!token) {
      alert("Please login first");
      window.location.href = "/login/warden";
      return;
    }

    // 1️⃣ Fetch all students
    fetch("http://localhost:5000/api/warden/students", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((studentsData) => {
        // 2️⃣ Fetch today's attendance
        fetch(`http://localhost:5000/api/warden/attendance/today?date=${date}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
          .then((res) => res.json())
          .then((attendanceData) => {
            // Merge students with attendance
            const mergedData = studentsData.map((s) => {
              const todayRecord = attendanceData.find(
                (a) => a.studentId === s._id
              );
              return {
                ...s,
                status: todayRecord
                  ? todayRecord.status // Leave / Present / Absent
                  : "Present", // Default Present
              };
            });
            setStudents(mergedData);
          });
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [date]); // 🔹 Re-fetch when date changes

  const changeStatus = (id, newStatus) => {
    setStudents((prev) =>
      prev.map((s) => (s._id === id ? { ...s, status: newStatus } : s))
    );
  };

  const submitAttendance = () => {
    const token = localStorage.getItem("wardenToken");
    if (!token) return alert("Please login first");

    const attendanceData = students.map((s) => ({
      studentId: s._id,
      status: s.status,
    }));

    fetch("http://localhost:5000/api/warden/attendance", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ date, attendance: attendanceData }),
    })
      .then((res) => res.json())
      .then(() => alert("Attendance submitted successfully"))
      .catch((err) => console.error(err));
  };

  return (
    <WardenLayout>
      <Container className="py-4">
        <Row className="mb-4 align-items-center">
          <Col>
            <h3>Mark Attendance</h3>
          </Col>
          <Col className="text-end">
            {/* Date Picker */}
            <Form.Control
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              style={{ maxWidth: "200px", marginLeft: "auto" }}
            />
          </Col>
        </Row>

        <Row>
          <Col>
            <Card>
              <Card.Body>
                {loading ? (
                  <div className="text-center py-4">
                    <Spinner animation="border" variant="primary" />
                  </div>
                ) : (
                  <div className="table-responsive">
                    <Table bordered hover>
                      <thead className="table-light">
                        <tr>
                          <th>Room No</th>
                          <th>Student Name</th>
                          <th>Father Name</th>
                          <th>Status</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {students.length === 0 ? (
                          <tr>
                            <td colSpan={5} className="text-center">
                              No students found
                            </td>
                          </tr>
                        ) : (
                          students.map((s) => (
                            <tr key={s._id}>
                              <td>{s.room}</td>
                              <td>{s.studentName}</td>
                              <td>{s.fatherName}</td>
                              <td>
                                {s.status === "Present" && (
                                  <Badge bg="success">Present</Badge>
                                )}
                                {s.status === "Absent" && (
                                  <Badge bg="danger">Absent</Badge>
                                )}
                                {s.status === "Leave" && (
                                  <Badge bg="warning">Leave</Badge>
                                )}
                              </td>
                              <td>
                                <Button
                                  size="sm"
                                  variant={s.status === "Present" ? "success" : "outline-success"}
                                  onClick={() => changeStatus(s._id, "Present")}
                                  className="me-2"
                                >
                                  Present
                                </Button>
                                <Button
                                  size="sm"
                                  variant={s.status === "Absent" ? "danger" : "outline-danger"}
                                  onClick={() => changeStatus(s._id, "Absent")}
                                  className="me-2"
                                >
                                  Absent
                                </Button>
                                <Button
                                  size="sm"
                                  variant={s.status === "Leave" ? "warning" : "outline-warning"}
                                  onClick={() => changeStatus(s._id, "Leave")}
                                >
                                  Leave
                                </Button>
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

            <Card className="mt-4">
              <Card.Body className="text-center">
                <Button variant="success" size="lg" onClick={submitAttendance}>
                  Submit Attendance
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </WardenLayout>
  );
}
