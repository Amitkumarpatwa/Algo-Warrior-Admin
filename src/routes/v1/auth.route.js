const express = require("express");
const { login, getAdmins, addAdmin, removeAdmin } = require("../../controller/auth.controller");
const { verifyToken } = require("../../utils/auth");

const authRouter = express.Router();

authRouter.post("/login", login);

// Protected routes
authRouter.get("/", verifyToken, getAdmins);
authRouter.post("/", verifyToken, addAdmin);
authRouter.delete("/:email", verifyToken, removeAdmin);

module.exports = authRouter;
