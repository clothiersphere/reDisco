import {Map} from 'immutable';

// In its handler function we can actually just merge the given new state to the old state, 
// using the merge function from Map. That makes our tests pass!

function setState(state, newState) {
	return state.merge(newState);
}

export default function(state = Map(), action) {
	switch (action.type) {
		case 'SET_STATE': 
			return setState(state, action.state);
	}
	return state;
}