/* eslint-disable react/jsx-indent-props */

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import { formatPrice } from './helpers';

class Order extends React.Component {
	renderOrder = (bikeKey) => {
		const bike = this.props.bikes[bikeKey];
		const count = this.props.order[bikeKey];

		const orderTransitionOptions = {
			classNames: 'order',
			key: bikeKey,
			timeout: { enter: 500, exit: 500 },
		};

		// This will occur when firebase is restoring bike state
		if (!bike) return null;

		if (bike.status === 'available') {
			return (
				<CSSTransition
					{...orderTransitionOptions}
				>
					<li key={bikeKey}>
						<span>
							<TransitionGroup
								component="span"
								className="count"
							>
								<CSSTransition
									classNames="count"
									key={count}
									timeout={{ enter: 500, exit: 500 }}
								>
									<span>{count}</span>
								</CSSTransition>
							</TransitionGroup>
							&nbsp; {bike.name}:
							{formatPrice(count * bike.price)}
							<button onClick={() => this.props.removeFromOrderStateFunc(bikeKey)}>
								&times;
							</button>
						</span>
					</li>
				</CSSTransition>
			);
		}

		return (
			<CSSTransition
				{...orderTransitionOptions}
			>
				<li key={bikeKey}>
					Sorry, {bike ? bike.name : 'bike'} is no longer available
				</li>
			</CSSTransition>
		);
	}

	render() {
		const orderBikeKeys = Object.keys(this.props.order);

		const total = orderBikeKeys.reduce((tally, bikeKey) => {
			const bike = this.props.bikes[bikeKey];
			const orderCount = this.props.order[bikeKey];
			const isAvailable = bike && bike.status === 'available';

			if (isAvailable) {
				return tally + (orderCount * bike.price);
			}
			return tally;
		}, 0);

		return (
			<Fragment>
				<div className="order-wrap">
					<h2>Order</h2>
					<TransitionGroup component="ul" className="order">
						{orderBikeKeys.map(bikeKey => this.renderOrder(bikeKey))}
					</TransitionGroup>
					<div className="total">
						Total:
						<strong>{formatPrice(total)}</strong>
					</div>
				</div>
			</Fragment>
		);
	}
}

Order.propTypes = {
	bikes: PropTypes.shape({
		image: PropTypes.string,
		name: PropTypes.string,
		desc: PropTypes.string,
		status: PropTypes.string,
		price: PropTypes.number,
	}).isRequired,
	removeFromOrderStateFunc: PropTypes.func.isRequired,
	order: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default Order;
