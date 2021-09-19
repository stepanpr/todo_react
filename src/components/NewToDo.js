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

	// if (props.todo.completed && !props.todo.selected)
	// 	return (
	// 		<li className={classnames(liClassNames)} id={props.todo.id} onClick={selectToDo} style={{backgroundColor: 'lightgreen'}}>{props.todo.title}</li>
	// 	);
	// else if (props.todo.completed && props.todo.selected)
	// 	return (
	// 		<li className={liClassNames} id={props.todo.id} onClick={selectToDo} style={{backgroundColor: 'lightgray'}}>{props.todo.title}</li>
	// 	);
	// else if (!props.todo.completed && props.todo.selected)
	// 	return (
	// 		<li className={liClassNames} id={props.todo.id} onClick={selectToDo} style={{backgroundColor: 'lightgray'}}>{props.todo.title}</li>
	// 	);
	// else if (!props.todo.completed && !props.todo.selected)
	// 	return (	
	// 		<li className={liClassNames} id={props.todo.id} onClick={selectToDo} style={{backgroundColor: 'white'}}>{props.todo.title}</li>
	// 	);
}

export default NewToDo;