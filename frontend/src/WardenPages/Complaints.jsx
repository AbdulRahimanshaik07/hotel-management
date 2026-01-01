import React, { useState, useEffect } from "react";
import { Table, Button, Form, Row, Col, Modal, Badge, Spinner } from "react-bootstrap";
import AdminLayout from "../AdminComponent/AdminLayout";
import WardenLayout from "../WardenComponent/WardenLayout";
import axios from "axios";

const ComplaintsManagement = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState("");

  const token = localStorage.getItem("token");

  // Fetch complaints
  const fetchComplaints = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/admin/complaints", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setComplaints(res.data.complaints);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  const handleView = (complaint) => {
    setSelectedComplaint(complaint);
    setShowModal(true);
  };

  const handleClose = () => setShowModal(false);

  const statusColor = (status) => {
    if (status === "Pending") return "warning";
    if (status === "Seen") return "info";
    if (status === "Resolved") return "success";
    return "secondary";
  };

  const updateStatus = async (id, newStatus) => {
    setUpdating(id);
    try {
      await axios.patch(
        `http://localhost:5000/api/admin/complaint/${id}`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setComplaints((prev) =>
        prev.map((c) => (c._id === id ? { ...c, status: newStatus } : c))
      );
      if (selectedComplaint?._id === id) {
        setSelectedComplaint({ ...selectedComplaint, status: newStatus });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setUpdating("");
    }
  };

  const handleResolve = (id) => updateStatus(id, "Resolved");
  const handleSeen = (id) => updateStatus(id, "Seen");

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this complaint?")) return;
    setUpdating(id);
    try {
      await axios.delete(
        `http://localhost:5000/api/admin/complaint/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setComplaints((prev) => prev.filter((c) => c._id !== id));
      if (selectedComplaint?._id === id) setShowModal(false);
    } catch (err) {
      console.error(err);
    } finally {
      setUpdating("");
    }
  };

  const filteredComplaints = complaints.filter((c) => {
    const matchesSearch =
      c.studentName.toLowerCase().includes(search.toLowerCase()) ||
      c.title.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "All" || c.status === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <WardenLayout>
      <div className="p-4">
        <h2 className="mb-4">📋 Complaints Management</h2>

        {/* Filters */}
        <Row className="mb-3">
          <Col md={6}>
            <Form.Control
              type="text"
              placeholder="Search by student or title..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </Col>
          <Col md={3}>
            <Form.Select value={filter} onChange={(e) => setFilter(e.target.value)}>
              <option value="All">All Status</option>
              <option value="Pending">Pending</option>
              <option value="Seen">Seen</option>
              <option value="Resolved">Resolved</option>
            </Form.Select>
          </Col>
        </Row>

        {/* Complaints Table */}
        {loading ? (
          <div className="text-center my-5">
            <Spinner animation="border" />
          </div>
        ) : (
          <Table striped bordered hover responsive>
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Student Name</th>
                <th>Title</th>
                <th>Status</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredComplaints.length > 0 ? (
                filteredComplaints.map((c, index) => (
                  <tr key={c._id}>
                    <td>{index + 1}</td>
                    <td>{c.studentName}</td>
                    <td>{c.title}</td>
                    <td>
                      <Badge bg={statusColor(c.status)}>{c.status}</Badge>
                    </td>
                    <td>{new Date(c.date).toLocaleString()}</td>
                    <td>
                      <Button size="sm" variant="primary" className="me-2" onClick={() => handleView(c)}>
                        View
                      </Button>
                      {c.status === "Pending" && (
                        <Button
                          size="sm"
                          variant="info"
                          className="me-2"
                          disabled={updating === c._id}
                          onClick={() => handleSeen(c._id)}
                        >
                          {updating === c._id ? "Updating..." : "Seen"}
                        </Button>
                      )}
                      {c.status !== "Resolved" && (
                        <Button
                          size="sm"
                          variant="success"
                          className="me-2"
                          disabled={updating === c._id}
                          onClick={() => handleResolve(c._id)}
                        >
                          {updating === c._id ? "Updating..." : "Resolve"}
                        </Button>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center">
                    No complaints found
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        )}

        {/* Complaint Modal */}
        <Modal show={showModal} onHide={handleClose} centered>
          <Modal.Header closeButton>
            <Modal.Title>Complaint Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedComplaint && (
              <>
                <p><strong>Student Name:</strong> {selectedComplaint.studentName}</p>
                <p><strong>Title:</strong> {selectedComplaint.title}</p>
                <p><strong>Description:</strong> {selectedComplaint.description}</p>
                <p><strong>Category:</strong> {selectedComplaint.category}</p>
                <p><strong>Status:</strong> {selectedComplaint.status}</p>
                <p><strong>Date:</strong> {new Date(selectedComplaint.date).toLocaleString()}</p>
              </>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            {selectedComplaint && selectedComplaint.status === "Pending" && (
              <Button
                variant="info"
                onClick={() => handleSeen(selectedComplaint._id)}
              >
                {updating === selectedComplaint._id ? "Updating..." : "Seen"}
              </Button>
            )}
            {selectedComplaint && selectedComplaint.status !== "Resolved" && (
              <Button
                variant="success"
                onClick={() => handleResolve(selectedComplaint._id)}
              >
                {updating === selectedComplaint._id ? "Updating..." : "Resolved"}
              </Button>
            )}
            {selectedComplaint && (
              <Button
                variant="danger"
                onClick={() => handleDelete(selectedComplaint._id)}
              >
                {updating === selectedComplaint._id ? "Deleting..." : "Delete"}
              </Button>
            )}
          </Modal.Footer>
        </Modal>
      </div>
    </WardenLayout>
  );
};

export default ComplaintsManagement;

