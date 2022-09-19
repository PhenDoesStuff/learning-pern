const { Pool } = require('pg');

const pool = new Pool({
	user: 'stephenmontague',
	password: '',
	host: 'localhost',
	port: 5432,
	database: 'perntodo',
});

module.exports = pool;
