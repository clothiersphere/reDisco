import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, hashHistory} from 'react-router';
import App from './components/App';
import {Voting} from './components/Voting';
import Results from './components/Results';
import Vote from './components/Vote';


const pair = ['Trainspotting', '28 Days Later'];

// We have a single route that we have configured to point to the Voting component. 
// The other thing we've done here is define a component for the root Route in the configuration, 
// which will be shared for all the concrete routes within. It's pointing to an App component

const routes = <Route component={App}>
	<Route path ="/results" component={Results} />
	<Route path ="/" component={Voting} />
</Route>;

// We now supply the Router component from the react-router package as the root component of our application, 
// instructing it to use the #hash based history mechanism (as opposed to the HTML5 history API). 
// We plug our route table into it by passing it in as a child component.

// ReactDOM.render(
// 	<Voting pair={pair} />,
// 	document.getElementById('app')
// );

ReactDOM.render(
	<Router history={hashHistory}>{routes}</Router>,
	document.getElementById('app')
);