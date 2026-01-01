
import React, { useEffect, useState } from "react";
import { Container, Card, Row, Col } from "react-bootstrap";
import AdminLayout from "../AdminComponent/AdminLayout";
import { motion } from "framer-motion";
import axios from "axios";
import PeopleIcon from "@mui/icons-material/People";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";

const AdminDashboardHome = () => {
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalComplaints: 0,
    totalRooms: 0,
    totalWardens: 0,
  });
  const [loading, setLoading] = useState(true);

  // ✅ Fetch Dashboard Stats from backend
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/admin/dashboard-stats");
        if (res.data.success) {
          setStats(res.data.data);
        }
      } catch (error) {
        console.error("Error fetching dashboard stats:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const cardData = [
    {
      title: "Total Students",
      value: stats.totalStudents,
      color: "#007bff",
      icon: <PeopleIcon style={{ fontSize: "40px" }} />,
    },
    {
      title: "Pending Complaints",
      value: stats.totalComplaints,
      color: "#dc3545",
      icon: <ReportProblemIcon style={{ fontSize: "40px" }} />,
    },
    {
      title: "Total Rooms",
      value: stats.totalRooms,
      color: "#28a745",
      icon: <MeetingRoomIcon style={{ fontSize: "40px" }} />,
    },
    {
      title: "Total Wardens",
      value: stats.totalWardens,
      color: "#6f42c1",
      icon: <SupervisorAccountIcon style={{ fontSize: "40px" }} />,
    },
  ];

  return (
    <>
      <AdminLayout>
        <Container className="py-5">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="position-relative mb-5"
          >
            <Card
              className="shadow-lg p-4 rounded-4 text-center text-white overflow-hidden"
              style={{
                background: "linear-gradient(135deg, #667eea, #764ba2)",
                minHeight: "200px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                position: "relative",
              }}
            >
              {/* Floating shapes */}
              <motion.div
                animate={{ x: [0, 25, 0], y: [0, -20, 0] }}
                transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                style={{
                  position: "absolute",
                  top: "20px",
                  left: "20px",
                  width: "80px",
                  height: "80px",
                  background: "rgba(255,255,255,0.2)",
                  borderRadius: "50%",
                  filter: "blur(15px)",
                }}
              />
              <motion.div
                animate={{ x: [0, -25, 0], y: [0, 20, 0] }}
                transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
                style={{
                  position: "absolute",
                  bottom: "30px",
                  right: "30px",
                  width: "120px",
                  height: "120px",
                  background: "rgba(255,255,255,0.15)",
                  borderRadius: "50%",
                  filter: "blur(20px)",
                }}
              />

              {/* Hero Content */}
              <h2 style={{ fontWeight: "700", zIndex: 1 }}>🏢 Admin Control Center</h2>
              <p style={{ fontSize: "1.1rem", marginTop: "10px", zIndex: 1 }}>
                Monitor hostel performance, complaints, and wardens in one place.
              </p>
            </Card>
          </motion.div>

          {/* Statistic Cards */}
          <Row>
            {cardData.map((item, index) => (
              <Col xs={12} md={6} lg={3} key={index} className="mb-4">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card
                    className="text-white shadow-sm border-0 rounded-4 p-4 text-center d-flex flex-column align-items-center justify-content-center"
                    style={{
                      backgroundColor: item.color,
                      cursor: "default",
                      minHeight: "180px",
                    }}
                  >
                    {loading ? (
                      <div className="spinner-border text-light" role="status"></div>
                    ) : (
                      <>
                        {item.icon}
                        <h5 className="mt-3">{item.title}</h5>
                        <h3 className="fw-bold">{item.value}</h3>
                      </>
                    )}
                  </Card>
                </motion.div>
              </Col>
            ))}
          </Row>
        </Container>
      </AdminLayout>

      {/* Footer */}
      <footer className="bg-dark text-white text-center py-3 w-100">
        <Container fluid>
          <p className="mb-1">
            © {new Date().getFullYear()} Admin Hostel Portal. All Rights Reserved.
          </p>
          <small>Developed By ❤️ Mohd Rahman</small>
        </Container>
      </footer>
    </>
  );
};

export default AdminDashboardHome;
