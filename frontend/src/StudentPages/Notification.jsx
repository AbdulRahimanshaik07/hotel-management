

import React, { useEffect, useState } from "react";
import { Box, Container, Typography, Paper, Button, CircularProgress, Grid, Chip } from "@mui/material";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import { motion } from "framer-motion";
import StudentLayout from "../StudentComponent/StudentLayout";

export default function StudentMess() {
  const [pdfs, setPDFs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/studentsMess")
      .then((res) => res.json())
      .then((data) => setPDFs(data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <StudentLayout>
      <Box sx={{ minHeight: "100vh", bgcolor: "#f0f2f5" }}>
        
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Box
            sx={{
              background: "linear-gradient(135deg, #42a5f5, #478ed1)",
              color: "#fff",
              py: { xs: 6, md: 10 },
              px: { xs: 3, md: 6 },
              textAlign: "center",
              position: "relative",
              borderRadius: 4,
              mx: { xs: 2, md: 4 },
              mb: 5,
              boxShadow: 3,
            }}
          >
            <Typography variant="h3" fontWeight="bold" sx={{ mb: 2 }}>
              📄 New Notifications Updates
            </Typography>
            <Typography variant="h6" sx={{ mb: 4 }}>
              Stay informed about the latest notifications. View or download PDFs here.
            </Typography>

            {/* View All PDFs Button */}
            <Button
              variant="contained"
              color="secondary"
              size="large"
              sx={{
                borderRadius: 3,
                px: 5,
                py: 1.5,
                fontWeight: "bold",
                background: "linear-gradient(45deg, #ff5722, #ff9800)",
                "&:hover": { background: "linear-gradient(45deg, #e64a19, #f57c00)" },
              }}
            >
              View All PDFs
            </Button>

            {/* Floating Notification Icon */}
            <motion.div
              animate={{ rotate: [0, 15, -15, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              style={{
                position: "absolute",
                top: -20,
                right: -20,
                background: "#ff3d00",
                borderRadius: "50%",
                padding: 16,
              }}
            >
              <NotificationsActiveIcon sx={{ color: "#fff", fontSize: 32 }} />
            </motion.div>
          </Box>
        </motion.div>

        {/* PDF List Section */}
        <Container sx={{ pb: 5 }}>
          {loading ? (
            <Box sx={{ display: "flex", justifyContent: "center", py: 10 }}>
              <CircularProgress />
            </Box>
          ) : pdfs.length === 0 ? (
            <Typography align="center" variant="h6" color="text.secondary">
              No mess menu available yet.
            </Typography>
          ) : (
            <Grid container spacing={4}>
              {pdfs.map((pdf) => (
                <Grid item xs={12} md={6} key={pdf._id}>
                  <motion.div whileHover={{ scale: 1.03 }}>
                    <Paper
                      elevation={6}
                      sx={{
                        p: 4,
                        borderRadius: 3,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        height: "100%",
                        background: "#fff",
                        borderLeft: "6px solid #1976d2",
                      }}
                    >
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="h6" fontWeight="bold">
                          {pdf.title}
                        </Typography>
                        <Chip
                          label={new Date(pdf.createdAt).toLocaleDateString()}
                          size="small"
                          color="primary"
                          sx={{ mt: 1 }}
                        />
                      </Box>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                        PDF contains new notifications. Click below to view or download.
                      </Typography>
                      <Button
                        variant="contained"
                        startIcon={<PictureAsPdfIcon />}
                        href={`http://localhost:5000/api/mess/file/${pdf.filename}`}
                        target="_blank"
                        sx={{
                          borderRadius: 3,
                          px: 4,
                          py: 1.5,
                          fontWeight: "bold",
                          background: "linear-gradient(45deg, #ff5722, #ff9800)",
                          "&:hover": { background: "linear-gradient(45deg, #e64a19, #f57c00)" },
                        }}
                      >
                        View / Download
                      </Button>
                    </Paper>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          )}
        </Container>
      </Box>
    </StudentLayout>
  );
}
