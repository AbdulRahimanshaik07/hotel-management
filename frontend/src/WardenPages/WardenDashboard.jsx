
import React from "react";
import { Container, Card, Button, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import WardenLayout from "../WardenComponent/WardenLayout";
import { motion } from "framer-motion";
import PersonIcon from "@mui/icons-material/Person";
import HomeIcon from "@mui/icons-material/Home";
import AssignmentIcon from "@mui/icons-material/Assignment";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";

const WardenDashboardHome = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("wardenToken");
    navigate("/");
  };

  const cards = [
    {
      title: "Manage Students",
      text: "View and manage all students in your hostel.",
      path: "/warden/students",
      color: "#007bff",
      icon: <PersonIcon style={{ fontSize: "40px" }} />,
    },
    {
      title: "Attendance",
      text: "All student attendance management.",
      path: "/warden/attendance",
      color: "#dc3545",
      icon: <AssignmentIcon style={{ fontSize: "40px" }} />,
    },
    {
      title: "Rooms",
      text: "Monitor available and occupied rooms.",
      path: "/warden/rooms",
      color: "#28a745",
      icon: <MeetingRoomIcon style={{ fontSize: "40px" }} />,
    },
    {
      title: "My Profile",
      text: "View and edit your personal details.",
      path: "/warden/profile",
      color: "#6f42c1",
      icon: <HomeIcon style={{ fontSize: "40px" }} />,
    },
  ];

  return (
    <>
    <WardenLayout>
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
              background: "linear-gradient(135deg, #4e54c8, #8f94fb)",
              minHeight: "200px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              position: "relative",
            }}
          >
            {/* Floating shapes */}
            <motion.div
              animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
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
              animate={{ x: [0, -30, 0], y: [0, 20, 0] }}
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
            <h2 style={{ fontWeight: "700", zIndex: 1 }}>🏨 Warden Dashboard</h2>
            <p style={{ fontSize: "1.1rem", marginTop: "10px", zIndex: 1 }}>
              Manage your hostel efficiently — students, rooms, and attendance in one place.
            </p>
            <Button
              variant="outline-light"
              className="mt-3 align-self-center"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </Card>
        </motion.div>

        {/* Navigation Cards */}
        <Row>
          {cards.map((card, index) => (
            <Col xs={12} md={6} lg={3} key={index} className="mb-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card
                  className="text-white shadow-sm border-0 rounded-4 p-3 text-center d-flex flex-column align-items-center justify-content-center"
                  style={{
                    backgroundColor: card.color,
                    cursor: "pointer",
                    minHeight: "180px",
                  }}
                  onClick={() => navigate(card.path)}
                >
                  {card.icon}
                  <h5 className="mt-3">{card.title}</h5>
                  <p style={{ fontSize: "0.9rem" }}>{card.text}</p>
                </Card>
              </motion.div>
            </Col>
          ))}
        </Row>
      </Container>
      </WardenLayout>

  <footer
  className="bg-dark text-white text-center py-3 w-100"
  style={{
    marginTop: "auto",
    position: "relative",
    left: 0,
    right: 0,
    width: "100%",
  }}
>
  <Container fluid>
    <p className="mb-1">
      © {new Date().getFullYear()} Warden Hostel Portal. All Rights Reserved.
    </p>
    <small>Developed By ❤️ Mohd Rahman</small>
  </Container>
</footer>
    </>
  );
    
};

export default WardenDashboardHome;
