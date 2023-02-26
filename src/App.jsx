import React, { Component } from 'react';
import Game from './components/game';

import './App.css'


export default class App extends Component {

	render() {

		return (
			<div className='app'>
				<Game />
			</div>
		)
	}
}
