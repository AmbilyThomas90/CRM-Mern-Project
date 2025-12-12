import User from "../models/User.js";  // Mongoose User model
import bcrypt from "bcryptjs";         // Library for hashing passwords
import jwt from "jsonwebtoken";        // Library for generating JWT tokens

/**
 * REGISTER USER
 * Handles user registration
 */
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Basic validation: all fields required
    if (!name || !email || !password)
      return res.status(400).json({ msg: "Please enter all fields" });

    // Check if a user with the same email already exists
    const existing = await User.findOne({ email });
    if (existing)
      return res.status(400).json({ msg: "User already exists" });

    // Generate salt for password hashing
    const salt = await bcrypt.genSalt(10);

    // Hash the password with the generated salt
    const hash = await bcrypt.hash(password, salt);

    // Create a new user with hashed password
    const newUser = new User({ name, email, password: hash });

    // Save the new user to the database
    await newUser.save();

    // Generate JWT token valid for 7 days
    const token = jwt.sign(
      { id: newUser._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // Respond with token and user info (excluding password)
    res.status(201).json({
      token,
      user: { id: newUser._id, name: newUser.name, email: newUser.email }
    });

  } catch (err) {
    // Handle server errors
    res.status(500).json({ error: err.message });
  }
};

/**
 * LOGIN USER
 * Handles user login
 */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Basic validation: all fields required
    if (!email || !password)
      return res.status(400).json({ msg: "Please enter all fields" });

    // Find user by email
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ msg: "User does not exist" });

    // Compare provided password with hashed password in DB
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ msg: "Invalid credentials" });

    // Generate JWT token valid for 7 days
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // Respond with token and user info
    res.json({
      token,
      user: { id: user._id, name: user.name, email: user.email }
    });

  } catch (err) {
    // Handle server errors
    res.status(500).json({ error: err.message });
  }
};
