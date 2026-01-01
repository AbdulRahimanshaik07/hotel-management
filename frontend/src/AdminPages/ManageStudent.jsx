
import React, { useState, useEffect } from "react";
import { Table, Button, Form, Row, Col } from "react-bootstrap";
import AdminLayout from "../AdminComponent/AdminLayout";
import { useNavigate } from "react-router-dom";

const ManageStudents = () => {
  const [students, setStudents] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [searchYear, setSearchYear] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/admin/students")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch students");
        return res.json();
      })
      .then((data) => setStudents(data))
      .catch((err) => console.error(err));
  }, []);

  // Filtered students based on name and year
  const filteredStudents = students.filter((s) => {
    const matchesName =
      searchName === "" ||
      s.studentName?.toLowerCase().includes(searchName.toLowerCase());

    const matchesYear =
      searchYear === "" ||
      (s.year && s.year.toLowerCase() === searchYear.toLowerCase());

    return matchesName && matchesYear;
  });

  // ✅ Export CSV function
  const exportToCSV = () => {
    if (!filteredStudents.length) return alert("No students to export");

    const headers = ["Room", "Name", "Father's Name", "Course", "Year"];
    const rows = filteredStudents.map((s) => [
      s.room,
      s.studentName,
      s.fatherName,
      s.course,
      s.year,
    ]);

    let csvContent =
      "data:text/csv;charset=utf-8," +
      [headers, ...rows].map((e) => e.join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "students.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <AdminLayout>
      <h3 className="mb-4">👥 Manage Students</h3>

      {/* Filters + Add Button + Export CSV */}
      <Row className="align-items-center mb-3">
        <Col xs="auto">
          <Button
            variant="primary"
            onClick={() => navigate(`/student/register`)}
            style={{ height: "38px" }}
          >
            + Add Student
          </Button>
        </Col>

        <Col xs="auto">
          <Button variant="success" onClick={exportToCSV} style={{ height: "38px" }}>
            Export to CSV
          </Button>
        </Col>

        <Col xs="auto">
          <Form.Control
            type="text"
            placeholder="🔍 Search by Name"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            style={{ minWidth: "200px" }}
          />
        </Col>

        <Col xs="auto">
          <Form.Select
            value={searchYear}
            onChange={(e) => setSearchYear(e.target.value)}
            style={{ minWidth: "140px" }}
          >
            <option value="">All Years</option>
            <option value="1st">1st</option>
            <option value="2nd">2nd</option>
            <option value="3rd">3rd</option>
            <option value="4th">4th</option>
          </Form.Select>
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
                    onClick={() => navigate(`/students/${s._id}`)}
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
    </AdminLayout>
  );
};

export default ManageStudents;
