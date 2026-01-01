const Hostel = require("../models/hostels");

const hostels = [
  {
    name: "Sunrise Hostel",
    warden: "Mr. Rahman",
    capacity: 120,
    rooms: "Single/Double",
    facilities: "Mess, Wi-Fi, Gym, Common Room",
    contact: "warden@hostel.com, +91-9876543210",
    address: "Block A, Hostel Campus",
  },
  {
    name: "Moonlight Hostel",
    warden: "Mrs. Sharma",
    capacity: 90,
    rooms: "Double/Triple",
    facilities: "Mess, Laundry, Wi-Fi",
    contact: "warden@hostel2.com, +91-9876543211",
    address: "Block B, Hostel Campus",
  },
];

module.exports = {data:  hostels};