
const Student = require("../models/Student.js");
const upload = require("../routes/Upload"); 
const express = require("express");
const Room = require("../models/Room.js");
const bcrypt = require("bcryptjs");

const router = express.Router();



// Add new student
module.exports.newStudent =  async (req, res) => {
  try {
    const {
      studentName,
      fatherName,
      motherName,
      studentMobile,
      fatherMobile,
      email,
      studentId,
      course,
      session,
      year,
      room,
      password,
    } = req.body;

    // room validation
    if (!room) {
      return res.status(400).json({ message: "Room is required" });
    }

    // check room capacity
    const foundRoom = await Room.findOne({ roomNo: room });
    if (!foundRoom) {
      return res.status(400).json({ message: "Room not found" });
    }
    if (foundRoom.occupied >= foundRoom.capacity) {
      return res.status(400).json({ message: "Room is already full" });
    }

      // ✅ Hash password (use default if not provided)
      const hashedPassword = await bcrypt.hash(password || "student@123", 10);

    const newStudent = new Student({
      studentName,
      fatherName,
      motherName,
      studentMobile,
      fatherMobile,
      email,
      studentId,
      course,
      session,
      year,
      room,
      password: hashedPassword, // ✅ store hashed password
      photo: req.file ? req.file.path : null,

    });

    await newStudent.save();

    // increment occupied count in room
    foundRoom.occupied += 1;
    await foundRoom.save();

    res.status(201).json({ message: "Student registered successfully", student: newStudent });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

// Get Students
module.exports.getStudents = async (req, res) => {
  try {
    const students = await Student.find()
    res.json(students);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// getStudentById
module.exports.getStudentById =  async(req, res)=>{
  const {id} = req.params;
  try{
    const StudentDetails = await Student.findById(id);
    res.send(StudentDetails);
  } catch(error){
    res.status(500).json({ error: error.message });
  }
};



// PUT /api/students/:id
exports.updateStudent = async (req, res) => {
  try {
    const studentId = req.params.id;
    const { room } = req.body;

    // Purana student fetch karo
    const student = await Student.findById(studentId);
    if (!student) return res.status(404).json({ message: "Student not found" });

    // Agar room change ho raha hai to hi capacity check karna hai
    if (room && room !== student.room) {
      const foundRoom = await Room.findOne({ roomNo: room });
      if (!foundRoom) {
        return res.status(404).json({ message: "Room not found" });
      }

      // Room capacity check with actual students count
      const studentCount = await Student.countDocuments({ room });
      if (studentCount >= foundRoom.capacity) {
        return res.status(400).json({ message: "Room is already full" });
      }
    }

    // Update data
    Object.assign(student, req.body);
    if (req.file) {
      student.photo = req.file.path;
    }

    await student.save();

    res.json({ message: "Student updated successfully", student });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


//Destroy Student
module.exports.deleteStudent  = async (req, res) => {
  try {
    const { id } = req.params;

    const student = await Student.findById(id);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    await Student.findByIdAndDelete(id);

    res.json({ message: "Student deleted successfully" });
    console.log("student delted");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};












