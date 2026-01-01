
import React, { useState, useEffect } from "react";
import StudentLayout from "../StudentComponent/StudentLayout";

export default function StudentComplaintPage() {
  const storedStudent = JSON.parse(localStorage.getItem("student")) || {};
  const token = localStorage.getItem("studentToken");

  const [form, setForm] = useState({
    studentName: storedStudent.name || "",
    title: "",
    description: "",
    category: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [complaints, setComplaints] = useState([]);
  const [loadingComplaints, setLoadingComplaints] = useState(false);

  // 🧩 Validation
  const validate = () => {
    const e = {};
    if (!form.studentName || form.studentName.trim().length < 3)
      e.studentName = "Name must be at least 3 characters";
    if (!form.title || form.title.trim().length < 6)
      e.title = "Title must be at least 6 characters";
    if (!form.description || form.description.trim().length < 10)
      e.description = "Description must be at least 10 characters";
    if (!form.category) e.category = "Please select a category";
    return e;
  };

  // 🧩 Input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // 🧩 Submit complaint
  const handleSubmit = async (e) => {
    e.preventDefault();
    const eobj = validate();
    setErrors(eobj);
    if (Object.keys(eobj).length) return;

    setSubmitting(true);
    setMessage("");

    try {
      const res = await fetch("http://localhost:5000/api/student/complaint", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          studentId: storedStudent._id,
          studentName: form.studentName,
          title: form.title,
          description: form.description,
          category: form.category,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.msg || "Submission failed");

      setMessage("✅ Complaint submitted successfully!");
      setForm({ studentName: storedStudent.name || "", title: "", description: "", category: "" });
      fetchComplaints(); // refresh
    } catch (err) {
      console.error(err);
      setMessage(err.message || "Server error");
    } finally {
      setSubmitting(false);
      setTimeout(() => setMessage(""), 4000);
    }
  };

  // 🧩 Fetch complaints
  const fetchComplaints = async () => {
    setLoadingComplaints(true);
    try {
      const res = await fetch("http://localhost:5000/api/student/my-complaints", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.msg || "Unable to fetch complaints");
      setComplaints(data);
    } catch (err) {
      console.error(err);
      setMessage("⚠️ Failed to load complaints");
    } finally {
      setLoadingComplaints(false);
    }
  };

  // 🗑️ Delete complaint
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this complaint?")) return;
    try {
      const res = await fetch(`http://localhost:5000/api/student/delete/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.msg || "Failed to delete");
      setMessage("🗑️ Complaint deleted successfully");
      fetchComplaints(); // refresh
    } catch (err) {
      console.error(err);
      setMessage("❌ Error deleting complaint");
    } finally {
      setTimeout(() => setMessage(""), 4000);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  return (
    <StudentLayout>
      <div className="bg-light min-vh-100 py-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-md-10 col-lg-8">
              <div className="card shadow-sm mb-4">
                <div className="card-body p-4 p-md-5">
                  <h3 className="mb-3 text-center">Submit a Complaint</h3>
                  {message && (
                    <div className="alert alert-info small py-2 text-center">{message}</div>
                  )}

                  {/* Complaint Form */}
                  <form onSubmit={handleSubmit} noValidate>
                    <div className="mb-3">
                      <label className="form-label">Student Name</label>
                      <input
                        name="studentName"
                        value={form.studentName}
                        onChange={handleChange}
                        className={`form-control ${errors.studentName ? "is-invalid" : ""}`}
                        placeholder="Enter your name"
                      />
                      {errors.studentName && (
                        <div className="invalid-feedback">{errors.studentName}</div>
                      )}
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Complaint Title</label>
                      <input
                        name="title"
                        value={form.title}
                        onChange={handleChange}
                        className={`form-control ${errors.title ? "is-invalid" : ""}`}
                        placeholder="e.g. Water leaking in Hostel-3 Third Floor"
                      />
                      {errors.title && <div className="invalid-feedback">{errors.title}</div>}
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Description</label>
                      <textarea
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        rows="4"
                        className={`form-control ${errors.description ? "is-invalid" : ""}`}
                        placeholder="Describe the issue in detail..."
                      />
                      {errors.description && (
                        <div className="invalid-feedback">{errors.description}</div>
                      )}
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Category</label>
                      <select
                        name="category"
                        value={form.category}
                        onChange={handleChange}
                        className={`form-select ${errors.category ? "is-invalid" : ""}`}
                      >
                        <option value="">Select Category</option>
                        <option>Maintenance</option>
                        <option>Cleanliness</option>
                        <option>Mess</option>
                        <option>Electricity</option>
                        <option>Water Supply</option>
                        <option>Other</option>
                      </select>
                      {errors.category && (
                        <div className="invalid-feedback">{errors.category}</div>
                      )}
                    </div>

                    <div className="d-flex justify-content-end gap-2">
                      <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={() =>
                          setForm({
                            studentName: storedStudent.name || "",
                            title: "",
                            description: "",
                            category: "",
                          })
                        }
                      >
                        Reset
                      </button>
                      <button type="submit" className="btn btn-primary" disabled={submitting}>
                        {submitting ? "Submitting..." : "Submit Complaint"}
                      </button>
                    </div>
                  </form>
                </div>
              </div>

              {/* Complaint List */}
              <div className="card shadow-sm">
                <div className="card-body">
                  <h4 className="mb-3">📋 My Complaints</h4>
                  {loadingComplaints ? (
                    <p>Loading your complaints...</p>
                  ) : complaints.length === 0 ? (
                    <p className="text-muted">No complaints submitted yet.</p>
                  ) : (
                    <ul className="list-group">
                      {complaints.map((c) => (
                        <li
                          key={c._id}
                          className="list-group-item d-flex justify-content-between align-items-start"
                        >
                          <div>
                            <strong>{c.title}</strong>
                            <p className="mb-1 small text-muted">{c.description}</p>
                            <span className="badge bg-secondary me-2">{c.category}</span>
                            <span
                              className={`badge ${
                                c.status === "Resolved"
                                  ? "bg-success"
                                  : "bg-warning text-dark"
                              }`}
                            >
                              {c.status}
                            </span>
                          </div>
                          <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => handleDelete(c._id)}
                          >
                            🗑️ Delete
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </StudentLayout>
  );
}
