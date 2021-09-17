import React, { useState } from 'react';


const InputToDo = (props) => {

	const [input, setInput] = useState('');

	const addToDo = () => {
		if(input) {
			props.addToDo(input);
			setInput('');
		} else if (input === '')
		{
			alert('Field is empty...');
		}
	};

	const inputChange = event => {
		 setInput(event.target.value)
	};

	const handleEnter = event => {
		if(event.key === 'Enter')
			this.addToDo();
	};


		// console.log('INPUT SELECTED' + this.props.selected);
		// console.log( 'editing in Input : ' + this.props.editing.yes + ' ' + this.props.editing.value);
		// const { input } = this.state;

		const classNameInput = props.editing.yes ? 'todo__form-newtodo-editing' : 'todo__form-newtodo';
		const classNameButton = props.editing.yes ? 'todo__form-button-editing' : 'todo__form-button';
		const valueOfButton = props.editing.yes ? 'Edit value' : 'Add New';
		return (
			<div>
				<input className={classNameInput} onChange={inputChange} onKeyPress={handleEnter} value={ input }></input>
				<button className={classNameButton} onClick= {addToDo}>{valueOfButton}</button>
			</div>
		);
}

export default InputToDo;