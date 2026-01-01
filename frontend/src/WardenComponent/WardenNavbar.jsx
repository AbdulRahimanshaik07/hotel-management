
import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const WardenNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // example: token हटाना
    localStorage.removeItem("wardenToken");
    sessionStorage.removeItem("wardenToken");

    // redirect to login
    navigate("/");
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        {/* Brand / Logo */}
        <Navbar.Brand as={Link} to="/warden/dashboard">
          🏫 Warden Panel
        </Navbar.Brand>

        {/* Toggle for mobile view */}
        <Navbar.Toggle aria-controls="warden-navbar-nav" />

        <Navbar.Collapse id="warden-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/warden/dashboard">Dashboard</Nav.Link>
            <Nav.Link as={Link} to="/warden/students">Student</Nav.Link>
            <Nav.Link as={Link} to="/warden/rooms">Rooms</Nav.Link>
            <Nav.Link as={Link} to="/warden/attendance">Attendence</Nav.Link>
            <Nav.Link as={Link} to="/warden/attendanceHistory">History</Nav.Link>
            <Nav.Link as={Link} to="/warden/report">Report</Nav.Link>
            <Nav.Link as={Link} to="/warden/profile">Profile</Nav.Link>
            
            {/* Logout Button */}
            <Nav.Link onClick={handleLogout} style={{ cursor: "pointer", color: "red" }}>
              Logout
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default WardenNavbar;
