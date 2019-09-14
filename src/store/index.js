import { doesPlayerWin } from '../helper';

const initialState = {
	isGameOn: false,
	moves: [],
	playerTurn: 0,
	winSequence: 5,
};

export const reducer = (state = initialState, action) => {
	switch (action.type) {
		case 'SET_SEQUENCE': {
			return {
				...state,
				winSequence: action.number,
			}
		}
		case 'SET_GAME_ON': {
			return {
				...state,
				isGameOn: action.bool,
			}
		}
		case 'MAKE_MOVE': {
			const cellIndex = action.cellIndex;
			const player = state.playerTurn;

			const move = {
				cellIndex,
				player,
			};

			const newMoves = [...state.moves, move];

			doesPlayerWin(newMoves, state.winSequence);

			return {
				...state,
				playerTurn: state.playerTurn ? 0 : 1,
				moves: newMoves,
			}
		}
		default: {
			return;
		}
	}
};
