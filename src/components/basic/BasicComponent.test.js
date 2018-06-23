import React from 'react';
import ReactDOM from 'react-dom';
import BasicComponent from './BasicComponent';

it('renders without crashing', () => { // eslint-disable-line no-undef
	const div = document.createElement('div');
	ReactDOM.render(<BasicComponent />, div);
});
