import React from "react";


const NewToDo = (props) => {


	let className = 'todo__list-todos__item' + (props.todo.completed ? ' todo-complete' : '');

	const selectToDo = (event) => {

		props.selectToDo(props.todo);
	}
	
	if (props.todo.completed && !props.todo.selected)
		return (
			<li className={className} id={props.todo.id} onClick={selectToDo} style={{backgroundColor: 'lightgreen'}}>{props.todo.title}</li>
		);
	else if (props.todo.completed && props.todo.selected)
		return (
			<li className={className} id={props.todo.id} onClick={selectToDo} style={{backgroundColor: 'gray'}}>{props.todo.title}</li>
		);
	else if (!props.todo.completed && props.todo.selected)
		return (
			<li className={className} id={props.todo.id} onClick={selectToDo} style={{backgroundColor: 'gray'}}>{props.todo.title}</li>
		);
	else if (!props.todo.completed && !props.todo.selected)
		return (	
			<li className={className} id={props.todo.id} onClick={selectToDo} style={{backgroundColor: 'white'}}>{props.todo.title}</li>
		);
}

export default NewToDo;