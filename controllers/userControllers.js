import User from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv'

dotenv.config()


// Function to handle user registration
export function postUsers(req, res) {
  const user = req.body; // Extract user data from request body
  const password = req.body.password;

  // Hash the password using bcrypt with 10 salt rounds
  bcrypt.hash(password, 10, (err, passwordHash) => {
    if (err) {
      return res.status(500).json({ message: "Error hashing password" });
    }
    
    user.password = passwordHash; // Assign hashed password to the user object

    const newUser = new User(user); // Create new user object

    // Save the new user to the database
    newUser.save()
      .then(() => {
        res.json({
          message: "User created successfully"
        });
      })
      .catch((err) => {
        console.error("Error creating user:", err);
        res.status(500).json({
          message: "User creation failed",
          error: err
        });
      });
  });
}

// Function to handle user login
export function loginUser(req, res) {
  const credentials = req.body; // Extract login credentials from request body

  // Find user by email
  User.findOne({ email: credentials.email })
    .then((user) => {
      if (user == null) {
        return res.status(403).json({
          message: "User not found"
        });
      }

      // Compare the provided password with the stored hashed password
      const passwordMatch = bcrypt.compareSync(credentials.password, user.password);

      if (!passwordMatch) {
        return res.status(403).json({
          message: "Invalid password"
        });
      }

      // If password matches, create a JWT token
      const payload = {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        type: user.type,
      };

      const token = jwt.sign(payload, process.env.JWT_KEY, { expiresIn: "10h" });

      // Send back the user data and token
      res.json({
        message: "User found",
        user: user,
        token: token
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Error occurred",
        error: err
      });
    });
}

export function isAdminValid(req) {
  if (req.user == null) {
    return false;
  }
  
  if (req.user.type !== "admin") {
    return false;
  }

  return true;
}

