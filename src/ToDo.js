
import React from "react";
import NewToDo from "./components/NewToDo";
import InputToDo from "./components/InputToDo";
import CompleteToDo from "./components/CompleteToDo"
import EditToDo from "./components/EditToDo";
import DeleteToDo from "./components/DeleteToDo";
import DeleteAll from "./components/DeleteAll"


let selectedElement = null;       							//выделенный элемент в текущий момент

class ToDo extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			todos: [
				{id: 'todo0', title: 'Hello', completed: true, selected: false},
				{id: 'todo1', title: 'default todo', completed: false, selected: false},
				{id: 'todo2', title: 'default todo', completed: false, selected: false},
			]
		};
	  }

	addToDo = todo => {           							//добавление элемента
		this.setState(state => {
			let { todos } = state;
			todos.push({
				id: todos.length !== 0 ? 'todo' + todos.length : 'todo' + 0,
				title: todo,
				completed: false,
				selected: false
			});
			return todos;
		});
	};



	selectToDo = (id) => {                					//выделение элемента
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
		selectedElement = this.state.todos.map(todo => todo.id).indexOf(id);
		console.log(' !!!' + elem.style.backgroundColor);
		// if (elem.style.backgroundColor === 'white')
		elem.style.backgroundColor = color;
		console.log('- ' + id + ' ' + elem + selectedElement);
	}

	editToDo = () => {										//редактирование элемента
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

	setAsCompleted = () => {								//пометить как выполненный
		if(selectedElement == null) {
			alert("ToDo is not selected");
			return ;
		}
		this.setState(state => {
			let { todos } = state;
			todos[selectedElement].completed = true;
			return todos;
		});
	}

	deleteToDo = () => {                  	 				//удаление выделенного todo
		if (selectedElement != null) {
			this.setState(state => {
				let { todos } = state;
				// todos.splice(selectedElement, 1);
				delete todos[selectedElement];
				// todos.length -= 1;
				selectedElement = null;
				return todos;
			});
		} else if (selectedElement == null) {
			alert("ToDo is not selected");
			return ;
		}
	}

	deleteAll = () => {             						//удаление всех todo
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

	countElements = () => {
		let sum = 0;
		for(let i = 0; i < this.state.todos.length; i++) {
			// if(this.state.todos[i].completed === false)
			(this.state.todos[i] && this.state.todos[i].completed === false) ? sum+=1 : sum+=0 ;
		}
		let counter = document.querySelector(".counter");
		if (counter)
			sum > 0 ? counter.style.color = 'grey' : counter.style.color = 'green';

		return sum;
	}


	render() {
		const {todos} = this.state;

		return (
			<div className="todo">
				<h1 className="counter">ToDos left: {this.countElements()}</h1>

				<div className="todo__list">
					<ul className="todo__list-todos">
					{todos.map(todo => (
						<NewToDo selectToDo={() => this.selectToDo(todo.id)} todo={todo} key={todo.id} ></NewToDo>
					))}
					</ul>
				</div>


				<div className="todo__form">
					<InputToDo addToDo={this.addToDo}></InputToDo>
					<CompleteToDo setAsCompleted={this.setAsCompleted}></CompleteToDo>
					<EditToDo editToDo={this.editToDo}></EditToDo>
					<DeleteToDo deleteToDo={this.deleteToDo}></DeleteToDo>
					<DeleteAll deleteAll={this.deleteAll}></DeleteAll>
					{/* <button onClick={this.deleteAll.bind(this)} id="deleteAll" className="todo__form-button">Delete All</button> */}
				</div>
				
			</div>
		);
	}
}

export default ToDo;
