
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
import WardenLayout from "../WardenComponent/WardenLayout";

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
//   const [showEditModal, setShowEditModal] = useState(false);
//   const [editRoom, setEditRoom] = useState({ _id: "", roomNo: "", capacity: "" });
//   const [updating, setUpdating] = useState(false);

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

  const filteredRooms = rooms.filter((r) =>
    r.roomNo.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <WardenLayout>
      <div className="p-4">
        <h2 className="mb-4">🏠 Room Details</h2>

        <Row className="mb-3">
          <Col md={6}>
            <Form.Control
              type="text"
              placeholder="Search by Room No..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
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
      </div>
    </WardenLayout>
  );
};

export default RoomManagement;
