import {setEntries, next, vote, INITIAL_STATE} from './core';

// This is a small example of the kind of pattern that becomes much more important the larger an application gets: 
// The main reducer function only hands parts of the state to lower-level reducer functions. 
// We separate the job of finding the right location in the state tree from applying the update to that location.

export default function reducer(state = INITIAL_STATE, action) {
	switch (action.type) {
	case 'SET_ENTRIES': 
		return setEntries(state, action.entries);
	case 'NEXT':
		return next(state);
	case 'VOTE': 
		return state.update('vote',
											 voteState => vote(voteState, action.entry));
	}
	return state;
}