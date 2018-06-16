import React, { Component } from 'react';
import styled from 'styled-components';

import Layout from '../Layout.jsx';

class Timer extends Component {
	state = { counter: 0 };

	/* Lifecycle methods */
	componentDidMount() {
		this.interval = setInterval(
			this.increment.bind(this),
			1000);
	}

	componentWillUnmount() {
		clearInterval(this.interval);
	}

	/* Called as a callback by setInterval */
	increment = () => {
		this.setState({ counter: this.state.counter + 1 });
	}

	render() {
		const { counter } = this.state;

		return (
			<Layout>
				<PageStyle>This page has been viewed for {counter} seconds </PageStyle>
			</Layout>
		);
	}
}

export default Timer;

const PageStyle = styled.div`
	font-size: 1rem;

	display: flex;
	justify-content: center;
	align-items: center;
`;
