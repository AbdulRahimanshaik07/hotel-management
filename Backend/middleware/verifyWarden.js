
// const jwt = require("jsonwebtoken");

// const verifyWarden = (req, res, next) => {
//   try {
//     const authHeader = req.headers.authorization;
//     if (!authHeader) return res.status(401).json({ message: "No token provided" });

//     const token = authHeader.split(" ")[1];
//     if (!token) return res.status(401).json({ message: "Invalid token format" });

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.warden = decoded; // contains id, yearAssigned, etc.
//     next();
//   } catch (err) {
//     console.error("JWT verify error:", err.message);
//     res.status(401).json({ message: "Invalid or expired token" });
//   }
// };

// module.exports = verifyWarden;


const jwt = require("jsonwebtoken");

const verifyWarden = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader)
      return res.status(401).json({ message: "No token provided" });

    const token = authHeader.split(" ")[1];
    if (!token)
      return res.status(401).json({ message: "Invalid token format" });

    // 🔍 Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // ✅ Token ke andar role hona chahiye (warden)
    if (decoded.role !== "warden")
      return res.status(403).json({ message: "Unauthorized access" });

    req.warden = decoded; // { id, role, yearAssigned, hostel }
    next();
  } catch (err) {
    console.error("JWT verify error:", err.message);
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = verifyWarden;
