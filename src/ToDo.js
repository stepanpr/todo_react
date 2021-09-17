
// import React from "react";
import React, { useState } from 'react';
import NewToDo from "./components/NewToDo";
import InputToDo from "./components/InputToDo";
import CompleteToDo from "./components/CompleteToDo"
import EditToDo from "./components/EditToDo";
import DeleteToDo from "./components/DeleteToDo";
import DeleteAll from "./components/DeleteAll"



let selectedElement = null;       							//выделенный элемент в текущий момент

const ToDo = (props) => {

	// constructor(props) {
	// 	super(props);
	// 	this.state = {
	// 		todos: [
	// 			{id: 'todo0', title: 'Hello', completed: true, selected: false},
	// 			{id: 'todo1', title: 'default todo', completed: false, selected: false},
	// 			{id: 'todo2', title: 'default todo', completed: false, selected: false},
	// 		],
	// 		// editing : false,
	// 		editing: { yes: false, value: '', }
	// 	};
	//   }

	  const [todos, setTodos] = useState([
		{id: 'todo0', title: 'Hello', completed: true, selected: false},
		{id: 'todo1', title: 'default todo', completed: false, selected: false},
		{id: 'todo2', title: 'default todo', completed: false, selected: false},
	  ]);

	  const [editing, setEditing] = useState({ yes: false, value: '', })

	//   const [selectedElement, setSelectedElement] = useState(null);




	const selectToDo = (id) => {                					//выделение элемента
		if (!editing.yes) {
			let elem = document.getElementById(id);
			let liAll = document.querySelectorAll(".todo__list-todos__item");
			let color = 'lightgray';
			if (elem.style.backgroundColor === color && elem.value !== 12345) { //если элемент уже выделен, то снимаем выделение
				elem.style.backgroundColor = 'white';
				selectedElement = null;
				console.log('selectedToDo = ' + elem);
				return ;
			}
			if ((elem.style.backgroundColor === color) && elem.value === 12345) { //если элемент (выполненный) уже выделен, то снимаем выделение
				elem.style.backgroundColor = 'lightgreen';
				selectedElement = null;
				console.log('selectedToDo = ' + elem);
				return ;
			}
			for(let i = 0; i < liAll.length; i++) {  				//снимаем выделение (если есть) со всех значений кроме выполненных
				console.log(i + ' ' + id + ' ' + liAll[i].value + ' ' + liAll[i].style.backgroundColor);
				if (liAll[i].style.backgroundColor !== 'lightgreen' && liAll[i].value !== 12345)
					liAll[i].style.backgroundColor = 'white';
				if (liAll[i].value === 12345)
					liAll[i].style.backgroundColor = 'lightgreen';
			}
			// selectedElement = id;
			selectedElement = todos.map(todo => todo.id).indexOf(id);

			// let { todos } = this.state;
			// let val = todos[selectedElement].title;
			// this.setState({
			// 	editing: { yes: true, value: val }
			// });

			console.log(' !!!' + elem.style.backgroundColor);
			// if (elem.style.backgroundColor === 'white')
			elem.style.backgroundColor = color;
			console.log('- ' + id + ' ' + elem + selectedElement);
		}
	}

	const createNewId = () => {

		while(1) {
			let newId = 'todo' + Math.floor(Math.random() * (100000000 - 1 + 1)) + 1;
			for (let i = 0; i < todos.length; i++) {
				// alert (todos.length);
				if (todos[i].id === newId)
					break ;
				if (i === todos.length-1)
					return newId;
			}
		}
	} 
	// function() { return 'todo' + Math.floor(Math.random() * (100000000 - 1 + 1)) + 1; }

	const addToDo = (todoTitle) => {           							//добавление и изменение элемента
		// console.log('EDIT');
		// alert('1111'+todos[selectedElement].title );

		if (editing.yes === true) {					//изменение элемента
			console.log('EDIT in addToDo!');

			// this.setState(state => {
			// 	let { todos } = state;
			// 	// let currentValue = todos[selectedElement].title;
			// 	// let editedValue = prompt("You can edit your ToDo: ", currentValue);
			// 	todos[selectedElement].title = todo;
			// 	return todos;
			// });
			setTodos(() => {
				let newTodos = [...todos];
				newTodos[selectedElement].title = todoTitle;
				return newTodos;
			});
			// alert('1111'+todos[selectedElement].title );
			// this.setState({
			// 	editing: { yes: false, value: '' }
			// });
			setEditing( {yes: false, value: ''} );
			return ;
		}

		// this.setState(state => {								//добавление элемента
		// 	let { todos } = state;
		// 	todos.push({
		// 		id: todos.length !== 0 ? 'todo' + todos.length : 'todo' + 0,
		// 		title: todo,
		// 		completed: false,
		// 		selected: false
		// 	});
		// 	return todos;
		// });
		let newTodo = { //формируем объект нового todo //todos.length !== 0 ? 'todo' + todos.length : 'todo' + 0
			id: createNewId(), 
			title: todoTitle,
			completed: false,
			selected: false
		};
		let newTodos = [...todos, newTodo];
		// alert(newTodos);
		setTodos(() => {
			// let newTodos = [...todos, todo];
			// newTodos.push({
			// 	id: todos.length !== 0 ? 'todo' + todos.length : 'todo' + 0,
			// 	title: todo,
			// 	completed: false,
			// 	selected: false
			// });
			return newTodos;
		});
				
		// alert(todos[selectedElement].title );
	};

	const editToDo = () => {										//редактирование элемента
		if(selectedElement == null) {
			alert("ToDo is not selected");
			return ;
		}
		if (editing.yes === true) {
			// this.setState({
			// 	editing: { yes: false, value: '' }
			// });
			setEditing( {yes: false, value: ''} )
		} else {
			// let newTodos = [...todos];
			// let val = newTodos[selectedElement].title;
			let val = todos[selectedElement].title;
			// this.setState({
			// 	editing: { yes: true, value: val }
			// });
			setEditing({yes: true, value: val})
			// console.log('EDIT : ' + this.state.editing.yes + ' ' + this.state.editing.value + ' val: ' + val);

		}
		
	}

	const setAsCompleted = () => {								//пометить как выполненный
		if (!editing.yes) {
			if(selectedElement == null) {
				alert("ToDo is not selected");
				return ;
			}
			// this.setState(state => {
			// 	let { todos } = state;
			// 	todos[selectedElement].completed = true;
			// 	return todos;
			// });
			let newTodos = [...todos];
			newTodos[selectedElement].completed = true;
			setTodos(newTodos);
		}
	}

	const deleteToDo = () => {                  	 				//удаление выделенного todo
		if (!editing.yes) {
			if (selectedElement != null) {
				// let newTodos = [...todos];
				let newTodos = todos.filter((elem) => elem.id !== todos[selectedElement].id);
				setTodos(newTodos);
				selectedElement = null;
				
				// this.setState(state => {
				// 	let { todos } = state;
				// 	// todos.splice(selectedElement, 1);
				// 	delete todos[selectedElement];
				// 	// todos.length -= 1;
				// 	selectedElement = null;
				// 	return todos;
				// });


			} else if (selectedElement == null) {
				alert("ToDo is not selected");
				return ;
			}
		}
	}

	const deleteAll = () => {             						//удаление всех завершенных todo
		if (!editing.yes) {
			if(todos.length > 0)
			{
				let newTodos = [...todos];
				setTodos(() => {

					// let { todos } = state;
					// for (let i in todos) {
					// 	delete todos[i];
					// }
					// while(todos.length > 0) {
					// 	if(todos.completed === true)
					// 		// todos.pop();
					// }
					let cntCompl = 0;
					for(let i = 0; i < newTodos.length; i++) {
						(newTodos[i] && newTodos[i].completed === true) ? cntCompl += 1 : cntCompl += 0;
						console.log('cnt ' + cntCompl);
					}
					cntCompl === 0 ? alert('Sorry, but you have not completed ToDos...') : cntCompl = window.confirm("Are you shure?");
					console.log('cnt ' + cntCompl);
					if (cntCompl === true) {
						for (let i = 0; i < newTodos.length; i++) {
							if(newTodos[i] && newTodos[i].completed === true)
							{
								console.log('del completed');
								delete newTodos[i];
							}
						}
					}
					// todos.length = 0;
					selectedElement = null;
					return newTodos;
				});
			}
			if (todos.length === 0)
				alert("ToDo List is empty...");
		}
	}

	const countElements = () => {
		let sum = 0;
		for(let i = 0; i < todos.length; i++) {
			// if(this.state.todos[i].completed === false)
			(todos[i] && todos[i].completed === false) ? sum+=1 : sum+=0 ;
		}
		let counter = document.querySelector(".counter");
		if (counter)
			sum > 0 ? counter.style.color = 'grey' : counter.style.color = 'green';

		return sum;
	}


	// render() {
		// const {todos} = this.state;
		// console.log( 'editing : ' + this.state.editing);

		return (
			<div className="todo">
				<h1 className="counter">ToDos left: {countElements()}</h1>

				<div className="todo__list">
					<ul className="todo__list-todos">
					{todos.map(todo => (
						<NewToDo selectToDo={() => selectToDo(todo.id)} todo={todo} key={todo.id} ></NewToDo>
					))}
					</ul>
				</div>


				<div className="todo__form">
					<InputToDo addToDo={addToDo} editing={editing} selected={todos[selectedElement]}></InputToDo> {/* editing??? copy? */}
					<CompleteToDo setAsCompleted={setAsCompleted}></CompleteToDo>
					<EditToDo editToDo={editToDo} editing={editing}></EditToDo>  {/* editing??? copy? */}
					<DeleteToDo deleteToDo={deleteToDo}></DeleteToDo>
					<DeleteAll deleteAll={deleteAll}></DeleteAll>
					{/* <button onClick={this.deleteAll.bind(this)} id="deleteAll" className="todo__form-button">Delete All</button> */}
				</div>
				
			</div>
		);
	// }
}

export default ToDo;
