import React, { Fragment } from 'react';

import Toggle from './Toggle.jsx';
import Modal from './Modal.jsx';
import Form from './Form.jsx';
import Layout from '../Layout.jsx';

const ModalBase = () => (
	<Layout>
		<Toggle>
			{
			/* this.props.children will be a function */
				({ on, toggle }) => (
					<Fragment>
						<button onClick={toggle}>Login</button>
						<Modal on={on} toggle={toggle}>
							<Form />
						</Modal>
					</Fragment>
				)
			}
		</Toggle>
	</Layout>
);

export default ModalBase;
