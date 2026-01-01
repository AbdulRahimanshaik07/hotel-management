
// frontend/src/pages/StudentDetail.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, Button, Row, Col, ListGroup, Image, Spinner } from "react-bootstrap";
import AdminLayout from "../../AdminComponent/AdminLayout";

const StudentDetail = () => {
  const { id } = useParams(); // Dynamic student id from URL
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch student data from backend
  useEffect(() => {
    fetch(`http://localhost:5000/students/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch student");
        return res.json();     
      })
      .then((data) => {
        setStudent(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load student details");
        console.log(id);
        setLoading(false);
      });
  }, [id]);

  // Delete student handler
  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      fetch(`http://localhost:5000/students/${id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then(() => {
          alert(`✅ Student ${student.studentName} deleted successfully!`);
          navigate("/admin/students");
        })
        .catch((err) => console.error(err));
    }
  };

  return (
    <AdminLayout>
      {loading ? (
        <div className="text-center mt-5">
          <Spinner animation="border" /> Loading student...
        </div>
      ) : error ? (
        <div className="text-center mt-5 text-danger">
          <h4>{error}</h4>
          <Button variant="secondary" onClick={() => navigate("/admin/students")}>
            Back to Students
          </Button>
        </div>
      ) : !student ? (
        <div className="text-center mt-5 text-danger">
          <h4>Student not found ❌</h4>
          <Button variant="secondary" onClick={() => navigate("/admin/students")}>
            Back to Students
          </Button>
        </div>
      ) : (
        <>
          <Button
            variant="secondary"
            className="mb-3"
            onClick={() => navigate("/admin/students")}
          >
            ← Back to Students
          </Button>

          <Card className="shadow-sm p-3">
            <Card.Body>
              <Row className="mb-3">
                {/* Profile Photo */}
                <Col md={3} className="text-center mb-3">
                  <Image
                    // src={student.photo || "https://media.istockphoto.com/id/1414942332/photo/studio-shot-of-a-young-man-carrying-a-bag.jpg?s=1024x1024&w=is&k=20&c=3NrhU59yxQ7SlFRYiw-69kr3Y_NC85QAE5psJ0p_QpM="}
                    src={
                      student.photo
                      ? student.photo
                      : "https://media.istockphoto.com/id/1414942332/photo/studio-shot-of-a-young-man-carrying-a-bag.jpg?s=1024x1024&w=is&k=20&c=3NrhU59yxQ7SlFRYiw-69kr3Y_NC85QAE5psJ0p_QpM="
                    }
                    roundedCircle
                    fluid
                    style={{ width: "150px", height: "150px", objectFit: "cover" }}
                  />
                </Col>

                {/* Student Info */}
                <Col md={9}>
                  <h4 className="text-primary mb-3">{student.studentName} - Profile</h4>
                  <Row>
                    <Col md={6}>
                      <ListGroup variant="flush">
                        <ListGroup.Item>
                          <strong>Student Name :</strong> {student.studentName}
                        </ListGroup.Item>
                        <ListGroup.Item>
                          <strong>Father's Name :</strong> {student.fatherName}
                        </ListGroup.Item>
                        <ListGroup.Item>
                          <strong>Mother's Name :</strong> {student.motherName}
                        </ListGroup.Item>
                        <ListGroup.Item>
                          <strong>Student Mobile :</strong> {student.studentMobile}
                        </ListGroup.Item>
                        <ListGroup.Item>
                          <strong>Student ID :</strong> {student.studentId}
                        </ListGroup.Item>
                      </ListGroup>
                    </Col>
                    <Col md={6}>
                      <ListGroup variant="flush">
                        <ListGroup.Item>
                          <strong>Father's Mobile :</strong> {student.fatherMobile}
                        </ListGroup.Item>
                        <ListGroup.Item>
                          <strong>Course :</strong> {student.course}
                        </ListGroup.Item>
                        <ListGroup.Item>
                          <strong>Session :</strong> {student.session}
                        </ListGroup.Item>
                        <ListGroup.Item>
                          <strong>Year :</strong> {student.year}
                        </ListGroup.Item>
                        <ListGroup.Item>
                          <strong>Room :</strong> {student.room}
                        </ListGroup.Item>
                      </ListGroup>
                    </Col>
                  </Row>

                  {/* Action Buttons */}
                  <div className="mt-4 d-flex gap-3">
                    <Button
                      variant="warning"
                      onClick={() =>
                        navigate(`/students/edit/${student._id}`)
                      }
                    >
                      ✏️ Edit
                    </Button>
                    <Button 
                    variant="danger" 
                    onClick={handleDelete}
                    >
                      🗑️ Delete
                    </Button>
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </>
      )}
    </AdminLayout>
  );
};

export default StudentDetail;

