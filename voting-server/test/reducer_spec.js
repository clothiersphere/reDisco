import {Map, fromJS} from 'immutable';
import {expect} from 'chai';
import reducer from '../src/reducer';

// describe('reducer', ()=> {
// 	it('handles SET_ENTRIES', () => {
// 		const initialState = Map();
// 		const action = {type: 'SET_ENTRES', entries: ['Transpotting']};
// 		const nextState = reducer(initialState, action);

// 		expect(nextState).to.equal(fromJS({
// 			entries: ['Trainspotting']
// 		}));
// 	});
	
// 	it('handles NEXT', () => {
// 		const initialState = fromJS({
// 			entries: ['Trainspotting', '28 Days Later']
// 		});
// 		const action = {type: 'NEXT'};
// 		const nextState = reducer(initialState, action);

// 		expect(nextState).to.equal(fromJS({
// 			vote: {
// 				pair: ['Trainspotting', '28 Days Later']
// 			},
// 			entries: []
// 		}));
// 	});

// });
