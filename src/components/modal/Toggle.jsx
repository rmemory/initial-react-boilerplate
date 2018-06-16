import { Component } from 'react';
import PropTypes from 'prop-types';

/* This is a simple component which maintains a simple
   true/false state, with an API to toggle the state.
   It renders the content provided by the client */
export default class Toggle extends Component {
	// State
	state = {
		on: false,
	}

	/* Toggle API

	  valueToSetToState: Optional boolean value. When used, that value is
	  set into state possibly overriding the toggle operation. If not
	  used, the state value is toggled as normal.
	*/
	toggle = (toggleValue) => {
		let valueToSetToState;

		if (toggleValue !== undefined) {
			valueToSetToState = toggleValue;
		} else {
			valueToSetToState = !this.state.on;
		}

		valueToSetToState = !this.state.on;
		this.setState({
			on: valueToSetToState,
		});
	}

	/* Render

	  Calls the children provided by the client, allowing it to
	  control how its used.
	 */
	render() {
		const { children } = this.props;
		return (
			children({
				on: this.state.on,
				toggle: this.toggle,
			})
		);
	}
}

Toggle.propTypes = {
	children: PropTypes.func.isRequired,
};

