import React from "react";

function EditToDo(props) {
	
	const className = props.editing.yes ? 'todo__form-button-editing' : 'todo__form-button';
	const valueOfButton = props.editing.yes ? 'Cancel' : 'Edit';
	return (
		<button onClick={props.editToDo} id="edit" className={className}>{valueOfButton}</button>
	);
}

export default EditToDo;