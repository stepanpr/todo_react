
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

		while(todos.length !== 0) {
			let newId = 'todo' + Math.floor(Math.random() * (100000000 - 1 + 1)) + 1;
			for (let i = 0; i < todos.length; i++) {
				// alert (todos.length);
				if (todos[i].id === newId)
					break ;
				if (i === todos.length-1)
					return newId;
			}
		}
		return 'todo' + Math.floor(Math.random() * (100000000 - 1 + 1)) + 1;
	} 



	const addToDo = (todoTitle) => {           							//добавление и изменение элемента

		//изменение элемента
		if (editing.yes === true) {					
			console.log('EDIT in addToDo!');
			setTodos(() => {
				let newTodos = [...todos];
				newTodos[selectedElement].title = todoTitle;
				return newTodos;
			});
			setEditing( {yes: false, value: ''} );
			return ;
		}

		//добавление элемента
		let newTodo = { //формируем объект нового todo //todos.length !== 0 ? 'todo' + todos.length : 'todo' + 0
			id: createNewId(), 
			title: todoTitle,
			completed: false,
			selected: false
		};
		let newTodos = [...todos, newTodo];
		setTodos(() => {
			return newTodos;
		});
	}

	const editToDo = () => {										//редактирование элемента
		if(selectedElement == null) {
			alert("ToDo is not selected");
			return ;
		}
		if (editing.yes === true) {

			setEditing( {yes: false, value: ''} )
		} else {
			let val = todos[selectedElement].title;
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
			let newTodos = [...todos];
			newTodos[selectedElement].completed = true;
			setTodos(newTodos);
		}
	}

	const deleteToDo = () => {                  	 				//удаление выделенного todo
		if (!editing.yes) {
			if (selectedElement != null) {

				let newTodos = todos.filter((elem) => elem.id !== todos[selectedElement].id);
				setTodos(newTodos);
				selectedElement = null;

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
				let cntCompl = 0;
				function setCompleted(elem) {
					if ((elem.completed === true)) 
					cntCompl++; 
					return elem.completed !== true
				}
				let newTodos = todos.filter(setCompleted);
				if (cntCompl === 0) {
					alert("You don't have completed ToDos");
					return ;
				}
				if (window.confirm("Are you shure?"))
				{
					setTodos(() => {
						return newTodos;
					});
				}
			}
			if (todos.length === 0)
				alert("ToDo List is empty...");
		}
	}

	const countElements = () => {
		let sum = 0;
		todos.forEach((todo) => {(todo.completed === false) ? sum+=1 : sum+=0})
		let counter = document.querySelector(".counter");
		if (counter)
			sum > 0 ? counter.style.color = 'grey' : counter.style.color = 'green';

		return sum;
	}



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
}

export default ToDo;
