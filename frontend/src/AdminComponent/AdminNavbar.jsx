
import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const AdminNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // example: token हटाना
    localStorage.removeItem("adminToken");
    sessionStorage.removeItem("adminToken");

    // redirect to login
    navigate("/");
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        {/* Brand / Logo */}
        <Navbar.Brand as={Link} to="/admin/dashboard">
          🏫 Admin Panel
        </Navbar.Brand>

        {/* Toggle for mobile view */}
        <Navbar.Toggle aria-controls="admin-navbar-nav" />

        <Navbar.Collapse id="admin-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/admin/students">Manage Students</Nav.Link>
            <Nav.Link as={Link} to="/admin/complaints">Manage Complaints</Nav.Link>
            <Nav.Link as={Link} to="/admin/rooms">Manage Rooms</Nav.Link>
            <Nav.Link as={Link} to="/admin/attendance">Student Report</Nav.Link>
            <Nav.Link as={Link} to="/admin/warden">Manage Warden</Nav.Link>
            <Nav.Link as={Link} to="/admin/mess">Notification</Nav.Link>
            <Nav.Link as={Link} to="/admin/gallary">Gallary</Nav.Link>
            <Nav.Link as={Link} to="/admin/contact">Contacts</Nav.Link>
            
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

export default AdminNavbar;
