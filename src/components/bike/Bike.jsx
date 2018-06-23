import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import { formatPrice } from './helpers';

class Bike extends React.Component {
	handleButtonClick = () => {
		this.props.addToOrderStateFunc(this.props.bikeKey);
	}

	render() {
		const {
			name, price, status, desc, image,
		} = this.props.bike;
		const isAvailable = status === 'available';

		return (
			<Fragment>
				<li className="menu-fish">
					<img src={image} alt={name} />
					<h3 className="fish-name">
						{name}
						<span className="price">{formatPrice(price)}</span>
					</h3>
					<p>{desc}</p>
					<button onClick={this.handleButtonClick} disabled={!isAvailable}>{isAvailable ? 'Add To Cart' : 'Sold Out'}</button>
				</li>
			</Fragment>
		);
	}
}

Bike.propTypes = {
	bikeKey: PropTypes.string.isRequired,
	addToOrderStateFunc: PropTypes.func.isRequired,
	bike: PropTypes.shape({
		image: PropTypes.string,
		name: PropTypes.string,
		desc: PropTypes.string,
		status: PropTypes.string,
		price: PropTypes.number,
	}).isRequired,
};

export default Bike;
