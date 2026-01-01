import React from "react";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const CustomNavbar = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
      <Container>
        {/* Brand / Logo */}
        <Navbar.Brand href="/">🏫 Hostel Management</Navbar.Brand>

        {/* Toggle for mobile */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          {/* Menu Items */}
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            {/* <Nav.Link href="/about">AboutUs</Nav.Link> */}
            <Nav.Link href="/contact">ContactUs</Nav.Link>
            <Nav.Link href="/hostel/gallery">Gallery</Nav.Link>
          </Nav>

          {/* Login Dropdown */}
          <Nav>
            <NavDropdown title="Login" id="login-dropdown" align="end">
              <NavDropdown.Item href="/login/student">
                👨‍🎓 Student Login
              </NavDropdown.Item>
              <NavDropdown.Item href="/login/warden">
                🧑‍🏫 Warden Login
              </NavDropdown.Item>
              <NavDropdown.Item href="/login/admin">
                🛡 Admin Login
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
