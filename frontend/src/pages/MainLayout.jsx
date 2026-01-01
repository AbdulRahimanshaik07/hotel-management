// import React from "react";
// import { Container } from "react-bootstrap";
// import "bootstrap/dist/css/bootstrap.min.css";
// import CustomNavbar from "./Navbar";

// const MainLayout = ({ children }) => {
//   return (
//     <div className="main-layout">
//       {/* Navbar */}
//       <CustomNavbar />

//       {/* Page Content */}
//       <main>{children}</main>

//       {/* Footer */}
//       <footer className="bg-dark text-light py-4 mt-5">
//         <Container>
//           <p className="text-center mb-1">
//             © {new Date().getFullYear()} Hostel Management System. All Rights Reserved.
//             <div>
//               <small>Developed By ❤️ Mohd Rahman</small>
//             </div>
//           </p>
//         </Container>
//       </footer>
//     </div>
//   );
// };

// export default MainLayout;


import React from "react";
import { Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import CustomNavbar from "./Navbar";

const MainLayout = ({ children }) => {
  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Navbar */}
      <CustomNavbar />

      {/* Page Content */}
      <main className="flex-fill">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-dark text-light py-4 mt-auto">
        <Container>
          <p className="text-center mb-1">
            © {new Date().getFullYear()} Hostel Management System. All Rights Reserved.
          </p>
          <div className="text-center">
            <small>Developed By ❤️ Mohd Rahman</small>
          </div>
        </Container>
      </footer>
    </div>
  );
};

export default MainLayout;
