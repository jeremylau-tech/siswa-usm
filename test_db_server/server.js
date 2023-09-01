const express = require("express");
const cors = require("cors");
const app = express();
const mysql = require('mysql2');

app.use(cors());
app.use(express.json());

// MySQL connection configuration
const db = mysql.createConnection({
host: 'localhost',
user: 'root',
password: 'test123',
database: 'bhepa_test',
});

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

app.listen(8000, () => {
  console.log(`Server is running on port 8000.`);
});