import React from "react";
import classnames from 'classnames';



const NewToDo = (props) => {

	const liClassNames = classnames({
		'todo__list-todos__item': true,
		'item-completed': props.todo.completed,
		'item-selected': props.todo.selected,
	});

	const selectToDo = (event) => {

		props.selectToDo(props.todo);
	}


	return (
		<li className={classnames(liClassNames)} id={props.todo.id} onClick={selectToDo}>{props.todo.title}</li>
	);
}

export default NewToDo;