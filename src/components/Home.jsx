import React from 'react';
import { Link } from 'react-router-dom';

import Layout from './Layout.jsx';

const Home = () =>
	(
		<Layout>
			<p>Hello World the of React and Webpack!</p>
			<p>
				<Link to="/dynamic">Navigate to Dynamic Page</Link> {/* eslint-disable-line jsx-a11y/anchor-is-valid */}
			</p>
		</Layout>
	);

export default Home;
