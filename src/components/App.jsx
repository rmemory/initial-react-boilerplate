import React from 'react';
import { Switch, BrowserRouter as Router, Route } from 'react-router-dom';

import Home from './application/Home.jsx';
import DynamicPage from './application/DynamicPage.jsx';
import NoMatch from './NoMatch.jsx';

/* Main entry point for Rect app */
const App = () => {
	return (
		<Router>
			<div>
				<Switch>
					<Route exact path="/" component={Home} />
					<Route exact path="/dynamic" component={DynamicPage} />
					<Route component={NoMatch} />
				</Switch>
			</div>
		</Router>
	);
};

export default App;