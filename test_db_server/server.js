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

function generateCouponCode(length) {
  const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'; // You can customize this character set
  let couponCode = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    couponCode += charset[randomIndex];
  }

  return couponCode;
}

let isDbConnected = false; // Variable to store the connection state

// MySQL connection configuration
const db = mysql.createConnection({
host: 'localhost',
user: 'root',
password: 'Admin@12345',
database: 'bhepa_test',
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
      console.error('Error connecting to MySQL:', err);
  } else {
    isDbConnected = true; // Set the connection state to true
      console.log('Connected to MySQL');
  }
  });
  

app.get("/check-db", (req, res) => {
  if (isDbConnected) {
    res.json({ message: 'Database connection is successful!' });
  } else {
      res.status(500).json({ error: 'Database connection failed.' });
  }
});

app.get("/check-backend", (req, res) => {
    res.json({ message: 'If you\'re seeing this, connection is working! ' });
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
      res.json({ user: results[0] });

      // res.status(200).json({ message: "Login successful" });
    }
  });
});

app.get('/get-pdf', (req, res) => {
  const pdfPath = req.query.pdfPath; // Extract the PDF file path from the URL
  // console.log(pdfPath)

  // Set the path to the directory where your PDF files are located
  const pdfDirectory = __dirname; // Change to the actual directory

  // Use the res.sendFile method to send the PDF file
  res.sendFile(pdfPath, { root: pdfDirectory }, (err) => {
    if (err) {
      console.error('Error sending PDF file:', err);
      res.status(404).send('PDF file not found');
    }
  });
});

app.post('/invoice-all-vendor', (req, res) => {
  const { vendorId } = req.body;

  // SQL query to select all records from the "invoice" table for a specific vendor
  const sql = 'SELECT * FROM invoice WHERE vendor_id = ?';

  // Execute the query with parameter binding
  db.query(sql, [vendorId], (err, results) => {
    if (err) {
      console.error('Error fetching data from MySQL:', err);
      res.status(500).json({ message: 'Internal Server Error' });
    } else {
      // Send the retrieved data as a JSON response
      res.json({ invoices: results });
    }
  });
});

app.post('/invoice-baucar', (req, res) => {
  const { invoiceId } = req.body;

  // SQL query to select data using UNION from multiple tables
  const sql = `
    SELECT b.*, v.vendor_name, v.vendor_location, u.unique_id, u.name
    FROM baucar b
    JOIN vendor v ON b.vendor_id = v.vendor_id
    JOIN users_details u ON b.user_id = u.unique_id
    WHERE b.invoice_id = ?;
  `;

  // Execute the query with parameter binding
  db.query(sql, [invoiceId], (err, results) => {
    if (err) {
      console.error('Error fetching data from MySQL:', err);
      res.status(500).json({ message: 'Internal Server Error' });
    } else {
      // Send the retrieved data as a JSON response
      res.json({ invoices: results });
    }
  });
});


app.post('/get-vendor', (req, res) => {
  const { vendorId } = req.body;

  // SQL query to select all records from the "invoice" table for a specific vendor
  const sql = 'SELECT * FROM vendor WHERE vendor_id = ?';

  // Execute the query with parameter binding
  db.query(sql, [vendorId], (err, results) => {
    if (err) {
      console.error('Error fetching data from MySQL:', err);
      res.status(500).json({ message: 'Internal Server Error' });
    } else {
      // Send the retrieved data as a JSON response
      res.json({ vendors: results });
    }
  });
});

app.get("/vendor-all", (req, res) => {
  // SQL query to select all records from the "user" table
  const sql = "SELECT * FROM vendor";

  // Execute the query
  db.query(sql, (err, results) => {
      if (err) {
          console.error('Error fetching data from MySQL:', err);
          res.status(500).json({ message: 'Internal Server Error' });
      } else {
          // Send the retrieved data as a JSON response
          res.json({ vendors: results });
      }
  });
});

app.get("/vendor-all-aktif", (req, res) => {
  // SQL query to select all records from the "user" table
  const sql = "SELECT * FROM vendor WHERE vendor_status = 'Active'";

  // Execute the query
  db.query(sql, (err, results) => {
      if (err) {
          console.error('Error fetching data from MySQL:', err);
          res.status(500).json({ message: 'Internal Server Error' });
      } else {
          // Send the retrieved data as a JSON response
          res.json({ vendors: results });
      }
  });
});

