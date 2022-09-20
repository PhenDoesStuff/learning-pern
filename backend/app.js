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
			'INSERT INTO todo (description) VALUES($1) RETURNING *',
			[description]
		);
	} catch (err) {
		return next(err);
	}

	res.status(201).json({ todo: newTodo.rows[0] });
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
app.get('/todos/:id', async (req, res, next) => {
	let todo;
	try {
		const { id } = req.params;
		todo = await pool.query('SELECT * FROM todo where todo_id = $1', [id]);
	} catch (error) {
		return next(error.message);
	}
	res.status(200).json({ todo: todo.rows });
});

// Update a Todo
app.put('/todos/:id', async (req, res, next) => {
	let todo;
	try {
		const { id } = req.params;
		const { description } = req.body;
		const todo = await pool.query(
			'UPDATE todo SET description = $1 WHERE todo_id = $2',
			[description, id]
		);
	} catch (error) {
		return next(error.message);
	}
	res.status(201).json({ updatedTodo: todo });
});

// Delete a Todo
app.delete('/todos/:id', async (req, res, next) => {
	const { id } = req.params;
	try {
		const deletedTodo = await pool.query(
			'DELETE FROM todo WHERE todo_id = $1',
			[id]
		);
	} catch (error) {
		return next(error.message);
	}
	res.status(200).json(`Todo with ID ${id} was deleted.`);
});

app.listen(5000);
