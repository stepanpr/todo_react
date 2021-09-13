
import React from "react";

class CompleteToDo extends React.Component {
	render() {
		return (
			<button onClick={this.props.setAsCompleted} id="complete" className="todo__form-button">Set as complete</button>
		);
	}
}

export default CompleteToDo;