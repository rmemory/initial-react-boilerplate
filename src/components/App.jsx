import React from 'react';
import { Switch, BrowserRouter as Router, Route } from 'react-router-dom';
import importedComponent from 'react-imported-component';

import Home from './Home.jsx';
import Loading from './Loading.jsx';
import BasicComponent from './basic/BasicComponent.js';
import Context from './context/Context.jsx';
import StorePicker from './bike/StorePicker.jsx';
import BikeStore from './bike/BikeStore.jsx';
import MoviesList from './api/MoviesList.jsx';
import MovieDetail from './api/MovieDetail.jsx';
import ModalBase from './modal/ModalBase.jsx';

/* Imported/dynamic components can be server side rendered.
   See:
   https://www.npmjs.com/package/react-imported-component
   https://github.com/theKashey/react-imported-component */
const AsyncDynamicPage = importedComponent(
	() => import(/* webpackChunkName:'DynamicPage' */ './dynamic/DynamicPage.jsx'),
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
					<Route path="/basic" component={BasicComponent} />
					<Route path="/context" component={Context} />
					<Route exact path="/movies" component={MoviesList} />
					<Route path="/movies/:id" component={MovieDetail} />
					<Route exact path="/bikes" component={StorePicker} />
					<Route path="/bikes/:storeId" component={BikeStore} />
					<Route path="/modal" component={ModalBase} />
					<Route path="/dynamic" component={AsyncDynamicPage} />
					<Route component={AsyncNoMatch} />
				</Switch>
			</div>
		</Router>
	);

export default App;
