import {Map, fromJS} from 'immutable';
import {expect} from 'chai';
import reducer from '../src/reducer';

describe('reducer', () => {
	it('handles SET_ENTRIES', () => {
		const initialState = Map();
		const action = {type: 'SET_ENTRES', entries: ['Transpotting']};
		const nextState = reducer(initialState, action);

		expect(nextState).to.equal(fromJS({
			entries: ['Trainspotting']
		}));
	});
	
	it('handles NEXT', () => {
		const initialState = fromJS({
			entries: ['Trainspotting', '28 Days Later']
		});
		const action = {type: 'NEXT'};
		const nextState = reducer(initialState, action);

		expect(nextState).to.equal(fromJS({
			vote: {
				pair: ['Trainspotting', '28 Days Later']
			},
			entries: []
		}));
	});

	it('handles VOTE', () => {
		const initialState = fromJS({
			vote: {
				pair: ['Trainspotting', '28 Days Later']
			},
			entries: []
		});
		const action = {type: 'VOTE', entry: 'Transpotting'};
		const nextState = reducer(initialState, action);

		expect(nextState).to.equal(fromJS({
			vote: {
				pair: ['Trainspotting', '28 Days Later'],
				tally: {Transpotting: 1}
			},
			entries: []
		}));
	});


	// An important additional requirement of reducers is that if they are called with an undefined state, 
	// they know how to initialize it to a meaningful value. 
	// In our case, the initial value is a Map. 
	// So, giving an undefined state should work as if an empty Map had been given:
	it('has an initial state', () => {
		const action = {type: 'SET_ENTRIES', entries: ['Trainspotting']};
		const nextState = reducer(undefined, action);
		expect(nextState).to.equal(fromJS({
			entries: ['Trainspotting']
		}));
	});

	it('can be used with reduce', () => {
		const actions = [
			{type: 'SET_ENTRIES', entries: ['Trainspotting', '28 Days Later']},
			{type: 'NEXT'},
			{type: 'VOTE', entry: 'Transpotting'},
			{type: 'VOTE', entry: '28 Days Later'},
			{type: 'VOTE', entry: 'Transpotting'},
			{type: 'NEXT'}
		];
		const finalState = actions.reduce(reducer, Map());
		expect(finalState).to.equal(fromJS({
			winner: 'Transpotting'
		}));
	});

});
