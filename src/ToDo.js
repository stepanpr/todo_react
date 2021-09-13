// import logo from './logo.svg';
// import './App.css';



import React from "react";
import NewToDo from "./components/NewToDo";
import InputToDo from "./components/InputToDo";
import CompleteToDo from "./components/CompleteToDo"
import EditToDo from "./components/EditToDo";
import DeleteToDo from "./components/DeleteToDo";
import DeleteAll from "./components/DeleteAll"


let selectedElement = null;       //выделенный элемент в текущий момент

class ToDo extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			todos: [
				{id: 'todo0', title: 'default todo1', completed: false, selected: false},
				{id: 'todo1', title: 'default todo2', completed: true, selected: false},
				{id: 'todo2', title: 'default todo3', completed: false, selected: false},
			]
		};
	  }

	addToDo = todo => {           //добавление элемента
		this.setState(state => {
			let { todos } = state;
			todos.push({
				id: todos.length !== 0 ? 'todo' + todos.length : 0,
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

	deleteToDo = () => {                   //удаление выделенного todo
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

	deleteAll = () => {             		//удаление всех todo
		if(this.state.todos.length > 0 && window.confirm("Are you shure?") )
		{
			this.setState(state => {
				let { todos } = state;
				// for (let i in todos) {
				// 	delete todos[i];
				// }
				while(todos.length > 0)
					todos.pop();
				todos.length = 0;
				selectedElement = null;
				return todos;
			});
		}
		if (this.state.todos.length === 0)
			alert("ToDo List is empty...");
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
					{/* <DeleteAll deleteAll={this.DeleteAll}></DeleteAll> */}
					<DeleteAll deleteAll={this.deleteAll}></DeleteAll>

					{/* <button onClick={this.deleteAll.bind(this)} id="deleteAll" className="todo__form-button">Delete All</button> */}
					{/* <button onClick={this.editToDo} id="complete" className="todo__form-button">Edit</button> */}

				</div>
				
			</div>
		);
	}
}

export default ToDo;
