import React from 'react';
import { Link } from 'react-router-dom';

import Layout from './Layout.jsx';

const Home = () => (
	<Layout>
		<div>
			<Link to="/basic">Navigate to basic example</Link> {/* eslint-disable-line jsx-a11y/anchor-is-valid */}
		</div>
		<div>
			<Link to="/context">Navigate to context API example</Link> {/* eslint-disable-line jsx-a11y/anchor-is-valid */}
		</div>
		<div>
			<Link to="/dynamic">Navigate to dynamic page example</Link> {/* eslint-disable-line jsx-a11y/anchor-is-valid */}
		</div>
		<div>
			<Link to="/movies">Navigate to API example</Link> {/* eslint-disable-line jsx-a11y/anchor-is-valid */}
		</div>
		<div>
			<Link to="/modal">Navigate to modal example</Link> {/* eslint-disable-line jsx-a11y/anchor-is-valid */}
		</div>
		<div>
			<Link to="/bikes">Navigate to bike store example</Link> {/* eslint-disable-line jsx-a11y/anchor-is-valid */}
		</div>
	</Layout>
);

export default Home;
