
import React from "react";
import './ToDo_array';
import './ToDo.js';

function AddNew(props)
{
	// function handleClick(props) {
	// 	if (props.newToDo === "") {
	// 		alert('Field is empty');
	// 		return ;
	// 	}
	// 	console.log(props.newToDo);
	// }

		return(
			<button onClick={() => console.log(props.newtodo)} id="addnew" className="todo__form-button">
				Add new ToDo
			</button>
		);
}

// class AddNew extends React.Component {

// 	handleClick(props){
// 		if (props.newToDo === "") {
// 			alert('Field is empty');
// 			return ;
// 		}
// 		console.log(props.newtodo);
// 	}
// 	render(){
// 		return(
// 			<button onClick={() => console.log(this.props.newtodo)} id="addnew" className="todo__form-button">
// 				Add new ToDo
// 			</button>
// 		);
// 	}

// }

// function AddNew(a) {

// 	// return(console.log(` password: ${a}`));
// 		if (a === "") {
// 		alert('Field is empty');
// 		return ;
// 		}
// 		console.log(` password: ${a}`)

// }



export default AddNew;