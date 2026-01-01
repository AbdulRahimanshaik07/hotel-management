// const jwt = require("jsonwebtoken");
// const Student = require("../models/Student");

// const verifyToken = async (req, res, next) => {
//   let token;

//   if (
//     req.headers.authorization &&
//     req.headers.authorization.startsWith("Bearer")
//   ) {
//     token = req.headers.authorization.split(" ")[1];
//   }

//   if (!token) {
//     return res.status(401).json({ message: "Token missing" });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET || "secretkey");
    
//     // ✅ Fetch student and attach to request
//     req.student = await Student.findById(decoded.id).select("-password");
    
//     // Debug
//     console.log("Verified student:", req.student);

//     next();
//   } catch (err) {
//     return res.status(401).json({ message: "Invalid or expired token" });
//   }
// };

// module.exports = verifyToken;

const jwt = require("jsonwebtoken");
const Student = require("../models/Student");

const verifyToken = async (req, res, next) => {
  let token;

  // Get token from header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({ message: "Token missing" });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secretkey");

    // ✅ Fetch full student from DB
    const student = await Student.findById(decoded.id).select("-password");

    if (!student) {
      return res.status(401).json({ message: "Student not found" });
    }

    req.student = student; // attach full student object
    // console.log("Logged in student:", req.student); // debug
    next();
  } catch (err) {
    console.error(err);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = verifyToken;
