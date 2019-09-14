export const setWinSequence = number => ({
	type: 'SET_SEQUENCE',
	number,
});

export const setGameOn = bool => ({
	type: 'SET_GAME_ON',
	bool,
});

export const makeMove = cellIndex => ({
	type: 'MAKE_MOVE',
	cellIndex,
});

