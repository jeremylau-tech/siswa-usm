const express = require("express");
const cors = require("cors");
const app = express();
const mysql = require('mysql2');
const multer = require("multer"); // For handling file uploads
const path = require("path");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid"); // Use the UUID library for generating unique filenames
const jwt = require('jsonwebtoken');
const xml2js = require('xml2js');
// const crypto = require('crypto');
// const forge = require('node-forge');
const fetch = require("node-fetch"); // Make sure to install the 'node-fetch' package

const corsOptions = {
  origin: ['http://docker.usm.my:8090', 'https://kebajikansiswa.usm.my'], // Replace with the actual origins of your frontends
  // origin: "*",
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
  const db = mysql.createConnection({
    host: 'docker.usm.my',
    user: 'root',
    password: 'pelajardatabase',
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
  

app.get("/api/check-db", (req, res) => {
  if (isDbConnected) {
    res.json({ message: 'Database connection is successful!' });
  } else {
      res.status(500).json({ error: 'Database connection failed.' });
  }
});

app.get("/api/check-backend", (req, res) => {
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
app.post("/api/upload/:category", (req, res) => {
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

app.use(bodyParser.text({ type: 'text/xml' }));

const fetchDataFromAPI = async (ic) => {
  try {
    // Set your API key
    const apiKey = "CACP144jTEHNghQQzhvOEyzRHJsSYlKb";

    // Make a request to the API endpoint with the custom header
    const apiUrl = `https://test.com/api/v1/student/${ic}`;
    const apiResponse = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "x-api-key": apiKey,
        "Content-Type": "application/json", // Adjust if needed based on your API requirements
      },
    });

    // Check if the request was successful (status code 200)
    if (apiResponse.ok) {
      const data = await apiResponse.json();
      return data;
    } else {
      // Handle the case where the API request was not successful
      console.error(`Error: ${apiResponse.status} - ${apiResponse.statusText}`);
      throw new Error("Error fetching data from the API");
    }
  } catch (error) {
    console.error("Error:", error);
    throw new Error("Internal Server Error");
  }
};

app.post("/", (req, res) => {
  const { wresult } = req.body;
  const xmlData = wresult;


  // Parse XML to JavaScript object
  xml2js.parseString(xmlData, { explicitArray: false, ignoreAttrs: true }, async (err, result) => {
    if (err) {
      console.error('Error parsing XML:', err);
      res.status(500).send('Internal Server Error');
      return;
    }

    // Get IC
    const samlAttributes = result['t:RequestSecurityTokenResponse']['t:RequestedSecurityToken']['saml:Assertion']['saml:AttributeStatement']['saml:Attribute'];
    const icValueIndex = samlAttributes.length - 1;
    const ic = samlAttributes[icValueIndex]['saml:AttributeValue'];

    // // Get digest
    // const messageDigest = result['t:RequestSecurityTokenResponse']['t:RequestedSecurityToken']['saml:Assertion']['ds:Signature']['ds:SignatureValue'];
    // console.log('Message Digest:', messageDigest);

    // // Extract the public key from KeyInfo
    // const publicKeyCert = result['t:RequestSecurityTokenResponse']['t:RequestedSecurityToken']['saml:Assertion']['ds:Signature']['KeyInfo']['X509Data']['X509Certificate'];
    // console.log('Public Key:', publicKeyCert);

    const userData = await fetchDataFromAPI(ic);

    // Log and send the fetched data back as a response
    console.log(userData);

    
    
    // res.redirect(302, "/");

  });
});

// Define a route to handle user login
const secretKey = 'random123';

// Login endpoint
app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  // Implement your login logic here, query the database to verify credentials
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
      // User successfully authenticated, generate JWT token
      const user = results[0];
      const token = jwt.sign({ unique_id: user.unique_id, email: user.email, roles: user.roles }, secretKey, { expiresIn: '1h' });

      // Send the token and user information back to the client
      res.json({ token, user: { unique_id: user.unique_id, email: user.email, roles: user.roles } });
    }
  });
});


