// db.js
const sql = require('mssql');

// Configuration for the database connection
const config = {
  user: 'sa',  // your database username
  password: 'muni',  // your database password
  server: 'DESKTOP-D5FBSJG',  // database server name (could be IP address or localhost)
  database: 'nodejs-mssql-db',  // the database you are connecting to
  options: {
    encrypt: true,  // for Azure
    trustServerCertificate: true  // to skip SSL verification
  }
};

// Function to connect to MSSQL and return the pool
const connectDB = async () => {
  try {
    const pool = await sql.connect(config);
    console.log('Connected to MSSQL');
    return pool;
  } catch (error) {
    console.error('Database connection failed:', error);
    process.exit(1); // Exit the app if the connection fails
  }
};

module.exports = connectDB;
