import React, { Component } from 'react';

class App extends Component {

	constructor(props) {
		super(props);
	}

	shouldComponentUpdate() {
		return true;
	}

	componentWillRecieveProps() {

	}

	componentWillMount() {
		//Fired before component renders
		//Changes in state here will not trigger a render
	}

	componentDidMount() {
		//Fired just after component renders
		// Fetch and apis typically called here
		// If state changes here, it will cause render
	}

	componentWillUnmount() {

	}

	state = {
		toggle: true
	};

	toggle = () => {
		this.setState({
			toggle: !this.state.toggle
		});
	}


	submit = (event) => {

	}

	render() {
		return (
			<div>
				<h1>Hello World, <Name text="Richard"/></h1>
				
				{ this.state.toggle && 
					<p ref= {(goober) => this.myParagraph = goober }>This should show and hide</p>
				}

				<button onClick={this.toggle}>Show/Hide</button>

				<div>
				<input type="text" ref={(input) => this.text = input }/>
				<input type="email" ref={(input) => this.email = input }/>
				<button onSubmit={this.submit}>Show value</button>
				</div>
			</div>
		)
	}
}

class Name extends Component {
	render() {
		return (<em>{this.props.text}</em>)
	}
}

export default App;