/* eslint-disable react/no-multi-comp, react/prefer-stateless-function */
import React, { Component } from 'react';
import { Header } from 'semantic-ui-react';

import Layout from '../Layout.jsx';

/* Prop drilling:

   https://blog.kentcdodds.com/prop-drilling-bb62e02cb691
 */

/* Context */

const MyContext = React.createContext();

/* Context provider */
class MyProvider extends Component {
	state = {
		name: 'Richard',
		age: 20,
		developer: true,
	}

	render() {
		return (
			<MyContext.Provider value={
				{
					state: this.state,
					incrementYearFunc: () => this.setState({
						age: this.state.age + 1,
					}),
				}
			}
			>
				{this.props.children /* eslint-disable-line react/prop-types */ }
			</MyContext.Provider>
		);
	}
}

class Person extends Component {
	render() {
		return (
			<div className="person">
				<p>This is the person</p>

				<MyContext.Consumer>
					{context => (
						<React.Fragment>
							<p>Age: {context.state.age}</p>
							<p>Name: {context.state.name}</p>
							<button onClick={context.incrementYearFunc}>Add year</button>
						</React.Fragment>
					)}
				</MyContext.Consumer>
			</div>
		);
	}
}

class Family extends Component {
	render() {
		return (
			<div className="family">
				<p>This is the family</p>
				<Person />
			</div>
		);
	}
}

class Context extends Component {
	render() {
		return (
			<Layout>
				<Header as="h2">React context demo</Header>
				<MyProvider>
					<p>This is the root of the context demo</p>
					<Family />
				</MyProvider>
			</Layout>
		);
	}
}

export default Context;
