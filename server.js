// server.js
const express = require('express');
const sql = require('mssql'); // Import the sql module
const connectDB = require('./db');
const app = express();
const port = 3000;

// Middleware to parse JSON
app.use(express.json());

// Route to get users from the stored procedure
app.get('/api/users', async (req, res) => {
  try {
    const pool = await connectDB(); // Get database connection
    const result = await pool.request().execute('GetUsers'); // Execute the stored procedure

    // Send response with the result from the stored procedure
    res.status(200).json(result.recordset);
  } catch (error) {
    console.error('Error executing stored procedure:', error);
    res.status(500).send('Server error');
  }
});

app.post('/api/insertUser', async (req, res) => {
  const { first_name, last_name,email,phone } = req.body; // Adjust based on your SP parameters

  try {
    const pool = await connectDB(); // Get database connection
    const request = new sql.Request();
    request.input('first_name', sql.VarChar, first_name);
    request.input('last_name', sql.VarChar, last_name);
    request.input('email', sql.VarChar, email);
    request.input('phone', sql.VarChar, phone);
   
    
    const result = await request.execute('InsertUser');
    res.status(200).send({error: 'Inserted successfully'}); // Updated line
  } catch (err) {
    console.error('Error executing stored procedure:', err.message);
    res.status(500).send({ error: 'Error executing stored procedure' });
  }
});


// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
