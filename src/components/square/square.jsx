import React from 'react';
import '../../App.css'
import './square.css'


function Square(props) {
	return (
		<button className="square" onClick={props.onClick}>
			{props.value}
		</button>
	);
}

export default Square

