const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "codeadmin_super_secret_2026";
const JWT_EXPIRES_IN = "8h";

// Generate Token
const generateToken = (admin) => {
  return jwt.sign(
    { id: admin._id, email: admin.email, role: admin.role, name: admin.name },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );
};

// Middleware to verify token for protected routes
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ success: false, message: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.admin = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ success: false, message: "Invalid or expired token." });
  }
};

module.exports = {
  generateToken,
  verifyToken
};
