
import React, { useState, useEffect } from "react";
import { Table, Button, Form, Row, Col, Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import WardenLayout from "../WardenComponent/WardenLayout";


const ManageStudents = () => {
  const [students, setStudents] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [searchYear, setSearchYear] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
      fetch("http://localhost:5000/api/warden/students", {
      method: "GET",
      headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("wardenToken")}`,
  },
})
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch students");
        return res.json();
      })
      .then((data) => setStudents(data))
      .catch((err) => console.error(err));
  }, []);

  const filteredStudents = students.filter((s) => {
    const matchesName =
      searchName === "" ||
      s.studentName?.toLowerCase().includes(searchName.toLowerCase());

    return matchesName;
  });

  return (
    <>
        <WardenLayout >
      <Container fluid className="pt-2 mt-3">
        <h3 className="mb-4">👥 All Students</h3>

        {/* Filters + Add Button */}
        <Row className="align-items-center mb-3">
          <Col xs="auto">
            <Form.Control
              type="text"
              placeholder="🔍 Search by Name"
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
              style={{ minWidth: "200px" }}
            />
          </Col>
        </Row>

        {/* Student Table */}
        <Table bordered hover responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Room</th>
              <th>Name</th>
              <th>Father's Name</th>
              <th>Course</th>
              <th>Year</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.length > 0 ? (
              filteredStudents.map((s, i) => (
                <tr key={s._id || i}>
                  <td>{i + 1}</td>
                  <td>{s.room}</td>
                  <td>{s.studentName}</td>
                  <td>{s.fatherName}</td>
                  <td>{s.course}</td>
                  <td>{s.year}</td>
                  <td>
                    <Button
                      size="sm"
                      variant="info"
                      onClick={() => navigate(`/warden/students/${s._id}`)}
                    >
                      View
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center text-muted">
                  No students found
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </Container>
      </WardenLayout>
    </>
  );
};

export default ManageStudents;
