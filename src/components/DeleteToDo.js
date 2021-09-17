import React from "react";

function DeleteToDo(props) {

	return (
		<button onClick={props.deleteToDo} id="delete" className="todo__form-button">Delete</button>
	);
}

export default DeleteToDo;