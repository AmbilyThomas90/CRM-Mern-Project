import express from "express";
import { register, login } from "../controllers/authController.js";
const router = express.Router();

router.post("/register", register);// Calls the register controller to create a new user, hash password, and return a JWT token
router.post("/login", login); // Calls the login controller to authenticate the user and return a JWT token

export default router;
