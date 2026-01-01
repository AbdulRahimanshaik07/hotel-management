
import React, { useState, useEffect } from "react";
import { Container, Card, Form, Button, Table, Spinner } from "react-bootstrap";
import AdminLayout from "../AdminComponent/AdminLayout";

export default function AdminMessPDF() {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [pdfs, setPDFs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    fetchPDFs();
  }, []);

  const fetchPDFs = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/mess");
      const data = await res.json();
      setPDFs(data);
    } catch (err) {
      console.error("Error fetching PDFs:", err);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file || !title) return alert("Enter title and select a PDF");

    const formData = new FormData();
    formData.append("pdf", file);
    formData.append("title", title);

    setLoading(true);
    try {
      await fetch("http://localhost:5000/api/mess/upload", {
        method: "POST",
        body: formData,
      });
      setTitle("");
      setFile(null);
      fetchPDFs();
    } catch (err) {
      console.error("Error uploading PDF:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this PDF?")) return;

    setDeletingId(id);
    try {
      const res = await fetch(`http://localhost:5000/api/mess/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setPDFs(pdfs.filter((pdf) => pdf._id !== id));
      } else {
        alert("Failed to delete PDF");
      }
    } catch (err) {
      console.error("Error deleting PDF:", err);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <AdminLayout>
      <Container className="mt-4">
        <Card className="p-3 shadow-sm mb-4">
          <h5>Upload Notification PDF</h5>
          <Form onSubmit={handleUpload}>
            <Form.Group className="mb-2">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Select PDF</Form.Label>
              <Form.Control
                type="file"
                accept="application/pdf"
                onChange={(e) => setFile(e.target.files[0])}
                required
              />
            </Form.Group>
            <Button type="submit" disabled={loading}>
              {loading ? "Uploading..." : "Upload"}
            </Button>
          </Form>
        </Card>

        <Card className="p-3 shadow-sm">
          <h5>Uploaded PDFs</h5>
          {pdfs.length === 0 ? (
            <p>No PDFs uploaded yet.</p>
          ) : (
            <Table striped bordered hover responsive>
              <thead className="table-dark">
                <tr>
                  <th>#</th>
                  <th>Title</th>
                  <th>Download / View</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {pdfs.map((pdf, i) => (
                  <tr key={pdf._id}>
                    <td>{i + 1}</td>
                    <td>{pdf.title}</td>
                    <td>
                      <a
                        href={pdf.fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="pdf-link"
                      >
                        View / Download
                      </a>
                    </td>
                    <td>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleDelete(pdf._id)}
                        disabled={deletingId === pdf._id}
                      >
                        {deletingId === pdf._id ? (
                          <>
                            <Spinner animation="border" size="sm" /> Deleting...
                          </>
                        ) : (
                          "Delete"
                        )}
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Card>
      </Container>
    </AdminLayout>
  );
}

