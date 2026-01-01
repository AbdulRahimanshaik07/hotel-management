
import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, Badge } from "react-bootstrap";
import { motion } from "framer-motion";

import StudentLayout from "../StudentComponent/StudentLayout";
import { Link } from "react-router-dom";
import axios from "axios";
import NotificationsIcon from "@mui/icons-material/NotificationsActive";

export default function StudentHome() {
  const [studentName, setStudentName] = useState("Student");
  const [newNotifications, setNewNotifications] = useState(0);

  // 🧠 Get student name from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("studentData");
    if (stored) {
      const studentData = JSON.parse(stored);
      setStudentName(studentData.studentName || "Student");

      // 🧾 Fetch notifications safely
      // const id = studentData._id || studentData.id;
      // if (id) {
      //   axios
      //     .get(`http://localhost:5000/api/notifications/student/${id}`)
      //     .then((res) => {
      //       if (res.data?.success) {
      //         setNewNotifications(res.data.count || 0);
      //       } else {
      //         console.warn("Unexpected response:", res.data);
      //         setNewNotifications(0);
      //       }
      //     })
      //     .catch((err) => {
      //       console.error("Error fetching notifications:", err);
      //       setNewNotifications(0); // safe default
      //     });
      // }
    }
  }, []);

  return (
    <StudentLayout>
      <div className="student-home">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center p-5 bg-dark text-light rounded shadow-lg"
        >
          <h1 className="fw-bold display-5">
            Welcome Back, {studentName} 👋
          </h1>
          <p className="lead">
            Manage your hostel life, attendance, and profile in one place.
          </p>
          <Button
            as={Link}
            to="/student/profile"
            variant="light"
            className="fw-bold px-4 mt-3"
          >
            View Profile
          </Button>
        </motion.div>

        {/* Features Section */}
        <Container className="mt-5">
          <Row className="g-4">
            {/* Attendance */}
            <Col md={3}>
              <motion.div whileHover={{ scale: 1.05 }}>
                <Card className="h-100 shadow-lg border-0 rounded-4 text-center p-3">
                  <Card.Body>
                    <h3 className="fw-bold text-primary">📅 Attendance</h3>
                    <p>Check your real-time attendance status anytime.</p>
                    <Button
                      as={Link}
                      to="/student/attendance"
                      variant="primary"
                    >
                      View Attendance
                    </Button>
                  </Card.Body>
                </Card>
              </motion.div>
            </Col>

            {/* Complaints */}
            <Col md={3}>
              <motion.div whileHover={{ scale: 1.05 }}>
                <Card className="h-100 shadow-lg border-0 rounded-4 text-center p-3">
                  <Card.Body>
                    <h3 className="fw-bold text-success">📜 Complaints</h3>
                    <p>Apply complaint and track your status easily.</p>
                    <Button
                      as={Link}
                      to="/student/complaints"
                      variant="success"
                    >
                      Apply Complaints
                    </Button>
                  </Card.Body>
                </Card>
              </motion.div>
            </Col>

            {/* Hostel Info */}
            <Col md={3}>
              <motion.div whileHover={{ scale: 1.05 }}>
                <Card className="h-100 shadow-lg border-0 rounded-4 text-center p-3">
                  <Card.Body>
                    <h3 className="fw-bold text-warning">🏠 Hostel Info</h3>
                    <p>Get details of your hostel, warden, and contacts.</p>
                    <Button
                      as={Link}
                      to="/student/hostel-info"
                      variant="warning"
                    >
                      Hostel Details
                    </Button>
                  </Card.Body>
                </Card>
              </motion.div>
            </Col>

            {/* Notifications */}
            <Col md={3}>
              <motion.div whileHover={{ scale: 1.05 }}>
                <Card className="h-100 shadow-lg border-0 rounded-4 text-center p-3 position-relative">
                  <Card.Body>
                    <h3 className="fw-bold text-danger">
                      🔔 Notifications{" "}
                      {newNotifications > 0 && (
                        <Badge bg="danger" pill className="ms-1">
                          {newNotifications}
                        </Badge>
                      )}
                    </h3>
                    <p>Stay updated with latest hostel announcements.</p>
                    <Button
                      as={Link}
                      to="/student/notifications"
                      variant="danger"
                    >
                      View Notifications
                    </Button>
                  </Card.Body>

                  {/* Floating Icon */}
                  <motion.div
                    animate={{ rotate: [0, 15, -15, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    style={{
                      position: "absolute",
                      top: "-10px",
                      right: "-10px",
                      background: "#dc3545",
                      borderRadius: "50%",
                      padding: "10px",
                    }}
                  >
                    <NotificationsIcon style={{ color: "white" }} />
                  </motion.div>
                </Card>
              </motion.div>
            </Col>
          </Row>
        </Container>

        {/* Motivational Banner */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="mt-5 p-4 text-center bg-primary text-light rounded-4 shadow"
        >
          <h2 className="fw-bold">"Discipline is the key to success!"</h2>
          <p>Stay consistent with attendance and achieve your goals 🎯</p>
        </motion.div>
      </div>
    </StudentLayout>
  );
}
