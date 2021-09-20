import React, { useState } from 'react';
import classnames from 'classnames';


const InputToDo = (props) => {

	const [input, setInput] = useState('');

	const addToDo = () => {

		props.addToDo(input);
		setInput('');
	};

	const inputChange = event => {
		 setInput(event.target.value)
	};

	const handleEnter = event => {
		if(event.key === 'Enter')
			addToDo();
	};


	const inputclassNames = classnames({
		'todo__form-newtodo': true,
		'newtodo-editing': props.editing.yes,
	});
	
	const buttonclassNames = classnames({
		'todo__form-button': true,
		'todo__form-button_addnew': true,
		'button-editing': props.editing.yes,
	});
	
	const valueOfButton = props.editing.yes ? 'Edit value' : 'Add New';

	return (
		<div>
			<input className={classnames(inputclassNames)} onChange={inputChange} onKeyPress={handleEnter} value={ input }></input>
			<button className={classnames(buttonclassNames)} onClick= {addToDo}>{valueOfButton}</button>
		</div>
	);
}

export default InputToDo;