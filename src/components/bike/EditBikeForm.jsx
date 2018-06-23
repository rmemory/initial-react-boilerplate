/* eslint-disable react/jsx-indent-props */
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

class EditBikeForm extends React.Component {
	handleChange = (event) => {
		// 1. make copy of current bike
		const updatedBike = { ...this.props.bike };
		// 2. Update the field
		updatedBike[event.currentTarget.name] = event.currentTarget.value;
		// 3. Save the updated bike into state
		this.props.editBikeStateFunc(this.props.bikeKey, updatedBike);
	}

	render() {
		const {
			name, price, status, desc, image,
		} = this.props.bike;
		return (
			<Fragment>
				<div className="fish-edit">
					<input
						type="text"
						name="name"
						onChange={this.handleChange}
						value={name}
					/>
					<input
						type="text"
						name="price"
						onChange={this.handleChange}
						value={price}
					/>
					<select
						name="status"
						onChange={this.handleChange}
						value={status}
					>
						<option value="available">Available!</option>
						<option value="unavailable">Sold Out!</option>
					</select>
					<textarea
						name="desc"
						onChange={this.handleChange}
						value={desc}
					/>
					<input type="text" name="image" onChange={this.handleChange} value={image} />
					<button
						onClick={() => this.props.deleteBikeStateFunc(this.props.bikeKey)}
					>
						Remove Bike
					</button>
				</div>
			</Fragment>
		);
	}
}

EditBikeForm.propTypes = {
	editBikeStateFunc: PropTypes.func.isRequired,
	deleteBikeStateFunc: PropTypes.func.isRequired,
	bikeKey: PropTypes.string.isRequired,
	bike: PropTypes.shape({
		image: PropTypes.string,
		name: PropTypes.string,
		desc: PropTypes.string,
		status: PropTypes.string,
		price: PropTypes.number,
	}).isRequired,
};

export default EditBikeForm;
