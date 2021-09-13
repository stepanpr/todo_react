import React from "react";

class DeleteToDo extends React.Component {
	render() {
		return (
			<button onClick={this.props.deleteToDo} id="delete" className="todo__form-button">Delete</button>
		);
	}
}

export default DeleteToDo;