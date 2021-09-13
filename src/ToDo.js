// import logo from './logo.svg';
// import './App.css';



import React from "react";
import NewToDo from "./components/newToDo";
import './AddNew.js';
import AddNew from "./AddNew.js";
// import newToDo from "./components/newToDo";

let selectedElement;

class ToDo extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			todos: [
				{id: '0', title: 'default todo1', completed: false, selected: false},
				{id: '1', title: 'default todo2', completed: true, selected: false},
				{id: '2', title: 'default todo3', completed: false, selected: false},
			],
			selElem: null,
		};
		this.passwordRef = 'dddd44';
	  }

	// const newToDo = document.querySelector(".todo__form-newtodo");
	// const newToDo = document.querySelector("#ss");

	selectToDo = (id) => {
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
			// liAll[i].className += ' todo__list-todos__item_u';
			liAll[i].style.backgroundColor = '#fff';
		}
		selectedElement = id;
		elem.style.backgroundColor = color;
		console.log('- ' + id + ' ' + elem + selectedElement);
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



				{/************************* */}
				{/* <div className="todo__list"> */}
					{/* <ul className="todo__list-todos">
						<li className="todo__list-todos__item" id="todo0" onClick={AddNew}>default ToDo</li>
					</ul> */}
				{/* </div> */}

				<div className="todo__form">
					<form action="#">
						<input ref={ref => this.passwordRef = ref} id="login" type="text" className="todo__form-newtodo" placeholder="enter a new ToDo..."/>
						<AddNew newtodo={this.passwordRef.value} />

						<button className="button" onClick={(e)=>{
							if (this.passwordRef.value === "") {
							alert('Field is empty');
							return ;
							}
						console.log(` password: ${this.passwordRef.value}`)
						}}>Войти</button>
						
						{/* <button onClick={AddNew} id="addnew" className="todo__form-button">Add new ToDo</button> */}
						{/* <button id="delete" class="todo__form-button">Delete</button>
						<button id="delete_all" class="todo__form-button">Delete all</button>
						<button id="edit" class="todo__form-button">Edit</button>
						<button id="complete" class="todo__form-button">Set as complete</button> */}
					</form>
				</div>
				
			</div>
		);
	}
}

export default ToDo;

















// // import logo from './logo.svg';
// // import './App.css';



// import React from "react";
// import './ToDo.css';
// // import './ToDo_array';
// import './AddNew.js';
// import AddNew from "./AddNew.js";

// class ToDo extends React.Component {

// 	constructor(props) {
// 		super(props);
// 		this.passwordRef = 'dddd44';
// 	  }

// 	// const newToDo = document.querySelector(".todo__form-newtodo");
// 	// const newToDo = document.querySelector("#ss"); 

// 	render(){
// 		return (
// 			<div className="todo">

// 				<div className="todo__list">
// 					<ul className="todo__list-todos">
// 						<li className="todo__list-todos__item" id="todo0" onClick={AddNew}>default ToDo</li>
// 					</ul>
// 				</div>

// 				<div className="todo__form">
// 					<form action="#">
// 						<input ref={ref => this.passwordRef = ref} id="login" type="text" className="todo__form-newtodo" placeholder="enter a new ToDo..."/>
// 						<AddNew newToDo={this.passwordRef.value} />
// 						<button className="button" onClick={(e)=>{
// 						if (this.passwordRef.value === "") {
// 						alert('Field is empty');
// 						return ;
// 					}
// 						console.log(` password: ${this.passwordRef.value}`)
// 						}}>Войти</button>
// 						{/* <button onClick={AddNew} id="addnew" className="todo__form-button">Add new ToDo</button> */}
// 						{/* <button id="delete" class="todo__form-button">Delete</button>
// 						<button id="delete_all" class="todo__form-button">Delete all</button>
// 						<button id="edit" class="todo__form-button">Edit</button>
// 						<button id="complete" class="todo__form-button">Set as complete</button> */}
// 					</form>
// 				</div>
				
// 			</div>
// 		);
// 	}
// }

// export default ToDo;
