// Import required modules
const express = require('express');
const mysql = require('mysql2');
const dotenv = require('dotenv');
const app = express();
const port = process.env.PORT || 3000; // Use environment variable for port

// Load environment variables from .env file
dotenv.config();

// Create a connection to the MySQL database
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

// Connect to the MySQL database
db.connect((err) => {
  if (err) {
    console.error('Database connection error:', err);
    process.exit(1); // Exit the process if there's a connection error
  }
  console.log('Connected to database');
});

// Middleware to parse JSON bodies
app.use(express.json());

// Endpoint to increment the view count
app.post('/increment', (req, res) => {
  const sql = 'UPDATE views SET count = count + 1 WHERE id = 1';
  db.query(sql, (err, result) => {
    if (err) {
      console.error('Error updating view count:', err);
      return res.status(500).send('Server error');
    }
    res.send('View count incremented');
  });
});

// Endpoint to get the current view count
app.get('/count', (req, res) => {
  const sql = 'SELECT count FROM views WHERE id = 1';
  db.query(sql, (err, result) => {
    if (err) {
      console.error('Error retrieving view count:', err);
      return res.status(500).send('Server error');
    }
    res.json({ count: result[0].count });
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
