// config/db.js
const pgp = require('pg-promise')();

// Database connection string
const db = pgp('postgres://postgres:shreya@31@localhost:5432/students');

module.exports = db;
