
import React, { useEffect, useState } from "react";
import {
  Container,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Box,
} from "@mui/material";
import { styled } from "@mui/system";
import { motion, AnimatePresence } from "framer-motion";
import WardenLayout from "../WardenComponent/WardenLayout";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import HomeIcon from "@mui/icons-material/Home";
import SchoolIcon from "@mui/icons-material/School";
import { useNavigate } from "react-router-dom"; // ✅ for navigation

// 🎨 Styled Components
const ProfileCard = styled(Card)(() => ({
  borderRadius: "20px",
  overflow: "hidden",
  boxShadow: "0 12px 28px rgba(0,0,0,0.2)",
  transition: "transform 0.3s ease",
  "&:hover": {
    transform: "translateY(-5px)",
    boxShadow: "0 16px 32px rgba(0,0,0,0.25)",
  },
}));

const CardHeader = styled(Box)(() => ({
  height: "60px",
  background: "linear-gradient(90deg, #1976d2, #42a5f5)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#fff",
  fontWeight: 700,
  fontSize: "1.3rem",
  letterSpacing: "1px",
}));

const FieldRow = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: theme.spacing(2),
  padding: "8px 12px",
  borderRadius: "8px",
  transition: "background 0.2s",
  "&:hover": { background: "rgba(25, 118, 210, 0.05)" },
}));

const LabelBox = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  gap: "8px",
  fontWeight: 600,
  color: "#1976d2",
}));

const ValueBox = styled(Typography)(() => ({
  textAlign: "right",
  fontWeight: 500,
  wordBreak: "break-word",
}));

export default function WardenProfile() {
  const [warden, setWarden] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    hostel: "",
    yearAssigned: "",
  });

  const navigate = useNavigate(); // ✅ For navigation

  const fetchProfile = async () => {
    setLoading(true);
    const token = localStorage.getItem("wardenToken");
    try {
      const res = await fetch("http://localhost:5000/api/wardenProfile", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setWarden(data);
      setFormData({
        name: data.name,
        email: data.email,
        phone: data.phone,
        hostel: data.hostel,
        yearAssigned: data.yearAssigned,
      });
    } catch (err) {
      console.error("Error fetching profile:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("wardenToken");
      const res = await fetch("http://localhost:5000/api/warden/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success) {
        setWarden(data.updatedWarden);
        setEditMode(false);
      } else {
        alert(data.message || "Failed to update profile");
      }
    } catch (err) {
      console.error("Error updating profile:", err);
    }
  };

  if (loading)
    return (
      <WardenLayout>
        <Container sx={{ textAlign: "center", py: 6 }}>
          <CircularProgress color="primary" size={50} />
        </Container>
      </WardenLayout>
    );

  const fields = [
    { label: "Full Name", value: warden.name, icon: <PersonIcon /> },
    { label: "Email", value: warden.email, icon: <EmailIcon /> },
    { label: "Phone", value: warden.phone, icon: <PhoneIcon /> },
    { label: "Hostel", value: warden.hostel, icon: <HomeIcon /> },
    { label: "Year Assigned", value: warden.yearAssigned, icon: <SchoolIcon /> },
  ];

  return (
    <WardenLayout>
      <Container maxWidth="sm" sx={{ mt: 6, mb: 6 }}>
        <ProfileCard>
          <CardHeader>🏫 Warden Profile</CardHeader>
          <CardContent>
            <AnimatePresence mode="wait">
              {editMode ? (
                <motion.div
                  key="edit"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.4 }}
                >
                  {fields.map((f) => (
                    <FieldRow key={f.label}>
                      <LabelBox>
                        {f.icon} {f.label}
                      </LabelBox>
                      <TextField
                        size="small"
                        value={
                          formData[
                            f.label === "Full Name"
                              ? "name"
                              : f.label === "Phone"
                              ? "phone"
                              : f.label === "Hostel"
                              ? "hostel"
                              : "yearAssigned"
                          ]
                        }
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            [f.label === "Full Name"
                              ? "name"
                              : f.label === "Phone"
                              ? "phone"
                              : f.label === "Hostel"
                              ? "hostel"
                              : "yearAssigned"]: e.target.value,
                          })
                        }
                        fullWidth={false}
                        sx={{ maxWidth: "60%" }}
                      />
                    </FieldRow>
                  ))}
                  <Box display="flex" justifyContent="flex-end" gap={2} mt={3}>
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={() => setEditMode(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleSave}
                    >
                      Save
                    </Button>
                  </Box>
                </motion.div>
              ) : (
                <motion.div
                  key="view"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 50 }}
                  transition={{ duration: 0.4 }}
                >
                  {fields.map((f) => (
                    <FieldRow key={f.label}>
                      <LabelBox>
                        {f.icon} {f.label}
                      </LabelBox>
                      <ValueBox>{f.value}</ValueBox>
                    </FieldRow>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* 🟢 Change Password Button */}
            <Box display="flex" justifyContent="center" mt={3}>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => navigate("/warden/change-password")}
              >
                Change Password
              </Button>
            </Box>
          </CardContent>
        </ProfileCard>
      </Container>
    </WardenLayout>
  );
}
