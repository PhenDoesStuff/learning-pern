import React from 'react';
import { useState } from 'react';

const InputTodo = () => {
	const [description, setDescription] = useState('');

	const onFormSubmitHandler = async e => {
		e.preventDefault();
		try {
			const body = { description };
			const response = await fetch('http://localhost:5000/todos', {
				method: 'POST',
				headers: { 'Content-Type': 'Application/JSON' },
				body: JSON.stringify(body),
			});

			console.log(response);
		} catch (err) {
			console.error(err.message);
		}
	};

	return (
		<>
			<h1 className='text-center mt-5'>Pern Todo List</h1>
			<form className='d-flex mt-5' onSubmit={onFormSubmitHandler}>
				<input
					type='text'
					className='form-control'
					value={description}
					onChange={e => setDescription(e.target.value)}
				/>
				<button className='btn btn-success'>Add</button>
			</form>
		</>
	);
};

export default InputTodo;
