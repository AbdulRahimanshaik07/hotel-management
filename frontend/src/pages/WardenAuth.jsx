

import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  FormControlLabel,
  Checkbox,
  CircularProgress,
  Link,
} from "@mui/material";
import { motion } from "framer-motion";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function WardenLogin() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  // ✅ Load saved email/password if "Remember Me" was checked
  useEffect(() => {
    const saved = localStorage.getItem("wardenRememberMe");
    if (saved) {
      const { email, password } = JSON.parse(saved);
      setFormData({ email, password });
      setRememberMe(true);
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRememberMeChange = (e) => {
    setRememberMe(e.target.checked);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:5000/api/warden/login",
        formData
      );

      localStorage.setItem("wardenToken", res.data.token || "demo-token");
      localStorage.setItem("wardenData", JSON.stringify(res.data.warden));

      // ✅ Save or remove credentials based on Remember Me
      if (rememberMe) {
        localStorage.setItem(
          "wardenRememberMe",
          JSON.stringify({ email: formData.email, password: formData.password })
        );
      } else {
        localStorage.removeItem("wardenRememberMe");
      }

      navigate("/warden/dashboard");
    } catch (err) {
      console.error("Login error:", err);
      setError(err.response?.data?.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };


  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)",
        padding: 2,
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{ width: "100%", maxWidth: 400 }}
      >
        <Paper elevation={6} sx={{ p: 4, borderRadius: 3 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              mb: 2,
            }}
          >
            <LockOutlinedIcon sx={{ fontSize: 40, color: "#1e3c72", mr: 1 }} />
            <Typography variant="h5" fontWeight="bold">
              Warden Login
            </Typography>
          </Box>

          <form onSubmit={handleSubmit}>
            <TextField
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            />

            <FormControlLabel
              control={
                <Checkbox
                  color="primary"
                  checked={rememberMe}
                  onChange={handleRememberMeChange}
                />
              }
              label="Remember me"
            />

            {error && (
              <Typography
                color="error"
                variant="body2"
                sx={{ mt: 1, textAlign: "center" }}
              >
                {error}
              </Typography>
            )}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading}
              sx={{
                mt: 2,
                py: 1.2,
                background: "linear-gradient(90deg, #1e3c72 0%, #2a5298 100%)",
                fontWeight: "bold",
              }}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : "Login"}
            </Button>
          </form>
        </Paper>

        <Typography
          variant="body2"
          align="center"
          sx={{ mt: 3, color: "#fff", opacity: 0.8 }}
        >
          © {new Date().getFullYear()} Hostel Management System
        </Typography>
      </motion.div>
    </Box>
  );
}
