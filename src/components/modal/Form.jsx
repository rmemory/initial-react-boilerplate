/* eslint-disable react/jsx-indent-props, jsx-a11y/accessible-emoji */

/* Example adapted from the React Transition Group */
import React from 'react';
import {
	Grid,
	Button,
	FormGroup,
	ControlLabel,
	FormControl,
	HelpBlock,
} from 'react-bootstrap';
import { CSSTransition } from 'react-transition-group';

import Styles from './form-styles.css';

class Form extends React.Component {
	state = {
		name: '',
		showValidationMessage: false,
		showValidationButton: false,
	};

	render() {
		const {
			name,
			showValidationMessage,
			showValidationButton,
		} = this.state;
		return (
			<Grid style={{ paddingTop: '2rem' }}>
				<form style={{ marginTop: '1rem' }}>
					<FormGroup
						validationState={
							showValidationMessage ? 'success' : null
						}
					>
						<ControlLabel>Your name</ControlLabel>
						<FormControl
							type="text"
							value={name}
							onFocus={() => {
								this.setState({
									showValidationMessage: false,
								});
							}}
							onChange={(event) => {
								this.setState({
									name: event.target.value,
									showValidationButton: true,
								});
							}}
						/>
						<CSSTransition
							in={showValidationMessage}
							timeout={300}
							classNames={{
								enter: `${Styles.messageEnter}`,
								enterActive: `${Styles.messageEnterActive}`,
								exit: `${Styles.messageExit}`,
								exitActive: `${Styles.messageExitActive}`,
							}}
							unmountOnExit
							onExited={() => {
								this.setState({
									showValidationButton: true,
								});
							}}
						>
							{state => (
								<HelpBlock>
									Your name rocks!
									<CSSTransition
										in={state === 'entered'}
										timeout={300}
										classNames={{
											enter: `${Styles.starEnter}`,
											enterActive: `${Styles.starEnterActive}`,
											exit: `${Styles.starExit}`,
											exitActive: `${Styles.starExitActive}`,
										}}
										unmountOnExit
									>
										<span className={Styles.star} role="img">⭐</span>
									</CSSTransition>
								</HelpBlock>
							)}
						</CSSTransition>
					</FormGroup>
				</form>
				{showValidationButton ? (
					<Button
						onClick={() => {
							this.setState(() => ({
								showValidationButton: false,
								showValidationMessage: true,
							}));
						}}
					>
						Validate form
					</Button>
				) : null}
			</Grid>
		);
	}
}

export default Form;
