const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const pool = require('./db');

// middleware to make sure we can get past CORS
app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept, Authorization'
	);
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
	next();
});
app.use(bodyParser.json());

// ROUTES

// Create a Todo
app.post('/todos', async (req, res, next) => {
	let newTodo;
	try {
		const { description } = req.body;
		newTodo = await pool.query(
			'INSERT INTO todo (description) VALUES($1)',
			[description]
		);
	} catch (err) {
		return next(err);
	}

	res.status(201).json(newTodo);
});

// Get All Todos
app.get('/todos', async (req, res, next) => {
	let allTodos;
	try {
		allTodos = await pool.query('SELECT * FROM todo;');
	} catch (error) {
		return next(error);
	}
	res.status(200).json(allTodos.rows);
});

// Get a Todo

// Update a Todo

app.listen(5000);
