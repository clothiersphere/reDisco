import {createStore} from 'redux';
import reducer from './reducer';

// So, the Redux store ties things together into something we'll be able to use as the central point of our application: 
// It holds the current state, and over time can receive actions that evolve the state from one version to the next, 
// using the core application logic we have written and exposed through the reducer.

export default function makeStore() {
	return createStore(reducer);
}