app.get('/api/get-pdf', (req, res) => {
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

app.post('/api/get-user', (req, res) => {
  const { userId } = req.body;

  // SQL query to select all records from the "invoice" table for a specific vendor
  const sql = 'SELECT * FROM users_details WHERE unique_id = ?';

  // Execute the query with parameter binding
  db.query(sql, [userId], (err, results) => {
    if (err) {
      console.error('Error fetching data from MySQL:', err);
      res.status(500).json({ message: 'Internal Server Error' });
    } else {
      // Send the retrieved data as a JSON response
      res.json({ user: results });
    }
  });
});

app.post('/api/get-user-name', (req, res) => {
  const { userId } = req.body;

  // SQL query to select all records from the "invoice" table for a specific vendor
  const sql = 'SELECT name FROM users_details WHERE unique_id = ?';

  // Execute the query with parameter binding
  db.query(sql, [userId], (err, results) => {
    if (err) {
      console.error('Error fetching data from MySQL:', err);
      res.status(500).json({ message: 'Internal Server Error' });
    } else {
      // Send the retrieved data as a JSON response
      res.json({ user: results });
    }
  });
});

app.post('/api/baucar-all-vendor', (req, res) => {
  const { vendorId } = req.body;

  // SQL query to select all records from the "invoice" table for a specific vendor
  const sql = 'SELECT * FROM baucar WHERE vendor_id = ?';

  // Execute the query with parameter binding
  db.query(sql, [vendorId], (err, results) => {
    if (err) {
      console.error('Error fetching data from MySQL:', err);
      res.status(500).json({ message: 'Internal Server Error' });
    } else {
      // Send the retrieved data as a JSON response
      res.json({ baucars: results });
    }
  });
});

app.post('/api/invoice-all-vendor', (req, res) => {
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

app.post('/api/invoice-baucar', (req, res) => {
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


app.post('/api/get-vendor', (req, res) => {
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

app.get("/api/vendor-all", (req, res) => {
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

app.get("/api/vendor-all-aktif", (req, res) => {
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

app.get("/api/vendor-table", (req, res) => {
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

app.post('/api/insert-vendor', (req, res) => {
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
    vendorCompanyName,
    vendorAddress
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
    !vendorBankName ||
    !vendorCompanyName ||
    !vendorAddress
  ) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const currentDate = new Date().toISOString().slice(0, 10);
  const vendorStatus = 'active';

  const sql = `
    INSERT INTO vendor 
    (vendor_location, vendor_name, vendor_status, vendor_description, vendor_fullname, 
    vendor_phone, vendor_email, vendor_register_date, vendor_bank, vendor_bank_acc, vendor_bank_acc_name, vendor_company_name, vendor_address)
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
    vendorCompanyName,
    vendorAddress
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
app.post('/api/request-edit-tolak', (req, res) => {
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

app.post('/api/request-edit-lulus', (req, res) => {
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

    for (let i = 0; i < 4; i++) {
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


app.get("/api/request-all", (req, res) => {
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

app.get("/api/request-all-admin", (req, res) => {
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

app.get("/api/request-status", (req, res) => {
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

app.get("/api/request-status-admin", (req, res) => {
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

app.get("/api/request-requestid", (req, res) => {
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


app.get("/api/request-user", (req, res) => {
  // Extract the request_status query parameter from the request
  const userId = req.query.user_id;
  // console.log(requestStatus)

  // Define the SQL query with a placeholder
  const sql = `
    SELECT * FROM request 
    WHERE requestor_id = ?
  `;

  // Execute the query with parameterized values
  db.query(sql, [userId], (err, results) => {
    if (err) {
      console.error('Error fetching data from MySQL:', err);
      res.status(500).json({ message: 'Internal Server Error' });
    } else {
      // Send the retrieved data as a JSON response
      res.json({ request: results });
    }
  });
});

app.get("/api/request-type", (req, res) => {
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

app.get("/api/request-type-status", (req, res) => {
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

app.get("/api/request-type-status-admin", (req, res) => {
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

app.post("/api/coupons-userid", (req, res) => {
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

app.post("/api/coupons-userid-status", (req, res) => {
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

app.get("/api/coupons-count", (req, res) => {
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

app.post("/api/coupons-redeem", (req, res) => {
  const { baucarId, vendorId } = req.body;
  // console.log(baucarVendor)

  if (!baucarId) {
    return res.status(400).json({ message: 'baucarId is required' });
  }

  const baucarStatus = "tebus";

  // Update the request in the database based on the requestId
  // const sql = `UPDATE baucar SET baucar_status = ?, baucar_redeem_date = NOW(), vendor_id = ?  WHERE baucar_id = ?`;
  const sql = `UPDATE baucar SET baucar_status = ?, baucar_redeem_date = CURRENT_DATE, baucar_redeem_time = CURRENT_TIME, vendor_id = ? WHERE baucar_id = ?`;

  db.query(sql, [baucarStatus, vendorId, baucarId], (err, results) => {
    if (err) {
      console.error('Error updating request:', err);
      res.status(500).json({ message: 'Internal Server Error' });
    } else {
      res.json({ message: 'Request updated successfully' });
    }
  });
});


app.post("/api/coupons-claimed", (req, res) => {
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

// app.post("/api/coupons-claimed", (req, res) => {
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


app.get("/api/users", (req, res) => {
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

app.get("/api/user-details", (req, res) => {
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

app.get("/api/user-details-uniqueid", (req, res) => {
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

app.get("/api/food-applications-requestid", (req, res) => {
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
app.post('/api/countByStatus', (req, res) => {
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


app.post("/api/insert-users", (req, res) => {
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

  app.post("/api/insert-request", (req, res) => {
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
  

  
  //Will be here front end
  app.use(express.static('test_db_client/build'));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'test_db_client', 'build', 'index.html'));
});
  

app.listen(8000, () => {
  console.log(`Server is running on port 8000.`);
});