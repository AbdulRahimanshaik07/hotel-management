// import React, { useEffect, useState } from "react";
// import {
//   Container,
//   Typography,
//   Paper,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   CircularProgress,
// } from "@mui/material";
// import AdminLayout from "../AdminComponent/AdminLayout";
// import axios from "axios";

// export default function AdminMessages() {
//   const [messages, setMessages] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const fetchMessages = async () => {
//     setLoading(true);
//     try {
//       const res = await axios.get("http://localhost:5000/api/contact");
//       if (res.data.success) setMessages(res.data.data);
//     } catch (error) {
//       console.error("Error fetching messages:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchMessages();
//   }, []);

//   return (
//     <AdminLayout>
//       <Container sx={{ mt: 6, mb: 6 }}>
//         <Typography variant="h4" fontWeight="bold" gutterBottom>
//           Contact Messages
//         </Typography>

//         {loading ? (
//           <CircularProgress />
//         ) : messages.length === 0 ? (
//           <Typography>No messages found.</Typography>
//         ) : (
//           <TableContainer component={Paper} sx={{ mt: 2 }}>
//             <Table>
//               <TableHead>
//                 <TableRow>
//                   <TableCell>Name</TableCell>
//                   <TableCell>Email</TableCell>
//                   <TableCell>Message</TableCell>
//                   <TableCell>Date</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {messages.map((msg) => (
//                   <TableRow key={msg._id}>
//                     <TableCell>{msg.name}</TableCell>
//                     <TableCell>{msg.email}</TableCell>
//                     <TableCell>{msg.message}</TableCell>
//                     <TableCell>
//                       {new Date(msg.createdAt).toLocaleString()}
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </TableContainer>
//         )}
//       </Container>
//     </AdminLayout>
//   );
// }


import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
  IconButton,
  Tooltip,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import AdminLayout from "../AdminComponent/AdminLayout";
import axios from "axios";

export default function AdminMessages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:5000/api/contact");
      if (res.data.success) setMessages(res.data.data);
    } catch (error) {
      console.error("Error fetching messages:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleDelete = (id) => {
    setDeleteId(id);
    setConfirmOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/contact/${deleteId}`);
      setMessages(messages.filter((msg) => msg._id !== deleteId));
      setConfirmOpen(false);
      setDeleteId(null);
    } catch (error) {
      console.error("Error deleting message:", error);
      setConfirmOpen(false);
      setDeleteId(null);
    }
  };

  return (
    <AdminLayout>
      <Container sx={{ mt: 6, mb: 6 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Contact Messages
        </Typography>

        {loading ? (
          <Box textAlign="center" mt={4}>
            <CircularProgress />
          </Box>
        ) : messages.length === 0 ? (
          <Typography>No messages found.</Typography>
        ) : (
          <TableContainer component={Paper} sx={{ mt: 2, borderRadius: 3 }}>
            <Table>
              <TableHead sx={{ background: "#1976d2" }}>
                <TableRow>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>Name</TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>Email</TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>Message</TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>Date</TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {messages.map((msg) => (
                  <TableRow key={msg._id} hover>
                    <TableCell>{msg.name}</TableCell>
                    <TableCell>{msg.email}</TableCell>
                    <TableCell>{msg.message}</TableCell>
                    <TableCell>{new Date(msg.createdAt).toLocaleString()}</TableCell>
                    <TableCell>
                      <Tooltip title="Delete Message">
                        <IconButton
                          color="error"
                          onClick={() => handleDelete(msg._id)}
                        >
                          <Delete />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        {/* Delete Confirmation Dialog */}
        <Dialog
          open={confirmOpen}
          onClose={() => setConfirmOpen(false)}
        >
          <DialogTitle>Confirm Delete</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete this message? This action cannot be undone.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setConfirmOpen(false)}>Cancel</Button>
            <Button onClick={confirmDelete} color="error">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </AdminLayout>
  );
}
