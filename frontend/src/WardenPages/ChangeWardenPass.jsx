import React, { useState } from "react";
import {
  Container,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  CircularProgress,
  Box,
} from "@mui/material";
import { motion } from "framer-motion";
import axios from "axios";
import WardenLayout from "../WardenComponent/WardenLayout";
import { useNavigate } from "react-router-dom";

export default function WardenChangePassword() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChangePassword = async () => {
    if (!oldPassword || !newPassword || !confirmPassword) {
      return setMessage("All fields are required!");
    }
    if (newPassword !== confirmPassword) {
      return setMessage("New passwords do not match!");
    }

    try {
      setLoading(true);
      const token = localStorage.getItem("wardenToken");
      const res = await axios.put(
        "http://localhost:5000/api/warden/change-password",
        { oldPassword, newPassword },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      setMessage(res.data.message || "Password updated successfully!");
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setTimeout(() => navigate("/warden/profile"), 1500);
    } catch (err) {
      setMessage(
        err.response?.data?.message || "Failed to change password. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

// const handlePasswordChange = async () => {
//   if (newPassword !== confirmPassword) {
//     alert("Passwords do not match!");
//     return;
//   }

//   const token = localStorage.getItem("wardenToken");

//   const res = await fetch("http://localhost:5000/api/warden/change-password", {
//     method: "PUT",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${token}`,
//     },
//     body: JSON.stringify({ oldPassword, newPassword }),
//   });

//   const data = await res.json();
//   alert(data.message);
// };


  return (
    <WardenLayout>
      <Container maxWidth="sm" sx={{ mt: 6 }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Card sx={{ borderRadius: "20px", boxShadow: 3, p: 2 }}>
            <CardContent>
              <Typography
                variant="h5"
                align="center"
                gutterBottom
                sx={{ fontWeight: "bold", color: "#1976d2" }}
              >
                🔒 Change Password
              </Typography>

              <TextField
                label="Old Password"
                type="password"
                fullWidth
                margin="normal"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
              <TextField
                label="New Password"
                type="password"
                fullWidth
                margin="normal"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <TextField
                label="Confirm New Password"
                type="password"
                fullWidth
                margin="normal"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />

              {message && (
                <Typography
                  align="center"
                  sx={{
                    mt: 2,
                    color: message.includes("success") ? "green" : "red",
                  }}
                >
                  {message}
                </Typography>
              )}

              <Box display="flex" justifyContent="center" mt={3}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleChangePassword}
                  disabled={loading}
                >
                  {loading ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    "Update Password"
                  )}
                </Button>
              </Box>
            </CardContent>
          </Card>
        </motion.div>
      </Container>
    </WardenLayout>
  );
}


