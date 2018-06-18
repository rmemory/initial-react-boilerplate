import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Header, Container, Divider, Icon } from 'semantic-ui-react';

import Timer from './timer/Timer.jsx';
import { pullRight, h1 } from './layout.css';

const Layout = ({ children }) => (
	<Container>
		<Link to="/"> {/* eslint-disable-line */}
			<Header as="h1" className={h1}>
				React Boilerplate Example
			</Header>
		</Link>

		{children}

		<Divider />

		<Timer />

		<p className={pullRight}>
			Page by Richard Memory &nbsp; <Icon name="bicycle" color="blue" />
		</p>
	</Container>
);

Layout.propTypes = {
	children: PropTypes.string.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default Layout;
