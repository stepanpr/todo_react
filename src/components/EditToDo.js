import React from "react";

class EditToDo extends React.Component {
	render() {

		// const className = this.props.editing.yes ? 'todo__form-button-editing' : 'todo__form-button';

		if (this.props.editing.yes) {
			return (
				<button onClick={this.props.editToDo} id="edit" className={"todo__form-button-editing"}>Cancel</button>
			);
		}
		if (!this.props.editing.yes) {
			return (
				<button onClick={this.props.editToDo} id="edit" className="todo__form-button">Edit</button>
			);
		}

	}
}

export default EditToDo;