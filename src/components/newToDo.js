import React from "react";


const NewToDo = ({todo, ...props}) => {
	// const Finished = () => {

	// }
	const className = 'todo__list-todos__item' + (todo.completed ? ' todo-complete' : '');
	return (
		
		<li className={className} id={todo.id} onClick={props.selectToDo}>{todo.title}</li>
	);
}

export default NewToDo;