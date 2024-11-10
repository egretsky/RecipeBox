import { Router, Request, Response } from 'express';
import { User } from '../models/user.js';  // Import the User model
import jwt from 'jsonwebtoken';  // Import the JSON Web Token library
import bcrypt from 'bcrypt';  // Import the bcrypt library for password hashing

// Login function to authenticate a user
export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  
  // Find the user in the database by username
  const user = await User.findOne({ where: { username } });

  // If user is not found, send an authentication failed response
  if (!user) {
    return res.status(401).json({ message: 'Authentication failed' });
  }

  // Compare the provided password with the stored hashed password
  const passwordIsValid = await bcrypt.compare(password, user.password);

  // If password is invalid, send an authentication failed response
  if (!passwordIsValid) {
    return res.status(401).json({ message: 'Authentication failed' });
  }

  // Get the secret key from environment variables
  const secretKey = process.env.JWT_SECRET_KEY || '';

  // Generate a JWT token for the authenticated user
  const token = jwt.sign({ username }, secretKey);
  return res.json({ token });  // Send the token as a JSON response
};

// Signup function to register a new user
export const signup = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;
  
  // Check if the user already exists
  const existingUser = await User.findOne({ where: { username } });
  if (existingUser) {
    return res.status(409).json({ message: 'User already exists' });
  }

  // Hash the password before storing it
  // const hashedPassword = await bcrypt.hash(password, 10);

  // Create a new user in the database
  const newUser = await User.create({username, email, password });

  // Generate a JWT token for the newly created user
  const secretKey = process.env.JWT_SECRET_KEY || '';
  const token = jwt.sign({ username: newUser.username }, secretKey, { expiresIn: '3h' });
  return res.status(201).json({ token });  // Send the token as a JSON response
};

// Create a new router instance
const router = Router();

// POST /login - Login a user
router.post('/login', login);  // Define the login route

// POST /signup - Sign up a new user
router.post('/signup', signup);  // Define the signup route

export default router;  // Export the router instance
