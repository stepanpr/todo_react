import React from "react";

class DeleteAll extends React.Component {
	render() {
		return (
			<button onClick={this.props.deleteAll} id="deleteAll" className="todo__form-button">Delete Completed</button>
		);
	}
}

export default DeleteAll;
