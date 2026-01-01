
import React, { useState, useEffect } from "react";
import { Form, Button, Card, Row, Col, Image } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";

const EditStudentForm = () => {
  const { id } = useParams(); // URL se student ka id milega
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    studentName: "",
    fatherName: "",
    motherName: "",
    studentMobile: "",
    email: "",
    studentId: "",
    fatherMobile: "",
    course: "",
    session: "",
    year: "",
    room: "",
    photo: null,
  });

  const [preview, setPreview] = useState(""); // photo preview ke liye
  const [errors, setErrors] = useState({});

  // ✅ Fetch Existing Student Data
  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/students/${id}`);
        const data = await res.json();

        setFormData({
          studentName: data.studentName || "",
          fatherName: data.fatherName || "",
          motherName: data.motherName || "",
          studentMobile: data.studentMobile || "",
          email: data.email || "",
          studentId: data.studentId || "",
          fatherMobile: data.fatherMobile || "",
          course: data.course || "",
          session: data.session || "",
          year: data.year || "",
          room: data.room || "",
          photo: null, // file input ko empty rakhenge
        });

        if (data.photo) {
          setPreview(`http://localhost:5000${data.photo}`); // uploads se photo load
        }
      } catch (err) {
        console.error("Error fetching student:", err);
      }
    };

    fetchStudent();
  }, [id]);

  // ✅ Handle Input Change
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "photo") {
      const file = files[0];
      setFormData({ ...formData, photo: file });
      setPreview(URL.createObjectURL(file)); // new image preview
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // ✅ Validation
  const validate = () => {
    let newErrors = {};
    if (!formData.studentName) newErrors.studentName = "Student name is required";
    if (!formData.fatherName) newErrors.fatherName = "Father's name is required";
    if (!formData.motherName) newErrors.motherName = "Mother's name is required";
    if (!formData.studentMobile.match(/^[0-9]{10}$/))
      newErrors.studentMobile = "Enter valid 10-digit mobile number";
    if (!formData.fatherMobile.match(/^[0-9]{10}$/))
      newErrors.fatherMobile = "Enter valid 10-digit mobile number";
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))
      newErrors.email = "Enter valid email address";
    if (!formData.course) newErrors.course = "Course is required";
    if (!formData.session) newErrors.session = "Session is required";
    if (!formData.year) newErrors.year = "Year is required";
    if (!formData.room) newErrors.room = "Room no. is required";
    return newErrors;
  };

  // ✅ Handle Submit (PUT request)
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const formErrors = validate();
  //   if (Object.keys(formErrors).length > 0) {
  //     setErrors(formErrors);
  //   } else {
  //     setErrors({});
  //     const fd = new FormData();
  //     Object.entries(formData).forEach(([key, value]) => {
  //       if (value) fd.append(key, value);
  //     });

  //     try {
  //       const res = await fetch(`http://localhost:5000/api/students/${id}`, {
  //         method: "PUT",
  //         body: fd,
  //       });

  //       if (res.ok) {
  //         alert("✅ Student Updated Successfully!");
  //         navigate(`/admin/students`); // redirect after update
  //       } else {
  //         console.error("Update failed");
  //       }
  //     } catch (err) {
  //       console.error("Error:", err);
  //     }
  //   }
  // };

  // ✅ Handle Submit (PUT request)
const handleSubmit = async (e) => {
  e.preventDefault();
  const formErrors = validate();
  if (Object.keys(formErrors).length > 0) {
    setErrors(formErrors);
  } else {
    setErrors({});
    const fd = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value) fd.append(key, value);
    });

    try {
      const res = await fetch(`http://localhost:5000/api/students/${id}`, {
        method: "PUT",
        body: fd,
      });

      const result = await res.json();

      if (res.ok) {
        alert("✅ Student Updated Successfully!");
        navigate(`/admin/students`);
      } else {
        // 👇 Backend se aaya hua error message flash karo
        alert(`❌ Update Failed: ${result.message}`);
      }
    } catch (err) {
      console.error("Error:", err);
      alert("Something went wrong!");
    }
  }
};


  return (
    <Row className="justify-content-center mt-4">
      <Col md={8}>
        <Card className="shadow-lg p-4 rounded-4">
          <h3 className="text-center mb-4">✏️ Edit Student Details</h3>
          <Form onSubmit={handleSubmit} encType="multipart/form-data">
            {/* Student Name + Father Name */}
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Student Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="studentName"
                    value={formData.studentName}
                    onChange={handleChange}
                    isInvalid={!!errors.studentName}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.studentName}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Father's Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="fatherName"
                    value={formData.fatherName}
                    onChange={handleChange}
                    isInvalid={!!errors.fatherName}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.fatherName}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            {/* Mother Name + Email */}
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Mother's Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="motherName"
                    value={formData.motherName}
                    onChange={handleChange}
                    isInvalid={!!errors.motherName}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.motherName}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    isInvalid={!!errors.email}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.email}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            {/* Student Mobile + Father Mobile */}
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Student Mobile</Form.Label>
                  <Form.Control
                    type="text"
                    name="studentMobile"
                    value={formData.studentMobile}
                    onChange={handleChange}
                    isInvalid={!!errors.studentMobile}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.studentMobile}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Father's Mobile</Form.Label>
                  <Form.Control
                    type="text"
                    name="fatherMobile"
                    value={formData.fatherMobile}
                    onChange={handleChange}
                    isInvalid={!!errors.fatherMobile}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.fatherMobile}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            {/* Student ID + Course + Session */}
            <Row>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Student ID</Form.Label>
                  <Form.Control
                    type="text"
                    name="studentId"
                    value={formData.studentId}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Course</Form.Label>
                  <Form.Control
                    type="text"
                    name="course"
                    value={formData.course}
                    onChange={handleChange}
                    isInvalid={!!errors.course}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.course}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Session</Form.Label>
                  <Form.Control
                    type="text"
                    name="session"
                    value={formData.session}
                    onChange={handleChange}
                    isInvalid={!!errors.session}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.session}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            {/* Year + Room */}
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Year</Form.Label>
                  <Form.Select
                    name="year"
                    value={formData.year}
                    onChange={handleChange}
                    isInvalid={!!errors.year}
                  >
                    <option value="">--Select Year--</option>
                    <option value="1st">1st</option>
                    <option value="2nd">2nd</option>
                    <option value="3rd">3rd</option>
                    <option value="4th">4th</option>
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {errors.year}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Room No.</Form.Label>
                  <Form.Control
                    type="text"
                    name="room"
                    value={formData.room}
                    onChange={handleChange}
                    isInvalid={!!errors.room}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.room}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            {/* Student Photo */}
            <Form.Group className="mb-3">
              <Form.Label>Student Photo</Form.Label>
              <Form.Control
                type="file"
                name="photo"
                accept="image/*"
                onChange={handleChange}
              />
              {preview && (
                <div className="mt-2 text-center">
                  <Image src={preview} width="120" rounded />
                  <p className="text-muted">Current / New Photo</p>
                </div>
              )}
            </Form.Group>

            <div className="text-center">
              <Button variant="success" type="submit" className="px-4">
                Update
              </Button>
            </div>
          </Form>
        </Card>
      </Col>
    </Row>
  );
};

export default EditStudentForm;
