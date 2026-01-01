

import React, { useEffect, useState } from "react";
import { Container, Card, Row, Col, Spinner, Modal, Button } from "react-bootstrap";
import StudentLayout from "../StudentComponent/StudentLayout";

export default function StudentGallery() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/gallery");
      const data = await res.json();
      setImages(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const prevImage = () => {
    setPhotoIndex((photoIndex + images.length - 1) % images.length);
  };

  const nextImage = () => {
    setPhotoIndex((photoIndex + 1) % images.length);
  };

  if (loading)
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" />
      </Container>
    );

  return (
    <StudentLayout>
      <Container className="mt-4">
        <h3 className="mb-4 text-center">Gallery</h3>

        {images.length === 0 ? (
          <p className="text-center">No images available.</p>
        ) : (
          <Row>
            {images.map((img, index) => (
              <Col xs={6} sm={4} md={3} key={img._id} className="mb-3">
                <Card
                  className="shadow-sm"
                  style={{
                    cursor: "pointer",
                    transition: "transform 0.2s",
                    borderRadius: "10px",
                    overflow: "hidden",
                  }}
                  onClick={() => {
                    setPhotoIndex(index);
                    setModalOpen(true);
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                >
                  <Card.Img
                    variant="top"
                    src={`http://localhost:5000/uploads/gallery/${img.filename}`}
                    style={{
                      height: "120px",
                      objectFit: "cover",
                      width: "100%",
                    }}
                  />
                </Card>
              </Col>
            ))}
          </Row>
        )}

        {/* Fullscreen Modal */}
        <Modal
          show={modalOpen}
          onHide={() => setModalOpen(false)}
          size="xl"
          centered
          fullscreen="true"
        >
          {/* Close Button (Top-Right Corner) */}
          <Button
            variant="light"
            onClick={() => setModalOpen(false)}
            style={{
              position: "absolute",
              top: "15px",
              right: "15px",
              zIndex: 1051,
              borderRadius: "50%",
              width: "40px",
              height: "40px",
              fontWeight: "bold",
              fontSize: "20px",
              lineHeight: "1",
            }}
          >
            ×
          </Button>

          <Modal.Body
            className="p-0 d-flex justify-content-center align-items-center"
            style={{ background: "#000" }}
          >
            {images.length > 0 && (
              <img
                src={`http://localhost:5000/uploads/gallery/${images[photoIndex].filename}`}
                alt="gallery"
                style={{ maxWidth: "100%", maxHeight: "100vh", objectFit: "contain" }}
              />
            )}
          </Modal.Body>

          <Modal.Footer
            className="justify-content-between"
            style={{ background: "#000" }}
          >
            <Button variant="light" onClick={prevImage}>
              Previous
            </Button>
            <a
              href={`http://localhost:5000/uploads/gallery/${images[photoIndex].filename}`}
              download
              className="btn btn-success"
            >
              Download
            </a>
            <Button variant="light" onClick={nextImage}>
              Next
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </StudentLayout>
  );
}
