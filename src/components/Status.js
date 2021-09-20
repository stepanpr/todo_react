import React from "react";
import classnames from "classnames";
// import ToDo from "../ToDo";


const Status = (props) => {

	let timerId; 
	const statusClassNames = classnames({
		'status': props.status.show,
		'status-error': props.status.error,
		'status-hide': props.status.show === false
	});

	const statusHide = () => {
		props.setStatus({show: false, value: '', error: false});
	}

	const show = () => {

		clearInterval(timerId);
		if (props.status.show === true)
		{
			timerId = setTimeout(statusHide, 1400)
			return props.status.value;
		}
	}

	return (
		<div className={classnames(statusClassNames)}>{show()}</div> 
	);
}

export default Status;