

import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import classnames from 'classnames';
import NewToDo from "./components/NewToDo";
import InputToDo from "./components/InputToDo";
import CompleteToDo from "./components/CompleteToDo"
import EditToDo from "./components/EditToDo";
import DeleteToDo from "./components/DeleteToDo";
import DeleteAll from "./components/DeleteAll"
import Status from "./components/Status"




   							

const ToDo = (props) => {

	let [todos, setTodos] = useState([
		{id: uuidv4(), title: 'Hello', completed: true, selected: false},
		{id: uuidv4(), title: 'default todo', completed: false, selected: false},
		{id: uuidv4(), title: 'default todo', completed: false, selected: false},
	]);

	const [editing, setEditing] = useState({ yes: false, value: '', })

	let [selectedElement, setSelectedElement] = useState(null);    					//выделенный элемент в текущий момент

	const [status, setStatus] = useState({show: false, value: '555', error: false});




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


	/* добавление и изменение элемента */
	const addToDo = (todoTitle) => {  
		if (todoTitle === "")
		{
			setStatus({show: true, value: "Field is empty...", error: true});
			return ;
		}
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
			id: uuidv4(), 
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
			setStatus({show: true, value: "ToDo is not selected", error: true});
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
				setStatus({show: true, value: "ToDo is not selected", error: true});
				return ;
			}
			if (todos[selectedElement].completed === true){
				setStatus({show: true, value: "This has already been done", error: true});
				return ;
			}
			let newTodos = [...todos];
			newTodos[selectedElement].completed = true;
			setTodos(newTodos);
			setStatus({show: true, value: "Congrats!", error: false});
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
				setStatus({show: true, value: "ToDo is not selected", error: true});
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
					setStatus({show: true, value: "You don't have completed ToDos", error: true});
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
				setStatus({show: true, value: "ToDo List is empty...", error: true});
		}
	}




	/* cчетчик оставшихся элементов */
	console.log(status);
	const countElements = () => {
		return todos.reduce((sum, elem) => (elem.completed === false) ? sum+=1 : sum+=0, 0);
	}

	const counterClassNames = classnames(
		'counter', {
		'counter-zero': countElements() === 0,
	  });

	return (
		<div className="todo">
			 <h1 className={ classnames(counterClassNames) }>ToDos left: {countElements()}</h1>

			<div className="todo__list">
				<ul className="todo__list-todos">
				{todos.map(todo => (
					<NewToDo selectToDo={() => selectToDo(todo)} todo={todo} key={todo.id} ></NewToDo>
				))}
				</ul>
			</div>


			<div className="todo__form">
				<InputToDo addToDo={addToDo} editing={editing} selected={todos[selectedElement]}></InputToDo>
				<div className="todo__form_actionsfield">
					<div className='todo__form_actionsfield-item'>
						<CompleteToDo setAsCompleted={setAsCompleted}></CompleteToDo>
						<EditToDo editToDo={editToDo} editing={editing}></EditToDo>
						<DeleteToDo deleteToDo={deleteToDo}></DeleteToDo>
						<DeleteAll deleteAll={deleteAll}></DeleteAll>
					</div>
					<div className='todo__form_actionsfield-item'>
						<Status status={status} setStatus={setStatus}></Status>
					</div>
				</div>


				{/* <button onClick={this.deleteAll.bind(this)} id="deleteAll" className="todo__form-button">Delete All</button> */}
			</div>
			
		</div>
	);
}

export default ToDo;
