
import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  IconButton,
  Snackbar,
  Alert,
  CircularProgress,
} from "@mui/material";
import { motion } from "framer-motion";
import {
  Room,
  Phone,
  Email,
  Facebook,
  Instagram,
  Twitter,
} from "@mui/icons-material";
import Layout from "../pages/MainLayout";
import axios from "axios";

export default function ContactUs() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await axios.post("http://localhost:5000/api/contact", form);
      if (res.data.success) {
        setSuccess(true);
        setForm({ name: "", email: "", message: "" });
      } else {
        setError(res.data.message || "Something went wrong!");
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Server error. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <style>{`
        :root {
          --red: #d32f2f;
          --black: #0d0d0d;
          --white: #fff;
          --dark-gray: #1a1a1a;
        }

        .hero-section {
          position: relative;
          background: radial-gradient(circle at top left, #fff, #ffe5e5 40%, #fff);
          overflow: hidden;
          text-align: center;
          padding: 120px 0;
        }

        .hero-title {
          color: var(--red);
          font-weight: 800;
          letter-spacing: 1px;
        }

        .hero-sub {
          color: var(--black);
          max-width: 700px;
          margin: 0 auto;
        }

        .contact-container {
          background: var(--black);
          padding: 100px 0;
          color: var(--white);
        }

        .contact-box {
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: 20px;
          backdrop-filter: blur(10px);
          transition: all 0.4s ease;
        }

        .contact-box:hover {
          transform: translateY(-6px);
          box-shadow: 0 0 25px rgba(211, 47, 47, 0.25);
        }

        .contact-title {
          color: var(--red);
          font-weight: 700;
        }

        .contact-info p, .contact-info Typography {
          color: #ccc;
        }

        .form-field .MuiOutlinedInput-root {
          background: rgba(255,255,255,0.1);
          color: var(--white);
        }

        .form-field label {
          color: #bbb;
        }

        .form-field .MuiOutlinedInput-root fieldset {
          border-color: rgba(255,255,255,0.2);
        }

        .form-field .MuiOutlinedInput-root:hover fieldset {
          border-color: var(--red);
        }

        .submit-btn {
          background: var(--red);
          color: var(--white);
          border-radius: 30px;
          font-weight: 700;
          padding: 12px 0;
          box-shadow: 0 8px 25px rgba(211,47,47,0.3);
          transition: all 0.3s ease;
        }

        .submit-btn:hover {
          background: #b71c1c;
          transform: translateY(-3px);
          box-shadow: 0 10px 30px rgba(211,47,47,0.4);
        }

        @media (max-width: 768px) {
          .hero-section {
            padding: 80px 20px;
          }
          .contact-container {
            padding: 60px 20px;
          }
        }
      `}</style>

      {/* 🔺 HERO SECTION */}
      <section className="hero-section">
        <Container>
          <Typography variant="h3" className="hero-title" gutterBottom>
            Contact Us
          </Typography>
          <Typography variant="h6" className="hero-sub">
            Have questions or feedback? We’d love to hear from you!
          </Typography>
        </Container>
      </section>

      {/* 🖤 CONTACT SECTION */}
      <section className="contact-container">
        <Container
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: 5,
            justifyContent: "center",
            alignItems: "stretch",
          }}
        >
          {/* LEFT SIDE - Contact Info */}
          <Paper
            elevation={0}
            className="contact-box"
            sx={{
              flex: { xs: "1 1 100%", md: "1 1 45%" },
              p: 4,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
            component={motion.div}
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Typography variant="h5" className="contact-title" gutterBottom>
              Contact Information
            </Typography>
            <Typography sx={{ mb: 3, color: "#bbb" }}>
              Reach out to us anytime — we’re here to help!
            </Typography>

            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <Room sx={{ mr: 2, color:"#bbb" }} />
              <Typography sx={{ color: "#bbb" }}>
                Shri Ram Group of Colleges Hostel, Muzaffarnagar, UP
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <Phone sx={{ mr: 2, color: "#bbb" }} />
              <Typography sx={{ color: "#bbb" }}>9876543210</Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
              <Email sx={{ mr: 2, color: "#bbb" }} />
              <Typography sx={{ color: "#bbb" }}>hostel@srh.com</Typography>
            </Box>

            <Typography
              variant="h6"
              sx={{ color: "#bbb", fontWeight: "700", mb: 1 }}
            >
              Follow Us
            </Typography>
            <Box>
              <IconButton sx={{ color: "#bbb" }}>
                <Facebook />
              </IconButton>
              <IconButton sx={{ color: "#bbb" }}>
                <Instagram />
              </IconButton>
              <IconButton sx={{ color: "#bbb" }}>
                <Twitter />
              </IconButton>
            </Box>
          </Paper>

          {/* RIGHT SIDE - Contact Form */}
          <Paper
            elevation={0}
            className="contact-box"
            sx={{
              flex: { xs: "1 1 100%", md: "1 1 45%" },
              p: 4,
            }}
            component={motion.div}
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Typography variant="h5" className="contact-title" gutterBottom>
              Send Us a Message
            </Typography>
            <Typography sx={{ mb: 3, color: "#bbb" }}>
              Fill the form below — we’ll get back to you shortly.
            </Typography>

            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Name"
                name="name"
                value={form.name}
                onChange={handleChange}
                margin="normal"
                required
                className="form-field"
              />
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                margin="normal"
                required
                className="form-field"
              />
              <TextField
                fullWidth
                label="Message"
                name="message"
                multiline
                rows={4}
                value={form.message}
                onChange={handleChange}
                margin="normal"
                required
                className="form-field"
              />

              {error && (
                <Typography color="error" sx={{ mt: 1 }}>
                  ⚠️ {error}
                </Typography>
              )}

              <Button
                fullWidth
                variant="contained"
                type="submit"
                className="submit-btn"
                disabled={loading}
                sx={{ mt: 3 }}
              >
                {loading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  "Send Message"
                )}
              </Button>
            </form>
          </Paper>
        </Container>
      </section>

      {/* ✅ SUCCESS MESSAGE */}
      <Snackbar
        open={success}
        autoHideDuration={3000}
        onClose={() => setSuccess(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity="success" variant="filled">
          ✅ Your message has been sent successfully!
        </Alert>
      </Snackbar>
    </Layout>
  );
}
