/* eslint-disable react/jsx-indent-props */
import React from 'react';
import PropTypes from 'prop-types';

const Icon = (props) => {
	// Icon name
	switch (props.name) {
	case 'close':
		return (
			<svg
				x="0px"
				y="0px"
				width="24px"
				height="24px"
				viewBox="0 0 31.11 31.11"
				enableBackground="new 0 0 31.11 31.11"
			>
				<polygon
					fill={props.color}
					points="31.11,1.41 29.7,0 15.56,14.14 1.41,0 0,1.41 14.14,15.56 0,29.7 1.41,31.11 15.56,16.97   29.7,31.11 31.11,29.7 16.97,15.56 "
				/>
			</svg>
		);
	default:
		return (
			<h1>Invalid icon</h1>
		);
	}
};

Icon.propTypes = {
	name: PropTypes.string,
	file: PropTypes.string,
};

Icon.defaultProps = {
	name: 'close',
	color: 'black',
};

export default Icon;
