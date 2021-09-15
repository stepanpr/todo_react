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
		// console.log('INPUT SELECTED' + this.props.selected);
		// console.log( 'editing in Input : ' + this.props.editing.yes + ' ' + this.props.editing.value);

		const { input } = this.state;

		const classNameInput = this.props.editing.yes ? 'todo__form-newtodo-editing' : 'todo__form-newtodo';
		const classNameButton = this.props.editing.yes ? 'todo__form-button-editing' : 'todo__form-button';
		const valueOfButton = this.props.editing.yes ? 'Edit value' : 'Add New';
		return (
			<div>
				<input className={classNameInput} onChange={this.inputChange} onKeyPress={this.handleEnter} value={ input }></input>
				<button className={classNameButton} onClick= {this.addToDo}>{valueOfButton}</button>
			</div>
		);
	}
}

export default InputToDo;