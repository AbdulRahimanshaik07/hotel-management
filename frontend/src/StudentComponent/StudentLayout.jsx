
// src/components/Student/StudentComponent/StudentLayout.js
import React from "react";
import { Container, Navbar, Nav } from "react-bootstrap";

export default function StudentLayout({ children }) {
   const handleLogout = () => {
    // example: token हटाना
    localStorage.removeItem("studentToken");
    sessionStorage.removeItem("studentToken");

    // redirect to login
    navigate("/");
  };
  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Navbar */}
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <Navbar.Brand>Student Dashboard</Navbar.Brand>
          
          {/* 👇 Ye line hamburger button add karegi */}
          <Navbar.Toggle aria-controls="student-navbar-nav" />
          
          {/* 👇 Ye line mobile collapse ko handle karegi */}
          <Navbar.Collapse id="student-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link href="/student/home">Home</Nav.Link>
              <Nav.Link href="/student/attendance">Attendance</Nav.Link>
              <Nav.Link href="/student/complaints">Complaints</Nav.Link>
              <Nav.Link href="/student/gallery">Gallery</Nav.Link>
              <Nav.Link href="/student/notifications">Notification</Nav.Link>
              <Nav.Link href="/student/profile">Profile</Nav.Link>
              <Nav.Link href="/" style={{ cursor: "pointer", color: "red" }} onClick={handleLogout}>Logout</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Page Content */}
      <Container fluid className="flex-grow-1 p-3">
        {children}
      </Container>

      {/* Footer */}
      <footer
        className="bg-dark text-white text-center py-3 mt-auto"
        style={{ marginTop: "auto" }}
      >
        <Container>
          <p className="mb-1">
            © {new Date().getFullYear()} Student Hostel Portal. All Rights Reserved.
          </p>
          <small>
            Developed By ❤️ Mohd Rahman 
          </small>
        </Container>
      </footer>
    </div>
  );
}

// import React, { useEffect, useState } from "react";
// import { Container, Row, Col, Card, Button, Badge } from "react-bootstrap";
// import { motion } from "framer-motion";
// import StudentLayout from "../StudentComponent/StudentLayout";
// import { Link } from "react-router-dom";
// import axios from "axios";

// export default function StudentHome() {
//   const [unreadCount, setUnreadCount] = useState(0);

//   // 🟢 Fetch unread notifications count
//   useEffect(() => {
//     const fetchNotifications = async () => {
//       try {
//         const res = await axios.get("http://localhost:5000/api/notifications/unread-count", {
//           headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//         });
//         setUnreadCount(res.data.count || 0);
//       } catch (error) {
//         console.error("Error fetching notification count:", error);
//       }
//     };
//     fetchNotifications();
//   }, []);

//   return (
//     <StudentLayout>
//       <div className="student-home">
//         {/* Hero Section */}
//         <motion.div
//           initial={{ opacity: 0, y: -50 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8 }}
//           className="text-center p-5 bg-dark text-light rounded shadow-lg"
//         >
//           <h1 className="fw-bold display-5">Welcome Back, Student 👋</h1>
//           <p className="lead">
//             Manage your hostel life, attendance, and profile in one place.
//           </p>
//           <Button as={Link} to="/student/profile" variant="light" className="fw-bold px-4 mt-3">
//             View Profile
//           </Button>
//         </motion.div>

//         {/* Features Section */}
//         <Container className="mt-5">
//           <Row className="g-4">
//             <Col md={3}>
//               <motion.div whileHover={{ scale: 1.05 }}>
//                 <Card className="h-100 shadow-lg border-0 rounded-4 text-center p-3">
//                   <Card.Body>
//                     <h3 className="fw-bold text-primary">📅 Attendance</h3>
//                     <p>Check your real-time attendance status anytime.</p>
//                     <Button as={Link} to="/student/attendance" variant="primary">
//                       View Attendance
//                     </Button>
//                   </Card.Body>
//                 </Card>
//               </motion.div>
//             </Col>

//             <Col md={3}>
//               <motion.div whileHover={{ scale: 1.05 }}>
//                 <Card className="h-100 shadow-lg border-0 rounded-4 text-center p-3">
//                   <Card.Body>
//                     <h3 className="fw-bold text-success">📜 Complaints</h3>
//                     <p>Apply complaint and track your status easily.</p>
//                     <Button as={Link} to="/student/complaints" variant="success">
//                       Apply Complaints
//                     </Button>
//                   </Card.Body>
//                 </Card>
//               </motion.div>
//             </Col>

//             <Col md={3}>
//               <motion.div whileHover={{ scale: 1.05 }}>
//                 <Card className="h-100 shadow-lg border-0 rounded-4 text-center p-3 position-relative">
//                   <Card.Body>
//                     {/* 🛎️ Notification Title with Badge */}
//                     <div className="d-flex justify-content-center align-items-center gap-2">
//                       <h3 className="fw-bold text-danger mb-0">🔔 Notifications</h3>
//                       <Badge bg="danger" pill>
//                         {unreadCount}
//                       </Badge>
//                     </div>

//                     <p>Check new announcements & admin updates.</p>
//                     <Button as={Link} to="/student/notifications" variant="danger">
//                       View Notifications
//                     </Button>
//                   </Card.Body>
//                 </Card>
//               </motion.div>
//             </Col>

//             <Col md={3}>
//               <motion.div whileHover={{ scale: 1.05 }}>
//                 <Card className="h-100 shadow-lg border-0 rounded-4 text-center p-3">
//                   <Card.Body>
//                     <h3 className="fw-bold text-warning">🏠 Hostel Info</h3>
//                     <p>Get details of your hostel, warden, and contacts.</p>
//                     <Button as={Link} to="/student/hostel-info" variant="warning">
//                       Hostel Details
//                     </Button>
//                   </Card.Body>
//                 </Card>
//               </motion.div>
//             </Col>
//           </Row>
//         </Container>

//         {/* Motivational Banner */}
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.8, duration: 1 }}
//           className="mt-5 p-4 text-center bg-primary text-light rounded-4 shadow"
//         >
//           <h2 className="fw-bold">"Discipline is the key to success!"</h2>
//           <p>Stay consistent with attendance and achieve your goals 🎯</p>
//         </motion.div>
//       </div>
//     </StudentLayout>
//   );
// }

