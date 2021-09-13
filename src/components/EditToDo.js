import React from "react";

class EditToDo extends React.Component {
	render() {
		return (
			<button onClick={this.props.editToDo} id="edit" className="todo__form-button">Edit</button>
		);
	}
}

export default EditToDo;