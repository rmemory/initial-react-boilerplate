/* eslint-disable react/jsx-indent-props */

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

class AddBikeForm extends React.Component {
	createBike = (event) => {
		event.preventDefault();

		const bike = {
			name: this.nameInputElement.value,
			price: parseFloat(this.priceInputElement.value),
			status: this.statusInputElement.value,
			desc: this.descInputElement.value,
			image: this.imageInputElement.value,
		};
		this.props.addBikeStateFunc(bike);

		event.currentTarget.reset();
	}
	render() {
		return (
			<Fragment>
				<form className="fish-edit" onSubmit={this.createBike}>
					<input
						name="name"
						ref={input => // eslint-disable-line no-return-assign
							this.nameInputElement = input}
						type="text"
						placeholder="Name"
					/>
					<input
						name="price"
						ref={input => // eslint-disable-line no-return-assign
							this.priceInputElement = input}
						type="text"
						placeholder="Price"
					/>
					<select
						name="status"
						ref={input => // eslint-disable-line no-return-assign
							this.statusInputElement = input}
					>
						<option value="available">Available!</option>
						<option value="unavailable">Sold Out!</option>
					</select>
					<textarea
						name="desc"
						ref={input => // eslint-disable-line no-return-assign
							this.descInputElement = input}
						placeholder="Desc"
					/>
					<input
						name="image"
						ref={input => // eslint-disable-line no-return-assign
							this.imageInputElement = input}
						type="text"
						placeholder="Image"
					/>
					<button className="submit">+ Add Fish</button>
				</form>
			</Fragment>
		);
	}
}

AddBikeForm.propTypes = {
	addBikeStateFunc: PropTypes.func.isRequired,
};

export default AddBikeForm;
