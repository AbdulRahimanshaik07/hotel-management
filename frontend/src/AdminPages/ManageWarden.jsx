
import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Table,
  Spinner,
  Modal,
  Form,
} from "react-bootstrap";
import AdminLayout from "../AdminComponent/AdminLayout";

export default function AdminWardenPage() {
  const [wardens, setWardens] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedWarden, setSelectedWarden] = useState(null);
  const [saving, setSaving] = useState(false);

  // ✅ Fetch all wardens
  useEffect(() => {
    fetchWardens();
  }, []);

  const fetchWardens = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:5000/api/wardens");
      const data = await res.json();
      console.log("Fetched wardens:", data);
      setWardens(data.wardens || []);
    } catch (err) {
      console.error("Error fetching wardens:", err);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Delete a warden
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this warden?")) return;
    try {
      await fetch(`http://localhost:5000/api/warden/${id}`, {
        method: "DELETE",
      });
      fetchWardens(); // Refresh the list
    } catch (err) {
      console.error("Error deleting warden:", err);
    }
  };

  // ✅ Edit modal open
  const handleEdit = async (warden) => {
    try {
      setLoading(true);
      const res = await fetch(`http://localhost:5000/api/warden/${warden._id}`);
      const data = await res.json();

      if (data.success && data.data) {
        setSelectedWarden(data.data);
        setShowModal(true);
      } else {
        alert("Unable to load warden details.");
      }
    } catch (err) {
      console.error("Error fetching warden details:", err);
      alert("Failed to fetch warden details.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Save changes
  const handleSave = async () => {
    try {
      setSaving(true);
      const res = await fetch(
        `http://localhost:5000/api/warden/${selectedWarden._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(selectedWarden),
        }
      );

      const data = await res.json();

      if (data.success) {
        alert("✅ Warden updated successfully!");
        setShowModal(false);
        fetchWardens();
      } else {
        alert("❌ Failed to update warden.");
      }
    } catch (err) {
      console.error("Error updating warden:", err);
      alert("Error updating warden.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <AdminLayout>
      <Container className="mt-4">
        <Row>
          <Col>
            <Card className="shadow-lg p-3 rounded-4 border-0">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h4 className="fw-bold text-primary mb-0">
                  🧑‍🏫 Warden Management
                </h4>
                <Button
                  variant="success"
                  onClick={() => (window.location.href = "/admin/add-warden")}
                >
                  + Add Warden
                </Button>
              </div>

              {loading ? (
                <div className="text-center p-3">
                  <Spinner animation="border" />
                </div>
              ) : (
                <Table
                  striped
                  bordered
                  hover
                  responsive
                  className="align-middle shadow-sm"
                >
                  <thead className="table-dark text-center">
                    <tr>
                      <th>#</th>
                      <th>Name</th>
                      <th>Father's Name</th>
                      <th>Phone</th>
                      <th>Email</th>
                      <th>Hostel</th>
                      <th>Year Assigned</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {wardens.length > 0 ? (
                      wardens.map((w, index) => (
                        <tr key={w._id} className="text-center">
                          <td>{index + 1}</td>
                          <td className="fw-semibold">{w.name}</td>
                          <td>{w.fatherName}</td>
                          <td>{w.phone}</td>
                          <td>{w.email}</td>
                          <td>{w.hostel}</td>
                          <td>{w.yearAssigned}</td>
                          <td>
                            <div className="d-flex justify-content-center gap-2">
                              <Button
                                size="sm"
                                variant="warning"
                                onClick={() => handleEdit(w)}
                              >
                                Edit
                              </Button>
                              <Button
                                size="sm"
                                variant="danger"
                                onClick={() => handleDelete(w._id)}
                              >
                                Delete
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="9" className="text-center text-muted">
                          No wardens found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              )}
            </Card>
          </Col>
        </Row>
      </Container>

      {/* ✅ Edit Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Warden</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedWarden && (
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  value={selectedWarden.name}
                  onChange={(e) =>
                    setSelectedWarden({
                      ...selectedWarden,
                      name: e.target.value,
                    })
                  }
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Father's Name</Form.Label>
                <Form.Control
                  type="text"
                  value={selectedWarden.fatherName}
                  onChange={(e) =>
                    setSelectedWarden({
                      ...selectedWarden,
                      fatherName: e.target.value,
                    })
                  }
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  type="text"
                  value={selectedWarden.phone}
                  onChange={(e) =>
                    setSelectedWarden({
                      ...selectedWarden,
                      phone: e.target.value,
                    })
                  }
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  value={selectedWarden.email}
                  onChange={(e) =>
                    setSelectedWarden({
                      ...selectedWarden,
                      email: e.target.value,
                    })
                  }
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Hostel</Form.Label>
                <Form.Control
                  type="text"
                  value={selectedWarden.hostel}
                  onChange={(e) =>
                    setSelectedWarden({
                      ...selectedWarden,
                      hostel: e.target.value,
                    })
                  }
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Year Assigned</Form.Label>
                <Form.Control
                  type="text"
                  value={selectedWarden.yearAssigned}
                  onChange={(e) =>
                    setSelectedWarden({
                      ...selectedWarden,
                      yearAssigned: e.target.value,
                    })
                  }
                />
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="success" onClick={handleSave} disabled={saving}>
            {saving ? "Saving..." : "Save Changes"}
          </Button>
        </Modal.Footer>
      </Modal>
    </AdminLayout>
  );
}
