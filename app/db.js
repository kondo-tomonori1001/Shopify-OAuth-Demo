// db.js
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const connection = mysql.createPool({
  host: process.env.JAWSDB_HOST,
  user: process.env.JAWSDB_USER,
  password: process.env.JAWSDB_PASSWORD,
  database: process.env.JAWSDB_DATABASE,
  port: process.env.JAWSDB_PORT,
});

export default connection;
