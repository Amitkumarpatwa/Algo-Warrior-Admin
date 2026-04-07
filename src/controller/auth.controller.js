const Admin = require("../models/admin.model");
const { generateToken } = require("../utils/auth");
const { ADMIN_EMAIL } = require("../config/server.config");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Find admin
    const admin = await Admin.findOne({ email: email.toLowerCase() });
    if (!admin) {
      return res.status(401).json({ success: false, message: "Invalid email or password." });
    }

    // Check pass
    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Invalid email or password." });
    }

    // Generate Token
    const token = generateToken(admin);

    res.status(200).json({
      success: true,
      data: {
        admin,
        token
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error during login." });
  }
};

const getAdmins = async (req, res) => {
  try {
    const admins = await Admin.find({});
    res.status(200).json({ success: true, data: admins });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error fetching admins." });
  }
};

const addAdmin = async (req, res) => {
  try {
    const { email, password, name } = req.body;
    
    // Check if exists
    const existing = await Admin.findOne({ email: email.toLowerCase() });
    if (existing) {
       return res.status(400).json({ success: false, message: "An admin with this email already exists." });
    }

    const admin = new Admin({ email, password, name });
    await admin.save();
    
    res.status(201).json({ success: true, data: admin });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error adding admin." });
  }
};

const removeAdmin = async (req, res) => {
  try {
    const { email } = req.params;
    const targetEmail = email.toLowerCase();
    const defaultEmail = (ADMIN_EMAIL || "admin@example.com").toLowerCase();

    // Prevent deletion of default admin
    if (targetEmail === defaultEmail) {
      return res.status(403).json({ success: false, message: "Cannot remove the default admin." });
    }
    
    // Check if it's the currently logged in trying to delete themselves
    if (req.admin && req.admin.email === targetEmail) {
      return res.status(400).json({ success: false, message: "Cannot remove yourself." });
    }

    const admin = await Admin.findOneAndDelete({ email: targetEmail });
    if (!admin) {
      return res.status(404).json({ success: false, message: "Admin not found." });
    }

    res.status(200).json({ success: true, message: "Admin removed successfully." });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error removing admin." });
  }
};

module.exports = {
  login,
  getAdmins,
  addAdmin,
  removeAdmin
};
