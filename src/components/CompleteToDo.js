
import React from "react";

const CompleteToDo = (props) => {
	
	return (
		<button onClick={props.setAsCompleted} id="complete" className="todo__form-button">Set as complete</button>
	);
}

export default CompleteToDo;