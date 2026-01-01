
import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Table,
  Spinner,
  Form,
  Badge,
} from "react-bootstrap";
import WardenLayout from "../WardenComponent/WardenLayout";

export default function AttendanceHistory() {
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [searchName, setSearchName] = useState("");
  const [filterRoom, setFilterRoom] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  const fetchAttendance = () => {
    setLoading(true);
    const token = localStorage.getItem("wardenToken");
    fetch(
      `http://localhost:5000/api/warden/attendance/history?date=${date}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )
      .then((res) => res.json())
      .then((data) => setAttendance(data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchAttendance();
  }, [date]);

  // Filter logic
  const filteredAttendance = attendance.filter((a) => {
    return (
      (!searchName ||
        a.studentName.toLowerCase().includes(searchName.toLowerCase())) &&
      (!filterRoom || a.room.toString() === filterRoom) &&
      (!filterStatus || a.status === filterStatus)
    );
  });

  // Unique rooms for dropdown
  const rooms = [...new Set(attendance.map((a) => a.room))];

  // Format date safely
  const formatDate = (d) => {
    if (!d) return "";
    const dateObj = new Date(d);
    if (isNaN(dateObj)) return "";
    const day = String(dateObj.getDate()).padStart(2, "0");
    const month = String(dateObj.getMonth() + 1).padStart(2, "0");
    const year = dateObj.getFullYear();
    return `${day}-${month}-${year}`;
  };

  return (
    <WardenLayout>
      <Container className="py-4">
        <Row className="mb-4 align-items-center">
          <Col md={3}>
            <h3>Attendance History</h3>
          </Col>
          <Col md={2}>
            <Form.Control
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </Col>
          <Col md={3}>
            <Form.Control
              type="text"
              placeholder="Search by student name..."
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
            />
          </Col>
          <Col md={2}>
            <Form.Select
              value={filterRoom}
              onChange={(e) => setFilterRoom(e.target.value)}
            >
              <option value="">All Rooms</option>
              {rooms.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </Form.Select>
          </Col>
          <Col md={2}>
            <Form.Select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="">All Status</option>
              <option value="Present">Present</option>
              <option value="Absent">Absent</option>
              <option value="Leave">Leave</option>
            </Form.Select>
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
                          <th>Year</th>
                          <th>Date</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredAttendance.length === 0 ? (
                          <tr>
                            <td colSpan={5} className="text-center">
                              No records found
                            </td>
                          </tr>
                        ) : (
                          filteredAttendance.map((a) => (
                            <tr key={a._id}>
                              <td>{a.room}</td>
                              <td>{a.studentName}</td>
                              <td>{a.fatherName}</td>
                              <td>{a.year}</td>
                              <td>{formatDate(a.date)}</td>
                              <td>
                                {a.status === "Present" && (
                                  <Badge bg="success">Present</Badge>
                                )}
                                {a.status === "Absent" && (
                                  <Badge bg="danger">Absent</Badge>
                                )}
                                {a.status === "Leave" && (
                                  <Badge bg="warning">Leave</Badge>
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
    </WardenLayout>
  );
}
