import React from "react";
import classnames from 'classnames';


function EditToDo(props) {

	const editClassNames = classnames(
		'todo__form-button', {
		'button-editing': props.editing.yes,
	});
	

	const valueOfButton = props.editing.yes ? 'Cancel' : 'Edit';
	return (
		<button onClick={props.editToDo} id="edit" className={classnames(editClassNames)}>{valueOfButton}</button>
	);
}

export default EditToDo;