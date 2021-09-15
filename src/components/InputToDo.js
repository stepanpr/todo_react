import React from "react";

class InputToDo extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			input: '',
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
		// let edVal = this.props.editing.value;
		this.setState({ input: event.target.value });
		// this.setState({ input: edVal + event.target.value });
		// console.log('EVENTTARGET' + edVal + event.target.value);
	};

	handleEnter = event => {
		if(event.key === 'Enter')
			this.addToDo();
	};


	render() {
		const { input } = this.state;

		// console.log('INPUT SELECTED' + this.props.selected);
		// console.log( 'editing in Input : ' + this.props.editing.yes + ' ' + this.props.editing.value);
		if (this.props.editing.yes) {

			return (
				<div>
					<input className="todo__form-newtodo-editing" onChange={this.inputChange} onKeyPress={this.handleEnter} value={ input }></input>
					<button className="todo__form-button-editing" onClick= {this.addToDo}>Edit value</button>
				</div>
			);
		}
		if (!this.props.editing.yes) {
			return (
				<div>
					<input className="todo__form-newtodo" onChange={this.inputChange} onKeyPress={this.handleEnter} value={ input }></input>
					<button className="todo__form-button" onClick= {this.addToDo}>Add New</button>
				</div>
			);
		}
	}
}

export default InputToDo;