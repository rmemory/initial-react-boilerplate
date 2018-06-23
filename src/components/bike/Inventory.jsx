/* eslint-disable react/jsx-indent-props */

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase';

import EditBikeForm from './EditBikeForm.jsx';
import AddBikeForm from './AddBikeForm.jsx';
import Login from './Login.jsx';
import base from './base';

class Inventory extends React.Component {
	state = {
		uid: null,
		owner: null,
	}

	// On refresh, check to see if user is logged in and whether they
	// are the owner
	componentDidMount() {
		firebase.auth().onAuthStateChanged((user) => {
			if (user) {
				this.authHandler({ user });
			}
		});
	}

	authHandler = async (authData) => {
		// authData contains a payload of information returned from firebase
		// It contains lots of information about the login.

		// 1. Look up the current store from the firebase database. This
		//	  is set in the App.componentDidMount method when we sync
		//	  state.
		const store = await base.fetch(this.props.storeId, { context: this });

		// 2. Claim it if there is no owner. Stated differently, if we
		//	  are the first person to log into the database, then its
		//	  our database. In other words, post the uid of logged in
		//	  user if store.owner is null in database
		if (!store.owner) {
			await base.post(`${this.props.storeId}/owner`, {
				// Could also use an email address here instead of the uid,
				// since facebook and github verify email addresses
				data: authData.user.uid,
			});
		}

		// 3. Set the state of the Inventory component to reflect the
		//	  current user.
		this.setState({
			// who is the current logged in user (might not be owner)
			uid: authData.user.uid,
			// Who is the owner
			owner: store.owner || authData.user.uid,
			// If both owner and uid match, we allow them to manage the
			// store's inventory.
		});
	}

	authenticate = (provider) => {
		/*
		 * Create an auth provider based on what app the user selects they
		 * wishes to sign in with
		 */
		// const authProvider = new firebase.auth.TwitterAuthProvider();
		const authProvider = new firebase.auth[`${provider}AuthProvider`]();

		// Get access to firebase database, by authenticating with the authprovider
		firebase.auth().signInWithPopup(authProvider)
		// When firebase has indicated we are authenticated, call our authHandler
			.then(this.authHandler);
	}

	logout = async () => {
		await firebase.auth().signOut();
		this.setState({ uid: null });
	}

	render() {
		// Create a logout button (used in two places below)
		const logout = <button onClick={this.logout}>Logout</button>;

		// 1. Check if they are logged in, if not logged in
		// 	  they get the login prompt
		if (!this.state.uid) {
			return <Login authenticate={this.authenticate} />;
		}

		// 2. At this point, somebody is logged in. Lets see if they
		// 	  are not the owner.
		if (this.state.uid !== this.state.owner) {
			return (
				<div>
					<p>Sorry you are not the owner</p>
					{logout}
				</div>);
		}

		// 3. The logged in user must be the owner
		return (
			<Fragment>
				<div className="inventory">
					<h2>
						Inventory
					</h2>
					{logout}
					{Object.keys(this.props.bikes).map(key => (
						<EditBikeForm
							key={key}
							bikeKey={key}
							bike={this.props.bikes[key]}
							editBikeStateFunc={this.props.editBikeStateFunc}
							deleteBikeStateFunc={this.props.deleteBikeStateFunc}
						/>
					))}
					<AddBikeForm addBikeStateFunc={this.props.addBikeStateFunc} />
					<button onClick={this.props.loadSampleBikesStateFunc}>
						Load Sample Bikes
					</button>
				</div>
			</Fragment>
		);
	}
}

Inventory.propTypes = {
	bikes: PropTypes.shape({
		image: PropTypes.string,
		name: PropTypes.string,
		desc: PropTypes.string,
		status: PropTypes.string,
		price: PropTypes.number,
	}).isRequired,
	loadSampleBikesStateFunc: PropTypes.func.isRequired,
	addBikeStateFunc: PropTypes.func.isRequired,
	editBikeStateFunc: PropTypes.func.isRequired,
	deleteBikeStateFunc: PropTypes.func.isRequired,
	storeId: PropTypes.string.isRequired,
};


export default Inventory;
