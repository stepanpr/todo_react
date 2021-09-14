import React from "react";


const NewToDo = ({todo, ...props}) => {

	const className = 'todo__list-todos__item' + (todo.completed ? ' todo-complete' : '');

	if (todo.completed ) //выполненные (12345)
		return (
			<li className={className} value={12345} id={todo.id} onClick={props.selectToDo} style={{backgroundColor: 'lightgreen'}}>{todo.title}</li>
		);
	else
		return (	
			<li className={className} id={todo.id} onClick={props.selectToDo} style={{backgroundColor: 'white'}}>{todo.title}</li>
		);
}

export default NewToDo;