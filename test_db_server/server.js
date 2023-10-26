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

app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
const bodyParser = require('body-parser');
app.use(bodyParser.json());


// MySQL connection configuration
const db = mysql.createConnection({
host: 'localhost',
user: 'root',
password: 'Admin@12345',
database: 'bhepa_test',
});

const getStorage = (category) => {
  return multer.diskStorage({
    destination: (req, file, cb) => {
      const uploadPath = `uploads/${category}/`;
      cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
      const uniqueFilename = uuidv4() + path.extname(file.originalname);
      cb(null, uniqueFilename);
    },
  });
};

// Handle file upload for a specific category
app.post("/upload/:category", (req, res) => {
  const category = req.params.category; // Access the 'category' from the URL

  // Create a new multer instance with the dynamic storage
  const upload = multer({ storage: getStorage(category) });

  upload.single("file")(req, res, (err) => {
    if (err) {
      // Handle errors
      console.error("File upload failed:", err);
      res.status(500).send("File upload failed.");
    } else {
      const filename = req.file.filename;
      res.send(`uploads/${category}/${filename}`);
    }
  });
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

app.get("/request-all", (req, res) => {
  // SQL query to select all records from the "user" table
  const sql = "SELECT * FROM request";

  // Execute the query
  db.query(sql, (err, results) => {
      if (err) {
          console.error('Error fetching data from MySQL:', err);
          res.status(500).json({ message: 'Internal Server Error' });
      } else {
          // Send the retrieved data as a JSON response
          res.json({ request: results });
      }
  });
});

app.get("/request-status", (req, res) => {
  // Extract the request_status query parameter from the request
  const requestStatus = req.query.request_status;
  console.log(requestStatus)

  // Define the SQL query with a placeholder
  const sql = `
    SELECT * FROM request 
    WHERE request_status = ?
  `;

  // Execute the query with parameterized values
  db.query(sql, [requestStatus], (err, results) => {
    if (err) {
      console.error('Error fetching data from MySQL:', err);
      res.status(500).json({ message: 'Internal Server Error' });
    } else {
      // Send the retrieved data as a JSON response
      res.json({ request: results });
    }
  });
});

app.get("/request-type", (req, res) => {
  // Extract the request_status query parameter from the request
  const requestStatus = req.query.request_status;
  console.log(requestStatus)

  // Define the SQL query with a placeholder
  const sql = `
    SELECT * FROM request 
    WHERE request_status = ?
  `;

  // Execute the query with parameterized values
  db.query(sql, [requestStatus], (err, results) => {
    if (err) {
      console.error('Error fetching data from MySQL:', err);
      res.status(500).json({ message: 'Internal Server Error' });
    } else {
      // Send the retrieved data as a JSON response
      res.json({ request: results });
    }
  });
});

app.get("/request-type-status", (req, res) => {
  // Extract the request_status query parameter from the request
  const requestType = req.query.request_type;
  const requestStatus = req.query.request_status;

  let sql;
  let special_param = false; // need to cater other status dalam process

  if (requestStatus === "complete") {
    sql = `
    SELECT * FROM request 
    WHERE request_type = ? AND (request_status = 'lulus' OR  request_status = 'tolak')
  `;
  } else {
    special_param = true;
    sql = `
    SELECT * FROM request 
    WHERE request_type = ? AND request_status = ? 
  `;
  }
  
  if (!special_param) {
    db.query(sql, [requestType], (err, results) => {    
      if (err) {
        console.error('Error fetching data from MySQL:', err);
        res.status(500).json({ message: 'Internal Server Error' });
      } else {
        // Send the retrieved data as a JSON response
        res.json({ request: results });
      }
    });
  } else {
    db.query(sql, [requestType, requestStatus], (err, results) => {    
      if (err) {
        console.error('Error fetching data from MySQL:', err);
        res.status(500).json({ message: 'Internal Server Error' });
      } else {
        // Send the retrieved data as a JSON response
        res.json({ request: results });
      }
    });
  }
});


app.get("/users", (req, res) => {
    // SQL query to select all records from the "user" table
    const sql = "SELECT * FROM users";

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

app.get("/user-details", (req, res) => {
  // SQL query to select all records from the "users_details" table
  const sql = "SELECT * FROM users_details";

  // Execute the query
  db.query(sql, (err, results) => {
      if (err) {
          console.error('Error fetching data from MySQL:', err);
          res.status(500).json({ message: 'Internal Server Error' });
      } else {
          // Send the retrieved data as a JSON response with "userDetails" key
          res.json({ userDetails: results });
      }
  });
});

// Route to get the count of food applications based on status
// Route to get the count of applications based on status and table
app.post('/countByStatus', (req, res) => {
  const table = req.body.table;
  const status = req.body.status;
  const req_type = req.body.req_type;

  if (!table || !status) {
    return res.status(400).json({ message: 'Table and status are required in the request body.' });
  }
  
  let sql;
  let special_param = false; // need to cater other status dalam process

  if (req_type === "all") {
    if (status === "dalam proses") {
      sql = `
        SELECT COUNT(*) AS count
        FROM ?? 
        WHERE request_status = 'sah' OR request_status = 'syor'
      `;
    } else {
      sql = `
        SELECT COUNT(*) AS count
        FROM ?? 
        WHERE request_status = ?
      `;
    }
  } else {
    if (status === "dalam proses") {
      special_param = true;
      sql = `
        SELECT COUNT(*) AS count
        FROM ?? 
        WHERE (request_status = 'sah' OR request_status = 'syor') AND request_type = ?
      `;
    } else {
      sql = `
        SELECT COUNT(*) AS count
        FROM ?? 
        WHERE request_status = ? AND request_type = ?
      `;
    }
  }
  
  if (!special_param) {
    db.query(sql, [table, status, req_type], (err, results) => {
      // console.log(sql);
    
      if (err) {
        console.error('Error fetching data from MySQL:', err);
        res.status(500).json({ message: 'Internal Server Error' });
      } else {
        // Send the retrieved data as a JSON response
        res.json(results);
      }
    });
  } else {
    db.query(sql, [table, req_type], (err, results) => {
      console.log(sql);
    
      if (err) {
        console.error('Error fetching data from MySQL:', err);
        res.status(500).json({ message: 'Internal Server Error' });
      } else {
        // Send the retrieved data as a JSON response
        res.json(results);
      }
    });
  }
  
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

  app.post("/insert-request", (req, res) => {
    console.log( req.body);
    const {
      requestor_id,
      request_type,
      admin_approver_id,
      bhepa_approver_id,
      tnc_approver_id,

      sponsor_type,
      req_relationship,
      death_cert_file,
      ic_num_file,
      bank_statement_file,
      payment_slip_file,
      transport_fare_file,
      support_doc_file,
      device_type,
      device_details,
      device_pic_file,
      food_justification
    } = req.body;
  
    // Check if requestor_id is empty or not provided
    if (!requestor_id) {
      res.status(400).json({ message: 'Missing requestor_id' });
      return;
    }
  
    const request_id = uuidv4();
    const new_req_status = "baharu";

    // SQL query to insert a new request into the "request" table
    sql = "INSERT INTO request (request_id, requestor_id, admin_approver_id, bhepa_approver_id, tnc_approver_id, request_type, request_status, request_date, request_time) VALUES (?, ?, ?, ?, ?, ?, ?, CURDATE(), CURTIME())";
    // Execute the query
    db.query(
      sql,
      [
        request_id,     // Use the generated request_id
        requestor_id,
        admin_approver_id || null, // Set approver_id to null if not provided
        bhepa_approver_id || null, // Set approver_id to null if not provided
        tnc_approver_id || null, // Set approver_id to null if not provided
        request_type,
        new_req_status
      ],
      (err, result) => {
        if (err) {
          console.error('Error inserting request data into MySQL:', err);
        } 
      }
    );

    if (request_type === "makanan")
    {
      sql = "INSERT INTO food_application (request_id, sponsor_type, ic_num_file, payment_slip_file, food_justification) VALUES (?, ?, ?, ?, ?)";
    // Execute the query
    db.query(
      sql,
      [
        request_id,
        sponsor_type,
        ic_num_file,
        payment_slip_file,
        food_justification
      ],
      (err, result) => {
        if (err) {
          console.error('Error inserting request data into MySQL:', err);
          res.status(500).json({ message: 'Internal Server Error' });
        } else {
          res.status(201).json({ message: 'Request data inserted successfully' });
        }
      }
    );
    }

    /*db.query(
      sql,
      [
        requestor_id,
        approver_id || null, // Set approver_id to null if not provided
        sponsor_type || null, 
        req_relationship || null,
        death_cert_file || null,
        ic_num_file || null,
        bank_statement_file || null,
        payment_slip_file || null,
        transport_fare_file || null,
        support_doc_file || null,
        request_type || null,
        device_type || null,
        device_details || null,
        device_pic_file || null
      ],
      (err, result) => {
        if (err) {
          console.error('Error inserting request data into MySQL:', err);
          res.status(500).json({ message: 'Internal Server Error' });
        } else {
          res.status(201).json({ message: 'Request data inserted successfully' });
        }
      }
    );*/
  
    //const sql = "INSERT INTO request (requestor_id, approver_id, sponsor_type, req_relationship, death_cert_file, ic_num_file, bank_statement_file, payment_slip_file, transport_fare_file, support_doc_file, request_type, device_type, device_details, device_pic_file) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

  });
  



app.listen(8000, () => {
  console.log(`Server is running on port 8000.`);
});