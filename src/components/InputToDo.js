import React from "react";

class InputToDo extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			input: ''
		};
	}

	addToDo = () => {
		const { input } = this.state;
		if(input){
			this.props.addToDo(input);
			this.setState({input: ''});
		} else if (input === '')
		{
			alert('Field is empty...');
		}
	};

	inputChange = event => {
		this.setState({ input: event.target.value });
	};

	handleEnter = event => {
		if(event.key === 'Enter')
			this.addToDo();
	}

	render() {
		const { input } = this.state;
		return (
			<div>
				<form action="#">
					<input className="todo__form-newtodo" onChange={this.inputChange} onKeyPress={this.handleEnter} value={ input }></input>
					<button className="todo__form-button" onClick= {this.addToDo}>Add New</button>
				</form>
			</div>
		);
	}

}

export default InputToDo;