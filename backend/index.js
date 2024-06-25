const express = require('express');
const sql = require('mssql');
const cors = require('cors'); // Import cors
require('dotenv').config();

const app = express();
const port = 5000;

app.use(cors()); // Use cors middleware

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_DATABASE,
  options: {
    encrypt: false,
    enableArithAbort: true
  }
};

sql.connect(config).then(pool => {
  if (pool.connecting) {
    console.log('Connecting to the database...');
  }
  if (pool.connected) {
    console.log('Connected to the database.');
  }
}).catch(err => console.error('Database connection failed:', err));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/db', async (req, res) => {
  try {
    const pool = await sql.connect(config);
    const result = await pool.request().query('SELECT GETDATE() as now');
    res.json(result.recordset);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