app.get("/vendor-table", (req, res) => {
  // SQL query to select all records from the "vendor" table and count of matching records in "baucar" table
  const sql = `
    SELECT 
      vendor.*,
      SUM(CASE WHEN baucar.baucar_status = "tebus" OR baucar.baucar_status = "tuntut" THEN 1 ELSE 0 END) AS baucarCountRedeemed,
      SUM(CASE WHEN baucar.baucar_status = "tuntut" THEN 1 ELSE 0 END) AS baucarCountClaimed
    FROM vendor
    LEFT JOIN baucar ON vendor.vendor_id = baucar.vendor_id
    GROUP BY vendor.vendor_id;
  `;

  // Execute the query
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching data from MySQL:', err);
      res.status(500).json({ message: 'Internal Server Error' });
    } else {
      // Calculate baucarNeedClaim here (difference between baucarCountRedeem and baucarCountClaim)
      const vendorsWithCalculatedData = results.map((vendor) => ({
        ...vendor,
        baucarToClaim: vendor.baucarCountRedeemed - vendor.baucarCountClaimed,
      }));

      // Send the retrieved data with calculated fields as a JSON response
      res.json({ vendors: vendorsWithCalculatedData });
    }
  });
});

app.post('/insert-vendor', (req, res) => {
  const {
    vendorName,
    vendorLocation,
    vendorDescription,
    vendorFullname,
    vendorPhoneNo,
    vendorEmail,
    vendorBankAccName,
    vendorBankAccNo,
    vendorBankName,
  } = req.body;

  // Validate required fields
  if (
    !vendorName ||
    !vendorLocation ||
    !vendorDescription ||
    !vendorFullname ||
    !vendorPhoneNo ||
    !vendorEmail ||
    !vendorBankAccName ||
    !vendorBankAccNo ||
    !vendorBankName
  ) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const currentDate = new Date().toISOString().slice(0, 10);
  const vendorStatus = 'active';

  const sql = `
    INSERT INTO vendor 
    (vendor_location, vendor_name, vendor_status, vendor_description, vendor_fullname, 
    vendor_phone, vendor_email, vendor_register_date, vendor_bank, vendor_bank_acc, vendor_bank_acc_name)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    vendorLocation,
    vendorName,
    vendorStatus,
    vendorDescription,
    vendorFullname,
    vendorPhoneNo,
    vendorEmail,
    currentDate,
    vendorBankName,
    vendorBankAccNo,
    vendorBankAccName,
  ];

  // Execute the query
  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error inserting data into MySQL:', err);
      res.status(500).json({ message: 'Internal Server Error' });
    } else {
      console.log('Data inserted successfully');
      res.json({ message: 'Data inserted successfully' });
    }
  });
});

// Define the route to handle the PUT request for request editing
app.post('/request-edit-tolak', (req, res) => {
  const { inputRemark, userRole, approverId, requestId } = req.body;

  let user_remark = '';
  let user_id = '';
  let req_status = "tolak";

  if (userRole == "admin")
  {
    user_remark = "request_remark_admin";
    user_id = "admin_approver_id";
  }
  else if (userRole == "bhepa")
  {
    user_remark = "request_remark_bhepa";
    user_id = "bhepa_approver_id";
  }
  else if (userRole == "tnc")
  {
    user_remark = "request_remark_tnc";
    user_id = "tnc_approver_id";
  }

  // Update the request in the database based on the requestId
  const sql = `UPDATE request SET ${user_remark} = ?, ${user_id} = ?, request_status = ?  WHERE request_id = ?`;

  db.query(sql, [inputRemark, approverId, req_status, requestId], (err, results) => {
    if (err) {
      console.error('Error updating request:', err);
      res.status(500).json({ message: 'Internal Server Error' });
    } else {
      res.json({ message: 'Request updated successfully' });
    }
  });
});

app.post('/request-edit-lulus', (req, res) => {
  const { inputRemark, userRole, approverId, requestId, requestType, requestorId } = req.body;

  // console.log(requestType);

  let user_remark = '';
  let user_id = '';
  let req_status = '';

  if (userRole == "admin")
  {
    user_remark = "request_remark_admin";
    user_id = "admin_approver_id";
    req_status = "semak";
  }
  else if (userRole == "bhepa")
  {
    user_remark = "request_remark_bhepa";
    user_id = "bhepa_approver_id";
    if (requestType == "makanan" || requestType == "peranti" )
    req_status = "lulus";
    else
    req_status = "syor";
  }
  else if (userRole == "tnc")
  {
    user_remark = "request_remark_tnc";
    user_id = "tnc_approver_id";
    req_status = "lulus";
  }

  // Update the request in the database based on the requestId
  let sql = `UPDATE request SET ${user_remark} = ?, ${user_id} = ?, request_status = ?  WHERE request_id = ?`;

  db.query(sql, [inputRemark, approverId, req_status, requestId], (err, results) => {
    if (err) {
      console.log('Error updating request:', err);
      return res.status(500).json({ message: 'Error updating request' });
    }
  });

  
  if (req_status == "lulus") {
    const currentDate = new Date();
    const formattedCurrentDate = currentDate.toISOString().split('T')[0];

    const fixDueDate = '2023-12-31';
    // const threeMonthsLater = new Date(currentDate);

    // threeMonthsLater.setMonth(currentDate.getMonth() + 3);

    // const formattedThreeMonthsLater = threeMonthsLater.toISOString().split('T')[0];


    const baucar_stat = "aktif";
    let baucar_code = "";

    for (let i = 0; i < 20; i++) {
    baucar_code = generateCouponCode(6);
    sql = "INSERT INTO baucar  (baucar_code, baucar_apply_date, baucar_apply_time, baucar_due_date, baucar_status, user_id) VALUES (?, ?, CURTIME(), ?, ?, ?)";
    db.query(sql, [baucar_code, formattedCurrentDate, fixDueDate, baucar_stat, requestorId], (err, results) => {
      if (err) {
        console.error('Error updating request:', err);
      }
    });
  }
  return res.status(200).json({ message: 'Request updated and baucar generated successfully' });
} else {
  // Send a success response for non-'lulus' requests
  return res.status(200).json({ message: 'Request updated successfully' });
}
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

app.get("/request-all-admin", (req, res) => {
  // SQL query to select all records from the "user" table
  // const sql = "SELECT * FROM request";

  const sql = `
    SELECT r.*, IFNULL(rc.request_count_per_user, 0) AS request_count_per_user
    FROM request r
    LEFT JOIN (
      SELECT requestor_id, COUNT(*) AS request_count_per_user
      FROM request
      GROUP BY requestor_id
    ) rc ON r.requestor_id = rc.requestor_id
  `;

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
  // console.log(requestStatus)

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

app.get("/request-status-admin", (req, res) => {
  // Extract the request_status query parameter from the request
  const requestStatus = req.query.request_status;
  // console.log(requestStatus)

  // Define the SQL query with a placeholder
  const sql = `
    SELECT r.*, IFNULL(rc.request_count_per_user, 0) AS request_count_per_user
    FROM request r
    LEFT JOIN (
      SELECT requestor_id, COUNT(*) AS request_count_per_user
      FROM request
      WHERE request_status = ?
      GROUP BY requestor_id
    ) rc ON r.requestor_id = rc.requestor_id
    WHERE r.request_status = ?;
  `;

  // Execute the query with parameterized values
  db.query(sql, [requestStatus, requestStatus], (err, results) => {
    if (err) {
      console.error('Error fetching data from MySQL:', err);
      res.status(500).json({ message: 'Internal Server Error' });
    } else {
      // Send the retrieved data as a JSON response
      res.json({ request: results });
    }
  });
});

app.get("/request-requestid", (req, res) => {
  // Extract the request_status query parameter from the request
  const requestId = req.query.request_id;
  // Define the SQL query with a placeholder
  const sql = `
    SELECT * FROM request 
    WHERE request_id = ?
  `;

  // Execute the query with parameterized values
  db.query(sql, [requestId], (err, results) => {
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
  // console.log(requestStatus)

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

app.get("/request-type-status-admin", (req, res) => {
  // Extract the request_status query parameter from the request
  const requestType = req.query.request_type;
  const requestStatus = req.query.request_status;

  let sql;
  let special_param = false; // need to cater other status dalam process

  let first_half_sql = "";
  let sec_half_sql = "" ;
  let sql_params = [];

  if (requestStatus === "complete") {
    first_half_sql = "WHERE request_type = ? AND (request_status = 'lulus' OR  request_status = 'tolak')";
    sec_half_sql = "WHERE r.request_type = ? AND (r.request_status = 'lulus' OR  r.request_status = 'tolak')";
    sql_params = [requestType, requestType];
  }
  else {
    first_half_sql = "WHERE request_type = ? AND request_status = ?";
    sec_half_sql = "WHERE r.request_type = ? AND r.request_status = ?";
    sql_params =  [requestType, requestStatus, requestType, requestStatus];
  }

  sql = `
    SELECT r.*, IFNULL(rc.request_count_per_user, 0) AS request_count_per_user
    FROM request r
    LEFT JOIN (
      SELECT requestor_id, COUNT(*) AS request_count_per_user
      FROM request
      ${first_half_sql}
      GROUP BY requestor_id
    ) rc ON r.requestor_id = rc.requestor_id
    ${sec_half_sql};
    `;
    
  
    db.query(sql, sql_params, (err, results) => {    
      if (err) {
        console.error('Error fetching data from MySQL:', err);
        res.status(500).json({ message: 'Internal Server Error' });
      } else {
        // Send the retrieved data as a JSON response
        res.json({ request: results });
      }
    });
});

app.post("/coupons-userid", (req, res) => {
  const { userId } = req.body;
  // console.log(userId)

  if (!userId) {
    return res.status(400).json({ message: 'userId is required' });
  }

  // SQL query to select coupons for the specified user
  const sql = "SELECT * FROM baucar WHERE user_id = ? AND baucar_status = 'aktif'";

  // Execute the query
  db.query(sql, [userId], (err, results) => {
    if (err) {
      console.error('Error fetching data from MySQL:', err);
      res.status(500).json({ message: 'Internal Server Error' });
    } else {
      // Send the retrieved data as a JSON response with "coupons" key
      res.json({ coupons: results });
    }
  });
});

app.post("/coupons-userid-status", (req, res) => {
  const { userId, baucarStatus } = req.body;
  // console.log(userId)

  if (!userId) {
    return res.status(400).json({ message: 'userId is required' });
  }

  // SQL query to select coupons for the specified user
  const sql = "SELECT * FROM baucar WHERE user_id = ? AND baucar_status = ?";

  // Execute the query
  db.query(sql, [userId, baucarStatus], (err, results) => {
    if (err) {
      console.error('Error fetching data from MySQL:', err);
      res.status(500).json({ message: 'Internal Server Error' });
    } else {
      // Send the retrieved data as a JSON response with "coupons" key
      // console.log(results)
      res.json({ coupons: results });
    }
  });
});

app.get("/coupons-count", (req, res) => {
  const { userId } = req.query;

  if (!userId) {
    return res.status(400).json({ message: 'userId is required' });
  }

  // SQL query to count the number of active coupons for the specified user
  const sql = "SELECT COUNT(*) AS couponCount FROM baucar WHERE user_id = ?";

  // Execute the query
  db.query(sql, [userId], (err, results) => {
    if (err) {
      console.error('Error counting coupons from MySQL:', err);
      res.status(500).json({ message: 'Internal Server Error' });
    } else {
      // Send the retrieved count as a JSON response

      console.log(results[0].couponCount )
      res.json({ couponCount: results[0].couponCount });
    }
  });
});

app.post("/coupons-redeem", (req, res) => {
  const { baucarId, vendorId } = req.body;
  // console.log(baucarVendor)

  if (!baucarId) {
    return res.status(400).json({ message: 'baucarId is required' });
  }

  const baucarStatus = "tebus";

  // Update the request in the database based on the requestId
  const sql = `UPDATE baucar SET baucar_status = ?, baucar_redeem_date = NOW(), vendor_id = ?  WHERE baucar_id = ?`;

  db.query(sql, [baucarStatus, vendorId, baucarId], (err, results) => {
    if (err) {
      console.error('Error updating request:', err);
      res.status(500).json({ message: 'Internal Server Error' });
    } else {
      res.json({ message: 'Request updated successfully' });
    }
  });
});


app.post("/coupons-claimed", (req, res) => {
  const { vendorId, numClaimed } = req.body;

  if (!vendorId) {
    return res.status(400).json({ message: 'vendorId is required' });
  }

  // Generate a unique invoice_id using uuidv4
  let unique_invoice_id = uuidv4();

  // Insert a new invoice record
  let insertSql = `INSERT INTO invoice (invoice_id, claimed_date, num_baucar_claimed, vendor_id) VALUES (?, CURRENT_DATE, ?, ?)`;
  db.query(insertSql, [unique_invoice_id, numClaimed, vendorId], (insertErr, insertResults) => {
    if (insertErr) {
      console.error('Error inserting invoice:', insertErr);
      return res.status(500).json({ message: 'Internal Server Error' });
    }

    // Update the request in the baucar table based on vendorId and baucar_status
    let updateSql = `UPDATE baucar SET invoice_id = ?, baucar_status = "tuntut"  WHERE vendor_id = ? AND baucar_status = "tebus"`;
    // let updateSql = `UPDATE baucar SET invoice_id = ?  WHERE vendor_id = ? AND baucar_status = "tebus"`;

    db.query(updateSql, [unique_invoice_id, vendorId], (updateErr, updateResults) => {
      if (updateErr) {
        console.error('Error updating baucar:', updateErr);
        return res.status(500).json({ message: 'Internal Server Error' });
      }

      res.json({ message: 'Invoice and Baucar updated successfully' });
    });
  });
});

// app.post("/coupons-claimed", (req, res) => {
//   const {
//     vendorLocation,
//     vendorFullname,
//     vendorPhoneNo,
//     vendorEmail,
//     vendorBankAccName,
//     vendorBankAccNo,
//     vendorBankName,
//     invoiceTotalCount,
//     invoiceTotalPrice
//   } = req.body;

//   // Validate required fields
//   if (
//     !vendorLocation ||
//     !vendorFullname ||
//     !vendorPhoneNo ||
//     !vendorEmail ||
//     !vendorBankAccName ||
//     !vendorBankAccNo ||
//     !vendorBankName ||
//     !invoiceTotalCount || 
//     !invoiceTotalPrice
//   ) {
//     return res.status(400).json({ message: 'All fields are required' });
//   }

//   const currentDate = new Date().toISOString().slice(0, 10);
//   const invoice_id = 'active';
//   const sql = `
//     INSERT INTO invoice 
//     (invoice_id, vendor_location, vendor_name, vendor_status, vendor_description, vendor_fullname, 
//     vendor_phone, vendor_email, invoice_date, vendor_bank, vendor_bank_acc, vendor_bank_acc_name)
//     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
//   `;

//   // // Update the request in the database based on the requestId
//   // const sql = `UPDATE baucar SET baucar_status = ? WHERE vendor_id = ? AND baucar_status = "tebus"`;

//   db.query(sql, [baucarStatus, vendorId], (err, results) => {
//     if (err) {
//       console.error('Error updating request:', err);
//       res.status(500).json({ message: 'Internal Server Error' });
//     } else {
//       res.json({ message: 'Request updated successfully' });
//     }
//   });
// });


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

app.get("/user-details-uniqueid", (req, res) => {
  const uniqueId = req.query.unique_id;

  // SQL query to select all records from the "users_details" table
  const sql = "SELECT * FROM users_details WHERE unique_id = ?";

  // Execute the query
  db.query(sql, [uniqueId], (err, results) => {          if (err) {
          console.error('Error fetching data from MySQL:', err);
          res.status(500).json({ message: 'Internal Server Error' });
      } else {
          // Send the retrieved data as a JSON response with "userDetails" key
          res.json({ userDetails: results });
      }
  });
});

app.get("/food-applications-requestid", (req, res) => {
  const requestId = req.query.request_id;

  // SQL query to select all records from the "users_details" table
  const sql = "SELECT * FROM food_application WHERE request_id = ?";

  // Execute the query
  db.query(sql, [requestId], (err, results) => {          if (err) {
          console.error('Error fetching data from MySQL:', err);
          res.status(500).json({ message: 'Internal Server Error' });
      } else {
          // Send the retrieved data as a JSON response with "userDetails" key
          res.json({ foodDetails: results });
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
        WHERE request_status = 'semak' OR request_status = 'syor'
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
        WHERE (request_status = 'semak' OR request_status = 'syor') AND request_type = ?
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
      // console.log(sql);
    
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


app.post("/insert-users", (req, res) => {
  const { unique_id, email, password, name, ic_num, phone_num, school, course, student_status, study_year } = req.body;

  // Check if required fields are provided
  if (!unique_id) {
    res.status(400).json({ message: 'Missing required fields' });
    return;
  }

  const student_roles = "student";

  // SQL query to insert a new user into the "user" table
  let sql = "INSERT INTO users (unique_id, email, password, roles) VALUES (?, ?, ?, ?)";

  // Execute the query
  db.query(sql, [unique_id, email, password, student_roles], (err, result) => {
    if (err) {
      console.error('Error inserting user data into MySQL:', err);
      res.status(500).json({ message: 'Internal Server Error' });
    } else {
      // If the user is successfully inserted into the "user" table, proceed to insert details
      sql = "INSERT INTO users_details (unique_id, email, name, ic_num, phone_num, school, course, student_status, study_year) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
      
      // Execute the query for inserting user details
      db.query(sql, [unique_id, email, name, ic_num, phone_num, school, course, student_status, study_year], (err, result) => {
        if (err) {
          console.error('Error inserting user details into MySQL:', err);
          res.status(500).json({ message: 'Internal Server Error' });
        } else {
          res.status(201).json({ message: 'User data inserted successfully' });
        }
      });
    }
  });
});

  app.post("/insert-request", (req, res) => {
    // console.log( req.body);
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