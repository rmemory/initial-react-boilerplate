import React from 'react';
import { Switch, BrowserRouter as Router, Route } from 'react-router-dom';
import importedComponent from 'react-imported-component';

import Home from './Home.jsx';
import Loading from './Loading.jsx';

const AsyncDynamicPage = importedComponent(
	() => import(/* webpackChunkName:'DynamicPage' */ './DynamicPage.jsx'),
	{
		LoadingComponent: Loading,
	},
);
const AsyncNoMatch = importedComponent(
	() => import(/* webpackChunkName:'NoMatch' */ './NoMatch.jsx'),
	{
		LoadingComponent: Loading,
	},
);

/* Main entry point for Rect app */
const App = () =>
	(
		<Router>
			<div>
				<Switch>
					<Route exact path="/" component={Home} />
					<Route exact path="/dynamic" component={AsyncDynamicPage} />
					<Route component={AsyncNoMatch} />
				</Switch>
			</div>
		</Router>
	);

export default App;
