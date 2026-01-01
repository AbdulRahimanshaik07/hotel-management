
import React, { useEffect, useState } from "react";
import { Container, Card, Row, Col, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import StudentLayout from "../StudentComponent/StudentLayout";
import axios from "axios";

const StudentProfile = () => {
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudentProfile = async () => {
      try {
        const token = localStorage.getItem("studentToken");
        if (!token) throw new Error("Token missing. Please login.");

        const res = await axios.get("http://localhost:5000/api/studentProfile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setStudent(res.data.student);
      } catch (err) {
        console.error("Error fetching student profile:", err);
        if (err.response && (err.response.status === 401 || err.response.status === 403)) {
          localStorage.removeItem("studentToken");
          navigate("/student/login");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchStudentProfile();
  }, [navigate]);

  if (loading) {
    return (
      <StudentLayout>
        <div className="text-center py-5">
          <Spinner animation="border" />
        </div>
      </StudentLayout>
    );
  }

  if (!student) {
    return (
      <StudentLayout>
        <div className="text-center py-5">Failed to load student profile.</div>
      </StudentLayout>
    );
  }

  return (
    <StudentLayout>
      <Container className="py-5">
        {/* ✨ Animated card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <Card className="shadow-lg border-0" style={{ borderRadius: "15px" }}>
            {/* Banner */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
              style={{
                background: "linear-gradient(90deg, #4e54c8, #8f94fb)",
                height: "100px",
                borderTopLeftRadius: "15px",
                borderTopRightRadius: "15px",
              }}
            ></motion.div>

            <Card.Body>
              <Row className="align-items-center">
                {/* Avatar with pop animation */}
                <Col xs={12} md={3} className="text-center mb-3 mb-md-0">
                  <motion.div
                    initial={{ scale: 0, rotate: -10 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 200, damping: 10 }}
                    style={{
                      width: "120px",
                      height: "120px",
                      borderRadius: "50%",
                      backgroundColor: "#007bff",
                      color: "#fff",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      fontSize: "40px",
                      fontWeight: "bold",
                      margin: "-60px auto 10px auto",
                      border: "5px solid white",
                      boxShadow: "0 0 15px rgba(0,0,0,0.2)",
                    }}
                  >
                    {student?.studentName?.charAt(0) || "S"}
                  </motion.div>

                  <motion.h4
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="mt-2"
                  >
                    {student?.studentName || "Student"}
                  </motion.h4>
                </Col>

                {/* Student Info with staggered animation */}
                <Col xs={12} md={9}>
                  <Row>
                    {[
                      { label: "Student Name", value: student?.studentName },
                      { label: "Student ID", value: student?.studentId },
                      { label: "Room No", value: student?.room || "N/A" },
                      { label: "Year", value: student?.year || "N/A" },
                    ].map((item, index) => (
                      <Col xs={6} sm={3} className="mb-2" key={index}>
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 + index * 0.1 }}
                        >
                          <strong>{item.label}</strong>
                          <div className="text-muted">{item.value}</div>
                        </motion.div>
                      </Col>
                    ))}
                  </Row>
                </Col>

                {/* Edit Password Button */}
                <Row className="mt-4 justify-content-center">
                  <Col xs="auto">
                    <motion.button
                      onClick={() => navigate("/student/edit-password")}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      style={{
                        background: "linear-gradient(90deg, #4e54c8, #8f94fb)",
                        border: "none",
                        borderRadius: "25px",
                        color: "#fff",
                        padding: "10px 20px",
                        fontWeight: "bold",
                        boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
                      }}
                      >
                        Change Password
                      </motion.button>
                </Col>
              </Row>

              </Row>
            </Card.Body>
          </Card>
        </motion.div>
      </Container>
    </StudentLayout>
  );
};

export default StudentProfile;
