const express = require("express");
const cors = require("cors");
const app = express();
const mysql = require('mysql2');
const multer = require("multer"); // For handling file uploads
const path = require("path");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid"); // Use the UUID library for generating unique filenames
const corsOptions = {
  origin: 'http://localhost:3000', // Replace with the actual origin of your frontend
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());

// MySQL connection configuration
const db = mysql.createConnection({
host: 'localhost',
user: 'root',
password: 'test123',
database: 'bhepa_test',
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueFilename = uuidv4() + path.extname(file.originalname);
    cb(null, uniqueFilename);
  },
});

const upload = multer({ storage });

// Connect to MySQL
db.connect((err) => {
if (err) {
    console.error('Error connecting to MySQL:', err);
} else {
    console.log('Connected to MySQL');
}
});


app.get("/message", (req, res) => {
    res.json({ message: 'If you\'re seeing this, connection is working! ' });
});

// Define a route to handle user login
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  // Implement your login logic here, e.g., query the database to verify credentials
  const query = "SELECT * FROM users WHERE email = ? AND password = ?";
  db.query(query, [email, password], (err, results) => {
    if (err) {
      console.error("Error executing MySQL query:", err);
      res.status(500).json({ message: "Internal server error" });
      return;
    }

    if (results.length === 0) {
      // User not found or incorrect credentials
      res.status(401).json({ message: "Invalid email or password" });
    } else {
      // User successfully authenticated
      res.status(200).json({ message: "Login successful" });
    }
  });
});


app.get("/users", (req, res) => {
    // SQL query to select all records from the "user" table
    const sql = "SELECT * FROM user";

    // Execute the query
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching data from MySQL:', err);
            res.status(500).json({ message: 'Internal Server Error' });
        } else {
            // Send the retrieved data as a JSON response
            res.json({ users: results });
        }
    });
});

// Endpoint to insert a new user
app.post("/insert", (req, res) => {
    const { name, matric_number, course_taken } = req.body;
  
    // Check if required fields are provided
    if (!name || !matric_number || !course_taken) {
      res.status(400).json({ message: 'Missing required fields' });
      return;
    }
  
    // SQL query to insert a new user into the "user" table
    const sql = "INSERT INTO user (name, matric_number, course_taken) VALUES (?, ?, ?)";
  
    // Execute the query
    db.query(sql, [name, matric_number, course_taken], (err, result) => {
      if (err) {
        console.error('Error inserting user data into MySQL:', err);
        res.status(500).json({ message: 'Internal Server Error' });
      } else {
        res.status(201).json({ message: 'User data inserted successfully' });
      }
    });
  });


  // Handle file upload
app.post("/upload", upload.single("file"), (req, res) => {
  res.send("File uploaded successfully.");
});

app.listen(8000, () => {
  console.log(`Server is running on port 8000.`);
});