
const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.student ? decoded.student : decoded;
    next();
  } catch (err) {
    console.error("JWT verify error:", err.message);
    res.status(403).json({ msg: "Invalid or expired token" });
  }
};

const JWT_SECRET = "mySecretKey"; // Must match the key you used when signing

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: "No token provided" });

  // ✅ Split "Bearer <token>"
  const token = authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Token malformed" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    console.error("JWT verify error:", err.message);
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};


module.exports = verifyToken;
