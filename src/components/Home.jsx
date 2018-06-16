import React from 'react';
import { Link } from 'react-router-dom';

import Layout from './Layout.jsx';

const Home = () => (
	<Layout>
		<div>
			<Link to="/timer">Navigate to Timer</Link> {/* eslint-disable-line jsx-a11y/anchor-is-valid */}
		</div>
		<div>
			<Link to="/dynamic">Navigate to Dynamic Page</Link> {/* eslint-disable-line jsx-a11y/anchor-is-valid */}
		</div>
		<div>
			<Link to="/movies">Navigate to API usage</Link> {/* eslint-disable-line jsx-a11y/anchor-is-valid */}
		</div>
		<div>
			<Link to="/modal">Navigate to modal example</Link> {/* eslint-disable-line jsx-a11y/anchor-is-valid */}
		</div>
	</Layout>
);

export default Home;
