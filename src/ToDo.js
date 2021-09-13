// import logo from './logo.svg';
// import './App.css';



import React from "react";
import NewToDo from "./components/NewToDo";
import InputToDo from "./components/InputToDo";
import CompleteToDo from "./components/CompleteToDo"
import EditToDo from "./components/EditToDo";
import DeleteToDo from "./components/DeleteToDo";


let selectedElement = null;       //выделенный элемент в текущий момент

class ToDo extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			todos: [
				{id: '0', title: 'default todo1', completed: false, selected: false},
				{id: '1', title: 'default todo2', completed: true, selected: false},
				{id: '2', title: 'default todo3', completed: false, selected: false},
			]
		};
	  }

	addToDo = todo => {           //добавление элемента
		this.setState(state => {
			let { todos } = state;
			todos.push({
				id: todos.length !== 0 ? todos.length : 0,
				title: todo,
				completed: false,
				selected: false
			});
			return todos;
		});
	};



	selectToDo = (id) => {                //выделение элемента
		// let a = document.querySelector(`#${id}`).value;
		let elem = document.getElementById(id);
		let liAll = document.querySelectorAll(".todo__list-todos__item");
		let color = 'green';
		if (elem.style.backgroundColor === color) { //если элемент уже выделен, то снимаем выделение
			elem.style.backgroundColor = '#fff';
			selectedElement = null;
			console.log('selectedToDo = ' + elem);
			return ;
		}
		for(let i = 0; i < liAll.length; i++) {  //снимаем выделение (если есть) со всех значений
			console.log(i + ' ' + id);
			liAll[i].style.backgroundColor = '#fff';
		}
		// selectedElement = id;
		selectedElement = this.state.todos.map(todo => todo.id).indexOf(id);
		elem.style.backgroundColor = color;
		console.log('- ' + id + ' ' + elem + selectedElement);
	}

	editToDo = () => {								//редактирование элемента
		if(selectedElement == null) {
			alert("ToDo is not selected");
			return ;
		}
		this.setState(state => {
			let { todos } = state;
			let currentValue = todos[selectedElement].title;
			let editedValue = prompt("You can edit your ToDo: ", currentValue);
			todos[selectedElement].title = editedValue;
			return todos;
		});
	}

	setAsCompleted = () => {						//пометить как выполненный
		if(selectedElement == null) {
			alert("ToDo is not selected");
			return ;
		}
		this.setState(state => {
			let { todos } = state;
			todos[selectedElement].completed = true;
			return todos;
		});
		// todos[selectedToDo].classList.add('todo-complete');
	}

	deleteToDo = () => {
		if (selectedElement != null) {
			this.setState(state => {
				let { todos } = state;
				todos.splice(selectedElement, 1);
				selectedElement = null;
				return todos;
			});
		} else if (selectedElement == null) {
			alert("ToDo is not selected");
			return ;
		}
	}




	render() {
		const {todos} = this.state;

		return (
			<div className="todo">
				<h1 className="title">ToDos: {todos.length}</h1>
				<div className="todo__list">
					<ul className="todo__list-todos">
					{todos.map(todo => (
						<NewToDo selectToDo={() => this.selectToDo(todo.id)} todo={todo} key={todo.id} ></NewToDo>
					))}
						{/* <li className="todo__list-todos__item" id="todo0" onClick={AddNew}>default ToDo</li> */}
					</ul>
				</div>


				<div className="todo__form">
					<InputToDo addToDo={this.addToDo}></InputToDo>
					<CompleteToDo setAsCompleted={this.setAsCompleted}></CompleteToDo>
					<EditToDo editToDo={this.editToDo}></EditToDo>
					<DeleteToDo deleteToDo={this.deleteToDo}></DeleteToDo>

					{/* <button onClick={this.deleteToDo} id="delete" className="todo__form-button">Delete</button> */}
					{/* <button onClick={this.editToDo} id="complete" className="todo__form-button">Edit</button> */}

				</div>
				
			</div>
		);
	}
}

export default ToDo;
