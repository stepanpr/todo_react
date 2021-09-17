import React from "react";

const DeleteAll = (props) => {

	return (
		<button onClick={props.deleteAll} id="deleteAll" className="todo__form-button">Delete Completed</button>
	);
}

export default DeleteAll;
