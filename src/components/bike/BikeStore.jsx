/* eslint-disable react/jsx-indent-props */

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import Header from './Header.jsx';
import Order from './Order.jsx';
import Inventory from './Inventory.jsx';
import Bike from './Bike.jsx';

import base from './base';

const sampleBikes = {
	bike1: {
		name: 'Kelson Custom Gravel',
		image: 'https://media.pagefly.io/file/get/ourstory2jpg-1509779331104.jpg',
		desc: 'The most amazing bike you can ride without suspension',
		status: 'available',
		price: 100000,
	},

	bike2: {
		name: 'Trek Emonda SLR6',
		image: 'https://www.trekbicyclesuperstore.com/images/library/large/trek-emonda-slr-6-copy-232289-1.jpg',
		desc:
		'The lightest carbon road disc frameset and highest-end carbon wheelset with one of the most exciting advancements ever in road bike technology',
		status: 'available',
		price: 150000,
	},

	bike3: {
		name: 'Trek 1120',
		image: 'http://www.bikepacking.com/wp-content/uploads/2018/02/Trek-1120-Review__19-740x493.jpg',
		desc:
		'The 1120 is a bikepackers dream touring bike',
		status: 'unavailable',
		price: 160000,
	},
};

class BikeStore extends React.Component {
	state = {
		bikes: {},
		order: {},
	};

	/*
	 * Database interface, via lifecycle methods
	 */

	// Update state from database after component is mounted
	componentWillMount() {
		// Restore local storage first, using store id as key
		const localStorageRef = localStorage.getItem(this.props.match.params.storeId);
		// If this isn't a new store, meaning there is localStorageRef, then setState
		if (localStorageRef) {
			this.setState({ order: JSON.parse(localStorageRef) });
		}

		// The refresh of local storage above will be immediate. The refresh
		// of the bikes will take some time. Bikes state will be empty until
		// firebase restores the data, causing undefined when rendering the order
		// We check for a null bike state in Order.jsx
		this.ref = base.syncState(`${this.props.match.params.storeId}/bikes`, {
			context: this,
			state: 'bikes',
		});
	}

	// Update local storage after user changes data, in this case only local
	// storage needs to be updated, because firebase is automatically sync'd
	// via the base.syncState above
	componentDidUpdate() {
		localStorage.setItem(this.props.match.params.storeId, JSON.stringify(this.state.order));
	}

	// clean up after the user exits the component to prevent memory leak
	componentWillUnmount() {
		base.removeBinding(this.ref);
	}

	/*
	 *	State methods
	 */

	addBike = (bike) => {
		const copyOfBikeState = { ...this.state.bikes };
		copyOfBikeState[`bike-${Date.now()}`] = bike;
		// All pages that refer to bikes will be updated
		this.setState({
			bikes: copyOfBikeState,
		});
	}

	editBike = (key, updatedBikeObject) => {
		const copyOfBikeState = { ...this.state.bikes };
		copyOfBikeState[key] = updatedBikeObject;
		this.setState({
			bikes: copyOfBikeState,
		});
	}

	deleteBike = (key) => {
		const copyOfBikeState = { ...this.state.bikes };
		copyOfBikeState[key] = null; // Required by firebase
		this.setState({
			bikes: copyOfBikeState,
		});
	}

	loadSampleBikes = () => {
		// dont call this.setState in a loop
		this.setState({ bikes: sampleBikes });
	}

	addToOrder = (bikeKey) => {
		const copyOfOrderState = { ...this.state.order };
		copyOfOrderState[bikeKey] = copyOfOrderState[bikeKey] + 1 || 1;
		this.setState({
			order: copyOfOrderState,
		});
	}

	removeFromOrder = (bikeKey) => {
		const copyOfOrderState = { ...this.state.order };
		delete copyOfOrderState[bikeKey]; // We can use delete because this isn't firebase
		this.setState({
			order: copyOfOrderState,
		});
	}

	render() {
		return (
			<Fragment>
				<div className="catch-of-the-day">
					<div className="menu">
						{/* String props, like this one can be just quotes. Other
							kinds of props like numbers must be in curly braces */}
						<Header tagline="Your local store for bikes" />
						<ul className="fishes">
							{
								Object.keys(this.state.bikes).map(bikeKey =>
									(<Bike
										key={bikeKey}
										bikeKey={bikeKey}
										bike={this.state.bikes[bikeKey]}
										addToOrderStateFunc={this.addToOrder}
									/>),
								)
							}
						</ul>
					</div>
					<Order
						bikes={this.state.bikes}
						order={this.state.order}
						removeFromOrderStateFunc={this.removeFromOrder}
					/>
					<Inventory
						addBikeStateFunc={this.addBike}
						deleteBikeStateFunc={this.deleteBike}
						storeId={this.props.match.params.storeId}
						loadSampleBikesStateFunc={this.loadSampleBikes}
						editBikeStateFunc={this.editBike}
						bikes={this.state.bikes}
					/>
				</div>
			</Fragment>
		);
	}
}

BikeStore.propTypes = {
	match: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default BikeStore;
