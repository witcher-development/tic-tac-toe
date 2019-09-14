import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { makeMove } from '../store/actions';

const Board = () => {

	const state = useSelector(state => state);
	let moves;
	let isGameOn;
	let playerTurn;

	if (!state) {
		moves = [];
		isGameOn = false;
		playerTurn = 0;
	} else {
		moves = state.moves;
		isGameOn = state.isGameOn;
		playerTurn = state.playerTurn;
	}

	const cells = [...Array(100).keys()].map(cell => {

		const moveIndex = moves.findIndex(m => m.cellIndex === cell);
		let player;

		if (moveIndex > -1) {
			player = moves[moveIndex].player;
		}

		let classesArray = ['board__grid-cell'];

		if (player !== undefined) {
			if (player) {
				classesArray.push('board__grid-cell_right-player');
			} else {
				classesArray.push('board__grid-cell_left-player');
			}
		}

		return (
			<div className={classesArray.join(' ')} onClick={() => chooseCell(cell)} key={cell}>
				<div className="board__grid-cell_inner" />
			</div>
		);
	});

	const dispatch = useDispatch();

	const chooseCell = cellIndex => {
		if (isGameOn) {
			dispatch(makeMove(cellIndex));
		}
	};

	return (
		<div className="app__board board">

			<div className="board_inner">

				<div className={"board__player board__player_left " + (!playerTurn ? 'board__player_active' : '') }>x</div>

				<div className="board__grid">
					{cells}
				</div>

				<div className={"board__player board__player_right " + (playerTurn ? 'board__player_active' : '') }>o</div>

			</div>

		</div>
	)
};

export default Board;
