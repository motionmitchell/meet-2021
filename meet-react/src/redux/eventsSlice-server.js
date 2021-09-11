import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
const server = 'https://ryanm-todos.herokuapp.com/';
//const server = 'http://localhost:5000/';

export const getTodoList = createAsyncThunk(
	'todos/getTodoList',
	async () => {
		const resp = await fetch(server+'todos');
		if (resp.ok) {
			const todos = await resp.json();
			saveTodoList (todos);  // put into local storage (cache)
			return { todos };
		}else {
			const todos = fetchTodoList();
			return {todos}
		}
		return {todos}
	}
);
const fetchTodoList = () => {
	let tList = todoList;
	let temp = localStorage.getItem("TODOS");
	console.log("TEMP", temp);
	if (temp === null) {
		localStorage.setItem("TODOS", JSON.stringify(todoList));
	} else {
		tList = JSON.parse(temp);
	}
	console.log("todoList", tList);
	return tList;
}
const saveTodoList = (tl) => {
	localStorage.setItem("TODOS", JSON.stringify(tl));
}
export const addTodoItem = createAsyncThunk(
	'todos/addTodoItem',
	async (payload) => {
		const resp = await fetch(server+'todos', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ task: payload.task }),
		});

		if (resp.ok) {
			const todo = await resp.json();
			return { todo };
		}
	}
);

export const deleteTodoItem = createAsyncThunk(
	'todos/deleteTodoItem',
	async (payload) => {
		const resp = await fetch(`${server}todos/${payload.id}`, {
			method: 'DELETE',
		});

		if (resp.ok) {
			return { id: payload.id };
		}
	}
);

export const todoSlice = createSlice({
	name: 'todos',
	initialState: [],
	reducers: {
		addTodo: (state, action) => {
			const todo = {
				id: new Date().getTime(),
				task: action.payload.task
				
			};
			state.push(todo);
		},
		toggleComplete: (state, action) => {
			const index = state.findIndex((todo) => todo.id === action.payload.id);
			
		},
		deleteTodo: (state, action) => {
			return state.filter((todo) => todo.id !== action.payload.id);
		},
	},
	extraReducers: {
		[getTodoList.fulfilled]: (state, action) => {
			return action.payload.todos;
		},
		[addTodoItem.fulfilled]: (state, action) => {
			state.push(action.payload.todo);
		},
		
		[deleteTodoItem.fulfilled]: (state, action) => {
			return state.filter((todo) => todo.id !== action.payload.id);
		},
	},
});

export const { addTodo, deleteTodo } = todoSlice.actions;

export default todoSlice.reducer;