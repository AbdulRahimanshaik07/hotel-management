import React from "react";
import { Container, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Card className="shadow-lg p-4 rounded-4 text-center">
        <h2>🎉 Welcome to your Dashboard</h2>
        <p className="text-muted">You are successfully logged in!</p>
        <Button variant="danger" className="mt-3" onClick={handleLogout}>
          Logout
        </Button>
      </Card>
    </Container>
  );
};

export default Dashboard;
