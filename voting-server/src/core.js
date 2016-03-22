import {List, Map} from 'immutable';

export function setEntries(state, entries) {
	return state.set('entries', List(entries));
}

// The implementation for this will merge an update into the old state, 
// where the first two entries are put in one List, and the rest in the new version of entries:
// export function next(state) {
// 	const entries = state.get('entries');
// 	return state.merge({
// 		vote: Map({pair: entries.take(2)}),
// 		entries: entries.skip(2)
// 	});
// }

// Using updateIn makes this pleasingly succinct. What the code expresses is 
// "reach into the nested data structure path ['vote', 'tally', 'Trainspotting'], and apply this function there. 
// If there are keys missing along the path, create new Maps in their place. 
// If the value at the end is missing, initialize it with 0".
export function vote(state, entry) {
	return state.updateIn(
		['vote', 'tally', entry], 
		0, 
		tally => tally + 1
	);
}

function getWinners(vote) {
	if (!vote) return [];
	const [a, b] = vote.get('pair');
	const aVotes = vote.getIn(['tally', a], 0);
	const bVotes = vote.getIn(['tally', b], 0);
	if 			(aVotes > bVotes) return [a];
	else if (bVotes < bVotes) return [b];
	else 											return [a,b];
}

// In the implementation we'll just concatenate the "winners" of the current vote to the entries. 
// We can find those winners with a new function called getWinners:

// We could have just returned Map({winner: entries.first()}) here. But instead we still take the old state 
// as the starting point and explicitly remove 'vote' and 'entries' keys from it. The reason for this is future-proofing: 
// At some point we might have some unrelated data in the state, and it should pass through this function unchanged. 
// It is generally a good idea in these state transformation functions to always morph the old state into the new one instead of building the new state completely from scratch.
export function next(state) {
	const entries = state.get('entries')
											 .concat(getWinners(state.get('vote')));
	if (entries.size === 1) {
		return state.remove('vote')
								.remove('entries')
								.set('winner', entries.first());
	} else {						
		return state.merge({
			vote: Map({pair: entries.take(2)}),
			entries: entries.skip(2)
		});
	}	
}