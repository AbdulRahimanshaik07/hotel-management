
import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  Row,
  Col,
  Form,
  Modal,
  Badge,
  ListGroup,
} from "react-bootstrap";
import AdminLayout from "../AdminComponent/AdminLayout";

const RoomManagement = () => {
  const [rooms, setRooms] = useState([]);
  const [search, setSearch] = useState("");
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [students, setStudents] = useState([]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [newRoom, setNewRoom] = useState({ roomNo: "", capacity: "" });
  const [adding, setAdding] = useState(false);

  // ✅ Edit Modal states
  const [showEditModal, setShowEditModal] = useState(false);
  const [editRoom, setEditRoom] = useState({ _id: "", roomNo: "", capacity: "" });
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/rooms");
      const data = await res.json();
      setRooms(data);
    } catch (err) {
      console.error("❌ Fetch rooms error:", err);
    }
  };

  const handleView = async (room) => {
    setSelectedRoom(room);
    try {
      const res = await fetch(
        `http://localhost:5000/api/rooms/${room.roomNo}/students`
      );
      const data = await res.json();
      setStudents(data);
    } catch (err) {
      console.error("❌ Fetch students error:", err);
      setStudents([]);
    }
    setShowViewModal(true);
  };

  const handleAddRoom = async (e) => {
    e.preventDefault();
    try {
      setAdding(true);
      const res = await fetch("http://localhost:5000/api/addRoom", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newRoom),
      });

      const data = await res.json();
      if (res.ok) {
        alert("✅ " + data.message);
        fetchRooms();
        setShowAddModal(false);
        setNewRoom({ roomNo: "", capacity: "" });
      } else {
        alert("❌ Failed: " + (data.message || "Unknown error"));
      }
    } catch (err) {
      console.error("Add room error:", err);
      alert("Server error: " + err.message);
    } finally {
      setAdding(false);
    }
  };

  // ✅ Delete Room
  const handleDeleteRoom = async (id) => {
    if (!window.confirm("Are you sure you want to delete this room?")) return;

    try {
      const res = await fetch(`http://localhost:5000/api/rooms/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();
      if (res.ok) {
        alert("🗑️ " + data.message);
        fetchRooms();
      } else {
        alert("❌ Failed: " + (data.message || "Unknown error"));
      }
    } catch (err) {
      console.error("Delete room error:", err);
      alert("Server error: " + err.message);
    }
  };

  // ✅ Edit Room (open modal)
  const openEditModal = (room) => {
    setEditRoom({ _id: room._id, roomNo: room.roomNo, capacity: room.capacity });
    setShowEditModal(true);
  };

  // ✅ Update Room API call
  const handleEditRoom = async (e) => {
    e.preventDefault();
    try {
      setUpdating(true);
      const res = await fetch(`http://localhost:5000/api/rooms/${editRoom._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          roomNo: editRoom.roomNo,
          capacity: editRoom.capacity,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        alert("✏️ " + data.message);
        fetchRooms();
        setShowEditModal(false);
      } else {
        alert("❌ Failed: " + (data.message || "Unknown error"));
      }
    } catch (err) {
      console.error("Update room error:", err);
      alert("Server error: " + err.message);
    } finally {
      setUpdating(false);
    }
  };

  const filteredRooms = rooms.filter((r) =>
    r.roomNo.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="p-4">
        <h2 className="mb-4">🏠 Room Management</h2>

        <Row className="mb-3">
          <Col md={6}>
            <Form.Control
              type="text"
              placeholder="Search by Room No..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </Col>
          <Col className="text-end">
            <Button onClick={() => setShowAddModal(true)}>➕ Add Room</Button>
          </Col>
        </Row>

        <Table striped bordered hover responsive>
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Room No</th>
              <th>Capacity</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredRooms.length > 0 ? (
              filteredRooms.map((r, i) => {
                const availableSeats = Math.max(r.capacity - r.occupied, 0);
                const effectiveStatus =
                  r.occupied >= r.capacity ? "Occupied" : "Available";

                return (
                  <tr key={r._id}>
                    <td>{i + 1}</td>
                    <td>{r.roomNo}</td>
                    <td>{r.capacity}</td>
                    <td>
                      {effectiveStatus === "Occupied" ? (
                        <Badge bg="danger">Occupied (Full)</Badge>
                      ) : (
                        <Badge bg="success">
                          Available ({availableSeats})
                        </Badge>
                      )}
                    </td>
                    <td>
                      <Button
                        size="sm"
                        variant="info"
                        className="me-2"
                        onClick={() => handleView(r)}
                      >
                        View
                      </Button>
                      <Button
                        size="sm"
                        variant="warning"
                        className="me-2"
                        onClick={() => openEditModal(r)}
                      >
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="danger"
                        onClick={() => handleDeleteRoom(r._id)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="5" className="text-center">
                  No rooms found
                </td>
              </tr>
            )}
          </tbody>
        </Table>

        {/* View Room Modal */}
        <Modal
          show={showViewModal}
          onHide={() => setShowViewModal(false)}
          centered
          size="lg"
        >
          <Modal.Header closeButton>
            <Modal.Title>
              👨‍🎓 Room {selectedRoom?.roomNo} - Details
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedRoom && (
              <>
                <p>
                  <strong>Capacity:</strong> {selectedRoom.capacity}
                </p>
                <p>
                  <strong>Occupied:</strong> {selectedRoom.occupied}
                </p>
                <p>
                  <strong>Available:</strong>{" "}
                  {Math.max(selectedRoom.capacity - selectedRoom.occupied, 0)}
                </p>

                <h5>Students in this Room:</h5>
                {students.length > 0 ? (
                  <ListGroup>
                    {students.map((s) => (
                      <ListGroup.Item key={s._id}>
                        <strong>{s.studentName}</strong> (Father: {s.fatherName})
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                ) : (
                  <p className="text-center">No students in this room</p>
                )}
              </>
            )}
          </Modal.Body>
        </Modal>

        {/* Add Room Modal */}
        <Modal
          show={showAddModal}
          onHide={() => setShowAddModal(false)}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>➕ Add New Room</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleAddRoom}>
              <Form.Group className="mb-3">
                <Form.Label>Room No</Form.Label>
                <Form.Control
                  type="text"
                  value={newRoom.roomNo}
                  onChange={(e) =>
                    setNewRoom({ ...newRoom, roomNo: e.target.value })
                  }
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Capacity</Form.Label>
                <Form.Control
                  type="number"
                  value={newRoom.capacity}
                  onChange={(e) =>
                    setNewRoom({ ...newRoom, capacity: e.target.value })
                  }
                  required
                />
              </Form.Group>
              <div className="text-end">
                <Button
                  variant="secondary"
                  onClick={() => setShowAddModal(false)}
                >
                  Cancel
                </Button>{" "}
                <Button type="submit" variant="primary" disabled={adding}>
                  {adding ? "Saving..." : "Save"}
                </Button>
              </div>
            </Form>
          </Modal.Body>
        </Modal>

        {/* Edit Room Modal */}
        <Modal
          show={showEditModal}
          onHide={() => setShowEditModal(false)}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>✏️ Edit Room</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleEditRoom}>
              <Form.Group className="mb-3">
                <Form.Label>Room No</Form.Label>
                <Form.Control
                  type="text"
                  value={editRoom.roomNo}
                  onChange={(e) =>
                    setEditRoom({ ...editRoom, roomNo: e.target.value })
                  }
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Capacity</Form.Label>
                <Form.Control
                  type="number"
                  value={editRoom.capacity}
                  onChange={(e) =>
                    setEditRoom({ ...editRoom, capacity: e.target.value })
                  }
                  required
                />
              </Form.Group>
              <div className="text-end">
                <Button
                  variant="secondary"
                  onClick={() => setShowEditModal(false)}
                >
                  Cancel
                </Button>{" "}
                <Button type="submit" variant="warning" disabled={updating}>
                  {updating ? "Updating..." : "Update"}
                </Button>
              </div>
            </Form>
          </Modal.Body>
        </Modal>
      </div>
    </AdminLayout>
  );
};

export default RoomManagement;
