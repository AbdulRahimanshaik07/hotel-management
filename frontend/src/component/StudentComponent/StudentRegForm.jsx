
// import React, { useState, useEffect } from "react";
// import { Form, Button, Card, Row, Col } from "react-bootstrap";
// import { useNavigate } from "react-router-dom";

// const StudentForm = () => {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     studentName: "",
//     fatherName: "",
//     motherName: "",
//     studentMobile: "",
//     fatherMobile: "",
//     email: "",
//     studentId: "",
//     course: "",
//     session: "",
//     year: "",
//     room: "",
//     photo: null,
//   });

//   const [errors, setErrors] = useState({});
//   const [rooms, setRooms] = useState([]);

//   // Fetch all rooms with occupied count
//   useEffect(() => {
//     const fetchRooms = async () => {
//       try {
//         const res = await fetch("http://localhost:5000/api/rooms");
//         const data = await res.json();

//         // Ensure occupied field exists
//         const formatted = data.map((r) => ({
//           ...r,
//           occupied: r.occupied || 0,
//         }));

//         setRooms(formatted);
//       } catch (err) {
//         console.error("Error fetching rooms:", err);
//       }
//     };
//     fetchRooms();
//   }, []);

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     if (name === "photo") {
//       setFormData({ ...formData, photo: files[0] });
//     } else {
//       setFormData({ ...formData, [name]: value });
//     }
//   };

//   // Simple validation
//   const validate = () => {
//     const newErrors = {};
//     if (!formData.studentName) newErrors.studentName = "Student name required";
//     if (!formData.fatherName) newErrors.fatherName = "Father name required";
//     if (!formData.motherName) newErrors.motherName = "Mother name required";
//     if (!formData.studentMobile.match(/^[0-9]{10}$/)) newErrors.studentMobile = "Enter valid 10-digit mobile";
//     if (!formData.fatherMobile.match(/^[0-9]{10}$/)) newErrors.fatherMobile = "Enter valid 10-digit mobile";
//     if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) newErrors.email = "Enter valid email";
//     if (!formData.studentId) newErrors.studentId = "Student ID required";
//     if (!formData.course) newErrors.course = "Course required";
//     if (!formData.session) newErrors.session = "Session required";
//     if (!formData.year) newErrors.year = "Year required";
//     if (!formData.room) newErrors.room = "Room required";
//     if (!formData.photo) newErrors.photo = "Photo required";
//     return newErrors;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const formErrors = validate();
//     if (Object.keys(formErrors).length > 0) {
//       setErrors(formErrors);
//       return;
//     } else {
//       setErrors({});
//     }

//     const fd = new FormData();
//     Object.entries(formData).forEach(([key, value]) => fd.append(key, value));

//     try {
//       const res = await fetch("http://localhost:5000/api/newStudent", {
//         method: "POST",
//         body: fd,
//       });
//       const data = await res.json();

//       if (!res.ok) {
//         alert(`⚠️ ${data.message || "Failed to add student"}`);
//         return;
//       }

//       alert("✅ Student Registered Successfully!");
//       navigate("/admin/students");
//     } catch (err) {
//       console.error(err);
//       alert("❌ Something went wrong!");
//     }
//   };

//   return (
//     <Row className="justify-content-center mt-4">
//       <Col md={8}>
//         <Card className="shadow-lg p-4 rounded-4">
//           <h3 className="text-center mb-4">📝 New Student Registration</h3>
//           <Form onSubmit={handleSubmit} encType="multipart/form-data">

//             {/* Name Fields */}
//             <Row>
//               <Col md={6}>
//                 <Form.Group className="mb-3">
//                   <Form.Label>Student Name</Form.Label>
//                   <Form.Control type="text" name="studentName" value={formData.studentName} onChange={handleChange} isInvalid={!!errors.studentName} />
//                   <Form.Control.Feedback type="invalid">{errors.studentName}</Form.Control.Feedback>
//                 </Form.Group>
//               </Col>
//               <Col md={6}>
//                 <Form.Group className="mb-3">
//                   <Form.Label>Father's Name</Form.Label>
//                   <Form.Control type="text" name="fatherName" value={formData.fatherName} onChange={handleChange} isInvalid={!!errors.fatherName} />
//                   <Form.Control.Feedback type="invalid">{errors.fatherName}</Form.Control.Feedback>
//                 </Form.Group>
//               </Col>
//             </Row>

//             {/* Other Fields */}
//             <Row>
//               <Col md={6}>
//                 <Form.Group className="mb-3">
//                   <Form.Label>Mother's Name</Form.Label>
//                   <Form.Control type="text" name="motherName" value={formData.motherName} onChange={handleChange} isInvalid={!!errors.motherName} />
//                   <Form.Control.Feedback type="invalid">{errors.motherName}</Form.Control.Feedback>
//                 </Form.Group>
//               </Col>
//               <Col md={6}>
//                 <Form.Group className="mb-3">
//                   <Form.Label>Email</Form.Label>
//                   <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} isInvalid={!!errors.email} />
//                   <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
//                 </Form.Group>
//               </Col>
//             </Row>

//             {/* Mobile Fields */}
//             <Row>
//               <Col md={6}>
//                 <Form.Group className="mb-3">
//                   <Form.Label>Student Mobile</Form.Label>
//                   <Form.Control type="text" name="studentMobile" value={formData.studentMobile} onChange={handleChange} isInvalid={!!errors.studentMobile} />
//                   <Form.Control.Feedback type="invalid">{errors.studentMobile}</Form.Control.Feedback>
//                 </Form.Group>
//               </Col>
//               <Col md={6}>
//                 <Form.Group className="mb-3">
//                   <Form.Label>Father Mobile</Form.Label>
//                   <Form.Control type="text" name="fatherMobile" value={formData.fatherMobile} onChange={handleChange} isInvalid={!!errors.fatherMobile} />
//                   <Form.Control.Feedback type="invalid">{errors.fatherMobile}</Form.Control.Feedback>
//                 </Form.Group>
//               </Col>
//             </Row>

//             {/* Academic Fields */}
//             <Row>
//               <Col md={4}>
//                 <Form.Group className="mb-3">
//                   <Form.Label>Student ID</Form.Label>
//                   <Form.Control type="text" name="studentId" value={formData.studentId} onChange={handleChange} isInvalid={!!errors.studentId} />
//                   <Form.Control.Feedback type="invalid">{errors.studentId}</Form.Control.Feedback>
//                 </Form.Group>
//               </Col>
//               <Col md={4}>
//                 <Form.Group className="mb-3">
//                   <Form.Label>Course</Form.Label>
//                   <Form.Control type="text" name="course" value={formData.course} onChange={handleChange} isInvalid={!!errors.course} />
//                   <Form.Control.Feedback type="invalid">{errors.course}</Form.Control.Feedback>
//                 </Form.Group>
//               </Col>
//               <Col md={4}>
//                 <Form.Group className="mb-3">
//                   <Form.Label>Session</Form.Label>
//                   <Form.Control type="text" name="session" value={formData.session} onChange={handleChange} isInvalid={!!errors.session} />
//                   <Form.Control.Feedback type="invalid">{errors.session}</Form.Control.Feedback>
//                 </Form.Group>
//               </Col>
//             </Row>

//             {/* Year + Room */}
//             <Row>
//               <Col md={6}>
//                 <Form.Group className="mb-3">
//                   <Form.Label>Year</Form.Label>
//                   <Form.Select name="year" value={formData.year} onChange={handleChange} isInvalid={!!errors.year}>
//                     <option value="">--Select Year--</option>
//                     <option value="1st">1st</option>
//                     <option value="2nd">2nd</option>
//                     <option value="3rd">3rd</option>
//                     <option value="4th">4th</option>
//                   </Form.Select>
//                   <Form.Control.Feedback type="invalid">{errors.year}</Form.Control.Feedback>
//                 </Form.Group>
//               </Col>

//               <Col md={6}>
//     <Form.Group className="mb-3">
//       <Form.Label>Room No.</Form.Label>
//       <Form.Control
//         type="text"
//         name="room"
//         value={formData.room}
//         onChange={handleChange}
//         placeholder="Enter room number"
//         isInvalid={!!errors.room}
//       />
//       <Form.Control.Feedback type="invalid">{errors.room}</Form.Control.Feedback>
//     </Form.Group>
//   </Col>
//             </Row>

//             {/* Photo */}
//             <Form.Group className="mb-3">
//               <Form.Label>Photo</Form.Label>
//               <Form.Control type="file" name="photo" accept="image/*" onChange={handleChange} isInvalid={!!errors.photo} />
//               <Form.Control.Feedback type="invalid">{errors.photo}</Form.Control.Feedback>
//             </Form.Group>

//             <div className="text-center">
//               <Button variant="primary" type="submit">Submit</Button>
//             </div>
//           </Form>
//         </Card>
//       </Col>
//     </Row>
//   );
// };

// export default StudentForm;


import React, { useState, useEffect } from "react";
import { Form, Button, Card, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const StudentForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    studentName: "",
    fatherName: "",
    motherName: "",
    studentMobile: "",
    fatherMobile: "",
    email: "",
    studentId: "",
    course: "",
    session: "",
    year: "",
    room: "",
    photo: null,
  });

  const [errors, setErrors] = useState({});
  const [rooms, setRooms] = useState([]);


  // Fetch all rooms with occupied count
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/rooms");
        const data = await res.json();

        // Ensure occupied field exists
        const formatted = data.map((r) => ({
          ...r,
          occupied: r.occupied || 0,
        }));

        setRooms(formatted);
      } catch (err) {
        console.error("Error fetching rooms:", err);
      }
    };
    fetchRooms();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "photo") {
      setFormData({ ...formData, photo: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Simple validation
  const validate = () => {
    const newErrors = {};
    if (!formData.studentName) newErrors.studentName = "Student name required";
    if (!formData.fatherName) newErrors.fatherName = "Father name required";
    if (!formData.motherName) newErrors.motherName = "Mother name required";
    if (!formData.studentMobile.match(/^[0-9]{10}$/))
      newErrors.studentMobile = "Enter valid 10-digit mobile";
    if (!formData.fatherMobile.match(/^[0-9]{10}$/))
      newErrors.fatherMobile = "Enter valid 10-digit mobile";
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))
      newErrors.email = "Enter valid email";
    if (!formData.studentId) newErrors.studentId = "Student ID required";
    if (!formData.course) newErrors.course = "Course required";
    if (!formData.session) newErrors.session = "Session required";
    if (!formData.year) newErrors.year = "Year required";
    if (!formData.room) newErrors.room = "Room required";
    if (!formData.photo) newErrors.photo = "Photo required";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validate();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    } else {
      setErrors({});
    }

    const fd = new FormData();
    Object.entries(formData).forEach(([key, value]) => fd.append(key, value));

    const token = localStorage.getItem("adminToken");
    if (!token) {
      alert("⚠️ Please login as Admin to add a student.");
      navigate("/login/admin");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/newStudent", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`, // ✅ Token added
        },
        body: fd,
      });

      const data = await res.json();

      if (!res.ok) {
        alert(`⚠️ ${data.message || "Failed to add student"}`);
        return;
      }

      alert("✅ Student Registered Successfully!");
      navigate("/admin/students");
    } catch (err) {
      console.error(err);
      alert("❌ Something went wrong!");
    }
  };

  return (
    <Row className="justify-content-center mt-4">
      <Col md={8}>
        <Card className="shadow-lg p-4 rounded-4">
          <h3 className="text-center mb-4">📝 New Student Registration</h3>
          <Form onSubmit={handleSubmit} encType="multipart/form-data">
            {/* Name Fields */}
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

            {/* Other Fields */}
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

            {/* Mobile Fields */}
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
                  <Form.Label>Father Mobile</Form.Label>
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

            {/* Academic Fields */}
            <Row>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Student ID</Form.Label>
                  <Form.Control
                    type="text"
                    name="studentId"
                    value={formData.studentId}
                    onChange={handleChange}
                    isInvalid={!!errors.studentId}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.studentId}
                  </Form.Control.Feedback>
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
                    placeholder="Enter room number"
                    isInvalid={!!errors.room}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.room}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            {/* Photo */}
            <Form.Group className="mb-3">
              <Form.Label>Photo</Form.Label>
              <Form.Control
                type="file"
                name="photo"
                accept="image/*"
                onChange={handleChange}
                isInvalid={!!errors.photo}
              />
              <Form.Control.Feedback type="invalid">
                {errors.photo}
              </Form.Control.Feedback>
            </Form.Group>

            <div className="text-center">
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </div>
          </Form>
        </Card>
      </Col>
    </Row>
  );
};

export default StudentForm;

