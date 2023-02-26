import React, { Component } from "react";
import Board from "../board";
import calculateWinner from "../../calculate-winner";

import './game.css'
import '../../App.css'


export default class Game extends Component {

	state = {
		history: [{
			squares: Array(9).fill(null)
		}],
		stepNumber: 0,
		xIsNext: true,
	}

	jumpTo(step) {
		this.setState({
			stepNumber: step,
			xIsNext: (step % 2) === 0,
		})
	}

	handleClick(i) {
		const history = this.state.history.slice(0, this.state.stepNumber + 1);
		const current = history[history.length - 1];
		const squares = current.squares.slice();

		if (calculateWinner(squares) || squares[i]) {
			return
		}
		squares[i] = this.state.xIsNext ? 'X' : 'O';
		this.setState({
			history: history.concat([{
				squares,
			}]),
			stepNumber: history.length,
			xIsNext: !this.state.xIsNext,
		})
	}


	render() {

		const history = this.state.history;
		const current = history[this.state.stepNumber];

		const moves = history.map((el, idx) => {
			const desc = idx
				? 'Go to step: #' + idx
				: 'Go to start!';

			return (
				<li key={idx}>
					<button onClick={() => this.jumpTo(idx)}>{desc}</button>
				</li>
			)
		});

		const winner = calculateWinner(current.squares);
		let status;
		if (winner) {
			status = 'Выиграл ' + winner;
		} else {
			status = 'Следующий ход: ' + (this.state.xIsNext ? 'X' : 'O');
		}
		return (
			<div className="game">
				<div className="game-board">
					<Board
						squares={current.squares}
						onClick={(i) => this.handleClick(i)}
					/>
				</div>
				<div className="game-info">
					<div>{status}</div>
					<ol>{moves}</ol>
				</div>
			</div>
		);
	}
}