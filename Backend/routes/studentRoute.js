
const express = require("express");
const router = express.Router();
// const upload = require("../routes/Upload"); // 👈 multer middleware import
const StudentController = require("../controllers/studentController");
const multer = require("multer");
const verifyAdmin = require("../middleware/verifyAdmin");
const {upload} = require("../cloudConfig");


router.get("/admin/students", StudentController.getStudents);
router.get("/students/:id", StudentController.getStudentById);
// DELETE student by ID
router.delete("/students/:id", StudentController.deleteStudent);
// Add new student
router.post("/newStudent",verifyAdmin ,upload.single("photo"), StudentController.newStudent);
// PUT route for update student
router.put("/students/:id", upload.single("photo"), StudentController.updateStudent);


module.exports = router;
