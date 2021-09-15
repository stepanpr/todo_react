
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
			],
			// editing : false,
			editing: { yes: false, value: '', }
		};
	  }




	selectToDo = (id) => {                					//выделение элемента
		if (!this.state.editing.yes) {
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



	addToDo = (todo) => {           							//добавление и изменение элемента
		// console.log('EDIT');

		if (this.state.editing.yes === true) {					//изменение элемента
			console.log('EDIT in addToDo!');
			this.setState(state => {
				let { todos } = state;
				// let currentValue = todos[selectedElement].title;
				// let editedValue = prompt("You can edit your ToDo: ", currentValue);
				todos[selectedElement].title = todo;
				return todos;
			});

			this.setState({
				editing: { yes: false, value: '' }
			});
			return ;
		}

		this.setState(state => {								//изменение элемента
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

	editToDo = () => {										//редактирование элемента
		if(selectedElement == null) {
			alert("ToDo is not selected");
			return ;
		}
		if (this.state.editing.yes === true) {
			this.setState({
				editing: { yes: false, value: '' }
			});
		} else {
			let { todos } = this.state;
			let val = todos[selectedElement].title;
			this.setState({
				editing: { yes: true, value: val }
			});
			// console.log('EDIT : ' + this.state.editing.yes + ' ' + this.state.editing.value + ' val: ' + val);

		}
		
	}

	setAsCompleted = () => {								//пометить как выполненный
		if (!this.state.editing.yes) {
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
	}

	deleteToDo = () => {                  	 				//удаление выделенного todo
		if (!this.state.editing.yes) {
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
	}

	deleteAll = () => {             						//удаление всех завершенных todo
		if (!this.state.editing.yes) {
			if(this.state.todos.length > 0)
			{
				this.setState(state => {
					let { todos } = state;
					// for (let i in todos) {
					// 	delete todos[i];
					// }
					// while(todos.length > 0) {
					// 	if(todos.completed === true)
					// 		// todos.pop();
					// }
					let cntCompl = 0;
					for(let i = 0; i < todos.length; i++) {
						(todos[i] && todos[i].completed === true) ? cntCompl += 1 : cntCompl += 0;
						console.log('cnt ' + cntCompl);
					}
					cntCompl === 0 ? alert('Sorry, but you have not completed ToDos...') : cntCompl = window.confirm("Are you shure?");
					console.log('cnt ' + cntCompl);
					if (cntCompl === true) {
						for (let i = 0; i < todos.length; i++) {
							if(todos[i] && todos[i].completed === true)
							{
								console.log('del completed');
								delete todos[i];
							}
						}
					}
					// todos.length = 0;
					selectedElement = null;
					return todos;
				});
			}
			if (this.state.todos.length === 0)
				alert("ToDo List is empty...");
		}
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
		console.log( 'editing : ' + this.state.editing);

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
					<InputToDo addToDo={this.addToDo} editing={this.state.editing} selected={todos[selectedElement]}></InputToDo>
					<CompleteToDo setAsCompleted={this.setAsCompleted}></CompleteToDo>
					<EditToDo editToDo={this.editToDo} editing={this.state.editing}></EditToDo>
					<DeleteToDo deleteToDo={this.deleteToDo}></DeleteToDo>
					<DeleteAll deleteAll={this.deleteAll}></DeleteAll>
					{/* <button onClick={this.deleteAll.bind(this)} id="deleteAll" className="todo__form-button">Delete All</button> */}
				</div>
				
			</div>
		);
	}
}

export default ToDo;
