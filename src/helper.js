export const doesPlayerWin = (moves, winSequence) => {

	const [leftPlayerMoves, rightPlayerMoves] = transformToCoors(moves);

	controller(leftPlayerMoves, winSequence);

};

const transformToCoors = moves => {
	let leftPlayerMoves = [];
	let rightPlayerMoves = [];

	// build board

	for (let i = 0; i < 100; i += 10) {
		let innerIndex = 0;
		for (let j = i; j < i + 10; j++) {

			const moveIndex = moves.findIndex(m => m.cellIndex === j);
			let player;

			if (moveIndex > -1) {
				player = moves[moveIndex].player;
				if (player) {
					rightPlayerMoves.push({
						y: innerIndex + 1,
						x: i / 10 + 1,
					})
				} else {
					leftPlayerMoves.push({
						y: innerIndex + 1,
						x: i / 10 + 1,
					})
				}
			}

			innerIndex++;
		}
	}

	return [leftPlayerMoves, rightPlayerMoves];
};

const findNearest = ({ x, y }, array) => {

	// console.log(x, y, array);

	let found = false;
	let foundCell = {};

	array.forEach(cell => {
		let xMatch = false;
		let yMatch = false;
		if (cell.x === x || cell.x - 1 === x || cell.x + 1 === x) {
			xMatch = true;
		}
		if (cell.y === y || cell.y - 1 === y || cell.y + 1 === y) {
			yMatch = true;
		}
		if (xMatch && yMatch) {
			found = true;
			foundCell = cell;
		}
	});

	return {
		found,
		cell: foundCell,
	};

};

const findNextByAxis = (axis, cell, array) => {
	console.log(axis, cell, array);
	for (let i = 0; i < array.length; i++) {
		const currentCell = array[i];
		if (axis === 'x') {
			if (cell.x + 1 === currentCell.x || cell.x - 1 === currentCell.x) {
				return i;
			}
		}
		if (axis === 'y') {
			if (cell.y + 1 === currentCell.y || cell.y - 1 === currentCell.y) {
				return i;
			}
		}
		if (axis === 'xy') {
			if (cell.x + 1 === currentCell.x || cell.y + 1 === currentCell.y) {
				return i;
			}
			if (cell.x - 1 === currentCell.x || cell.y - 1 === currentCell.y) {
				return i;
			}
			if (cell.x + 1 === currentCell.x || cell.y - 1 === currentCell.y) {
				return i;
			}
			if (cell.x - 1 === currentCell.x || cell.y + 1 === currentCell.y) {
				return i;
			}
		}
	}
	return false;
};

const controller = (array, winSequence) => {
	for (let i = 0; i < array.length; i++) {

		const cell = array[i];

		let localArray = [...array];
		localArray.splice(0, i + 1);

		const near = findNearest(cell, localArray);

		if (near.found) {

			let axis;
			if (cell.x === near.cell.x) {
				axis = 'x';
			} else if (cell.y === near.cell.y) {
				axis = 'y';
			} else {
				axis = 'xy';
			}

			localArray.splice(0, i + 2);
			console.log(findNextByAxis(axis, near.cell, localArray));

			// for (let j = 1; j < winSequence; j++) {
			//
			// 	let newCell = array[i + j + 1];
			// 	localArray.splice(0, i + j + 1);
			//
			// 	let axis;
			// 	if (cell.x === near.cell.x) {
			// 		axis = 'x';
			// 	} else if (cell.y === near.cell.y) {
			// 		axis = 'y';
			// 	} else {
			// 		axis = 'xy';
			// 	}
			//
			// 	if (!localArray.length) {
			//
			// 	}
			//
			// 	findNextByAxis('x', newCell, localArray);
			// }
		}

	}
};
