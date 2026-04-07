const Admin = require("../models/admin.model");
const { ADMIN_EMAIL, ADMIN_PASSWORD, ADMIN_NAME } = require("../config/server.config");
const logger = require("../config/logger.config.js");

const seedAdmin = async () => {
  try {
    const defaultEmail = ADMIN_EMAIL || "admin@example.com";
    const defaultPassword = ADMIN_PASSWORD || "admin";
    const defaultName = ADMIN_NAME || "Default Admin";

    const existingAdmin = await Admin.findOne({ email: defaultEmail.toLowerCase() });
    
    if (!existingAdmin) {
      console.log(`Admin ${defaultEmail} not found in database. Seeding now...`);
      
      const admin = new Admin({
        email: defaultEmail,
        password: defaultPassword,
        name: defaultName,
        role: "admin"
      });
      
      await admin.save();
      console.log(`Default admin seeded: ${defaultEmail}`);
    } else {
      // Admin already exists, do nothing
    }
  } catch (error) {
    logger.error(`Error seeding default admin: ${error.message}`);
  }
};

module.exports = seedAdmin;
