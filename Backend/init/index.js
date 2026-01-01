const mongoose = require("mongoose");
const initData = require('./data.js');
const Student = require("../models/Student.js");
const bcrypt = require("bcryptjs");
const Room = require("../models/Room.js");
const dbUrl = 'mongodb://127.0.0.1:27017/SrcHostel';
const Hostel = require("../models/hostels.js");
const HostelData = require("./hostelData.js");

main()
.then(()=>{
    console.log("connect to DB");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect(dbUrl);
}

const initDB = async ()=>{
    await Student.deleteMany({});
    // Hash passwords before inserting
    const hashedData = await Promise.all(initData.data.map(async (student) => {
        const hashedPassword = await bcrypt.hash("student@123", 10);
        return { ...student, password: hashedPassword };
    }));
    await Student.insertMany(hashedData);
    console.log("data was initalising in student");
}

initDB();

const allRoom = [
  { roomNo: "101", capacity: 2, status: "Occupied" },
  { roomNo: "102", capacity: 3, status: "Available" },
  { roomNo: "103", capacity: 1, status: "Occupied" },
  { roomNo: "104", capacity: 2, status: "Available" },
  { roomNo: "105", capacity: 4, status: "Occupied" }
];

initRoom = async ()=>{
  await Room.deleteMany({});
  await Room.insertMany(allRoom);
  console.log("data was initalising in room");
}

// initRoom();

const initHostel = async ()=>{
    await Hostel.deleteMany({});
    await Hostel.insertMany(HostelData.data);
    console.log("data was initalising in hostel");
}

initHostel();