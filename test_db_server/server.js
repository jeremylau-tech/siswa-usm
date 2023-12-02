const express = require('express');
const mysql = require('mysql2');

const app = express();
const port = 8000;

const db = mysql.createConnection({
  host: 'bhepa_test',
  user: 'root',
  password: 'pelajardatabase',
  database: 'bhepa_test'
});

// const db = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: 'Admin@12345',
//   database: 'bhepa_test',
//   });

app.get('/', (req, res) => {
  db.query('SELECT * FROM USERS', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.listen(port, () => {
  console.log(`Node.js app listening at http://localhost:${port}`);
});
