import React from 'react';
import Select from 'react-select';
import { useSelector, useDispatch } from 'react-redux';

import { setWinSequence, setGameOn } from '../store/actions';

const options = [
	{ value: 3, label: 3 },
	{ value: 4, label: 4 },
	{ value: 5, label: 5 },
];

const Menu = () => {

	const state = useSelector(state => state);
	let winSequence;
	let isGameOn;

	if (!state) {
		winSequence = 3;
		isGameOn = false;
	} else {
		winSequence = state.winSequence;
		isGameOn = state.isGameOn;
	}

	const dispatch = useDispatch();

	return (
		<div className="app__menu menu">

			{!isGameOn ? (
				<div>
					<Select options={options}
									onChange={({ value }) => dispatch(setWinSequence(value))}
									value={options[winSequence]}
									className="menu__select"
									isOptionDisabled={isGameOn}
					/>

					<button className="menu__btn"
									onClick={() => dispatch(setGameOn(true))}
									disabled={isGameOn}
					>
						Play!
					</button>
				</div>
			) : (
				<p className="menu__text">{winSequence}</p>
			)}

		</div>
	)
};

export default Menu;
