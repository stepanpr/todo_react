

import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import NewToDo from "./components/NewToDo";
import InputToDo from "./components/InputToDo";
import CompleteToDo from "./components/CompleteToDo"
import EditToDo from "./components/EditToDo";
import DeleteToDo from "./components/DeleteToDo";
import DeleteAll from "./components/DeleteAll"



   							

const ToDo = (props) => {

	let [todos, setTodos] = useState([
		{id: uuidv4(), title: 'Hello', completed: true, selected: false},
		{id: uuidv4(), title: 'default todo', completed: false, selected: false},
		{id: uuidv4(), title: 'default todo', completed: false, selected: false},
	]);

	const [editing, setEditing] = useState({ yes: false, value: '', })

	let [selectedElement, setSelectedElement] = useState(null);    					//выделенный элемент в текущий момент




    /* выделение элемента */ 
	const selectToDo = (todo) => {
		
		if (!editing.yes) {
			let indexOfCurrent = todos.map((elem) => { return elem.id;}).indexOf(todo.id);
			setSelectedElement(indexOfCurrent);
			console.log(indexOfCurrent + ' ' + selectedElement);

			let newTodos = [...todos];

			if (todo.selected === true) { 								//если элемент (выполненный) уже выделен, то снимаем выделение
				newTodos[indexOfCurrent].selected = false;
				setTodos(newTodos);
				setSelectedElement(null);
				return ;
			}

			newTodos.map((elem) => elem.selected = false); 				//снимаем выделение (если есть) со всех значений кроме выполненных
			newTodos[indexOfCurrent].selected = true;					//меняем поле selected текущего элемента на true

			setTodos(newTodos);
		}
	}


	// /* создание нового ID */
	// const createNewId = () => {

	// 	while(todos.length !== 0) {
	// 		let newId = 'todo' + Math.floor(Math.random() * (100000000 - 1 + 1)) + 1;
	// 		for (let i = 0; i < todos.length; i++) {
	// 			if (todos[i].id === newId)
	// 				break ;
	// 			if (i === todos.length-1)
	// 				return newId;
	// 		}
	// 	}
	// 	return 'todo' + Math.floor(Math.random() * (100000000 - 1 + 1)) + 1;
	// } 


	/* добавление и изменение элемента */
	const addToDo = (todoTitle) => {  

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
		let newTodo = { 											//формируем объект нового todo
			id: uuidv4(), //createNewId(), 
			title: todoTitle,
			completed: false,
			selected: false
		};
		let newTodos = [...todos, newTodo];
		setTodos(newTodos);
	}


	/* редактирование элемента */
	const editToDo = () => {				
		if(selectedElement == null) {
			alert("ToDo is not selected");
			return ;
		}
		if (editing.yes === true) {

			setEditing( {yes: false, value: ''} )
		} else {
			let val = todos[selectedElement].title;
			setEditing({yes: true, value: val})
		}
		
	}


	/* пометить как выполненный */
	const setAsCompleted = () => {	
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

	/* удаление выделенного todo */
	const deleteToDo = () => {
		if (!editing.yes) {
			if (selectedElement != null) {

				let newTodos = todos.filter((elem) => elem.id !== todos[selectedElement].id);
				setTodos(newTodos);
				setSelectedElement(null);

			} else if (selectedElement == null) {
				alert("ToDo is not selected");
				return ;
			}
		}
	}

	/* удаление всех завершенных todo */
	const deleteAll = () => {
		if (!editing.yes) {
			if(todos.length > 0)
			{
				let cntCompl = 0;
				let newTodos = todos.reduce((newArr, elem) => { 
					elem.completed === true ? cntCompl++ : newArr = [...newArr, elem]; 
					return newArr; 
				}, []);

				if (cntCompl === 0) {
					alert("You don't have completed ToDos");
					return ;
				}
				if (window.confirm("Are you shure?"))
				{
					setTodos(() => {
						return newTodos;
					});
					setSelectedElement(null);
				}
			}
			else if (todos.length === 0)
				alert("ToDo List is empty...");
		}
	}

	/* cчетчик оставшихся элементов */
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
					<NewToDo selectToDo={() => selectToDo(todo)} todo={todo} key={todo.id} ></NewToDo>
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
