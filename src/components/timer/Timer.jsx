/* eslint-disable react/jsx-indent-props */
import React, { Component } from 'react';
import styled from 'styled-components';

import Styles from './timer-styles.css';

class Timer extends Component {
	state = { counter: 0 };

	/* Lifecycle methods */
	componentDidMount() {
		this.interval = setInterval(
			this.increment,
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
			<PageStyle>
				This page has been open for &nbsp;
				<span className={Styles.timerAnimationFont}>{counter}</span>
				&nbsp; seconds
			</PageStyle>
		);
	}
}

export default Timer;

const PageStyle = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
`;
