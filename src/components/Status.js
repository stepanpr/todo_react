import React from "react";
import classnames from "classnames";
// import ToDo from "../ToDo";


const Status = (props) => {

	let statusClassNames = classnames({
		'action': props.status.show === true,
		'action-error': props.status.error === true,
		'action-hide': props.status.show === false
	});

	const statusHide = () => {
		props.setStatus({show: false, value: '', error: false});
		
	}
	const show = () => {

		// if (props.status.show === false)
			// alert(props.status.show);

		if (props.status.show === true)
		{
			setTimeout(statusHide, 1400)
			return props.status.value;
		}
	}

	return (
		<div className={classnames(statusClassNames)}>{show()}</div> 
	);
}

export default Status;