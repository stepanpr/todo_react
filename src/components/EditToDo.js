import React from "react";

class EditToDo extends React.Component {
	render() {
		const className = this.props.editing.yes ? 'todo__form-button-editing' : 'todo__form-button';
		const valueOfButton = this.props.editing.yes ? 'Cancel' : 'Edit';
		return (
			<button onClick={this.props.editToDo} id="edit" className={className}>{valueOfButton}</button>
		);
	}
}

export default EditToDo;