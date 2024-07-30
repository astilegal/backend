// Import required modules
const express = require('express');
const mysql = require('mysql2');
const app = express();
const port = 3000;

// Create a connection to the MySQL database
const db = mysql.createConnection({
  host: 'localhost',
  user: 'viewcounter_user',  // Ensure this matches the username you created
  password: 'your_password', // Replace with the actual password
  database: 'view_counter'
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
