// import { BrowserRouter as Router, Routes, Route, Navigigate,  createBrowserRouter, RouterProvider } from "react-router-dom";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import StudentDashboard from "./pages/StudentDashboard";
import StudentAuth from "./pages/StudentAuth";
import WardenAuth from "./pages/WardenAuth";
import WardenDashboard from "./WardenPages/WardenDashboard";
import AdminAuth from "./pages/AdminAuth";
import AdminDashboard from "./pages/AdminDashboard";
import ManageStudents from "./AdminPages/ManageStudent";
import StudentDetail from "./component/StudentComponent/StudentDetails";
import StudentRegForm from "./component/StudentComponent/StudentRegForm";
import StudentEdit from "./component/StudentComponent/StudentEdit";
import ManageComplaints from "./AdminPages/ManageComplaint";
import ManageRoom from "./AdminPages/ManageRoom";
import Attendence from "./WardenPages/Attendence";
import StudentList from "./WardenPages/StudentList";
import StudentDtl from "./WardenPages/StudentDtl";
import RoomDetails from "./WardenPages/RoomDetails";
import AttendanceHistory from "./WardenPages/AttendanceHistory";
import Report from "./WardenPages/Report";
import WardenProfile from "./WardenPages/WardenProfile";
import StudentLayout from "./StudentComponent/StudentLayout";
import StudentHome from "./StudentPages/StudentHome";
import CheckAttendance from "./StudentPages/CheckAttendance";
import StudentProfile from "./StudentPages/StudentProfile";
import ManageWarden  from "./AdminPages/ManageWarden";
import ManageAttendance from "./AdminPages/ManageAttendance";
import Mess  from "./AdminPages/Mess";
import Gallary from "./AdminPages/Gallary";
import Complaints from "./StudentPages/Complaints";
import WardenComplaint from "./WardenPages/Complaints";
import Notification from "./StudentPages/Notification";
import GalleryforStud from "./StudentPages/GalleryForStu";
import HostelDetails from "./StudentPages/HostelDetails";
import About from "./pages/About";
import AddWarden from "./AdminPages/AddWarden";
import Contact from "./pages/Contact";
import WardenChangePassword from "./WardenPages/ChangeWardenPass";
import EditStudentPass from "./StudentPages/StudentEditPass";
import HostelGallery from "./pages/HostelGallery";
import ManageContact from "./AdminPages/ManageContact";
import ProtectedRoute from "./pages/ProtectedRoute";

const admin = JSON.parse(localStorage.getItem("admin"));

function App() {
  const admin = JSON.parse(localStorage.getItem("admin"));
  return (
<Router>
      <Routes>
        {/* Home Route */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/hostel/gallery" element={<HostelGallery />} />
      </Routes>

      <Routes>
        {/* Auth Route */}
        <Route path="/login/student" element={<StudentAuth/>} />
        <Route path="/login/warden" element={<WardenAuth/>} />
        <Route path="/login/admin" element={<AdminAuth/>} />
      </Routes>

      <Routes>
        {/* Dashboard */}
        <Route path="/student/dashboard" element={
          <ProtectedRoute role="student"><StudentHome /></ProtectedRoute> } />
        <Route path="/warden/dashboard" element={
          <ProtectedRoute role="warden"><WardenDashboard /></ProtectedRoute>} />
        <Route path="/admin/dashboard" element={
          <ProtectedRoute role="admin"><AdminDashboard /></ProtectedRoute>} />
      </Routes>

        <Routes>
          {/* Manage Admin */}
          <Route path="/student/register" element={<ProtectedRoute role="admin"><StudentRegForm /></ProtectedRoute>} />
          <Route path="/admin/students" element={<ProtectedRoute role="admin"><ManageStudents /></ProtectedRoute>}/>
          <Route path="/students/:id" element={<ProtectedRoute role="admin"><StudentDetail /></ProtectedRoute>}/>
          <Route path="/students/edit/:id" element={<ProtectedRoute role="admin"><StudentEdit /></ProtectedRoute>} />
          <Route path="/admin/complaints" element={<ProtectedRoute role="admin"><ManageComplaints /></ProtectedRoute>} />
          <Route path="/admin/rooms" element={<ProtectedRoute role="admin"><ManageRoom /></ProtectedRoute>} />
          <Route path="/admin/attendance" element={<ProtectedRoute role="admin"><ManageAttendance /></ProtectedRoute>}/>
          <Route path="/admin/warden" element={<ProtectedRoute role="admin"><ManageWarden /></ProtectedRoute>} />
          <Route path="/admin/mess" element={<ProtectedRoute role="admin"><Mess /></ProtectedRoute>} />
          <Route path="/admin/gallary" element={<ProtectedRoute role="admin"><Gallary /></ProtectedRoute>} />
          <Route path="/admin/add-warden" element={<ProtectedRoute role="admin"><AddWarden /></ProtectedRoute>} />
          <Route path="/admin/contact" element={<ProtectedRoute role="admin"><ManageContact /></ProtectedRoute>} />
        </Routes>

        <Routes>
           {/* Warden */}
          <Route path="/warden/attendance" element={<ProtectedRoute role="warden"><Attendence /></ProtectedRoute>} />
          <Route path="/warden/students" element={<ProtectedRoute role="warden"><StudentList /></ProtectedRoute>} />
          <Route path="/warden/students/:id" element={<ProtectedRoute role="warden"><StudentDtl /></ProtectedRoute>} />
          <Route path="/warden/rooms" element={<ProtectedRoute role="warden"><RoomDetails /></ProtectedRoute>} />
          <Route path="/warden/attendanceHistory" element={<ProtectedRoute role="warden"><AttendanceHistory /></ProtectedRoute>} />
          <Route path="/warden/report" element={<ProtectedRoute role="warden"><Report /></ProtectedRoute>} />
          <Route path="/warden/profile" element={<ProtectedRoute role="warden"><WardenProfile /></ProtectedRoute>} />
          <Route path="/warden/change-password" element={<ProtectedRoute role="warden"><WardenChangePassword /></ProtectedRoute>} />
        </Routes>

        <Routes>
          {/* Student */}
          <Route path="/student/home" element={<ProtectedRoute role="student"><StudentHome /></ProtectedRoute>} />
          <Route path="/student/attendance" element={<ProtectedRoute role="student"><CheckAttendance /></ProtectedRoute>} />
          <Route path="/student/profile" element={<ProtectedRoute role="student"><StudentProfile /></ProtectedRoute>} />
          <Route path="/student/complaints" element={<ProtectedRoute role="student"><Complaints /></ProtectedRoute>} />
          <Route path="/student/notifications" element={<ProtectedRoute role="student"><Notification /></ProtectedRoute>} />
          <Route path="/student/gallery" element={<ProtectedRoute role="student"><GalleryforStud /></ProtectedRoute>} />
          <Route path="/student/hostel-info" element={<ProtectedRoute role="student"><HostelDetails /></ProtectedRoute>} />
          <Route path="/student/edit-password" element={<ProtectedRoute role="student"><EditStudentPass /></ProtectedRoute>} />
        </Routes>
</Router>
  );
}

export default App;
