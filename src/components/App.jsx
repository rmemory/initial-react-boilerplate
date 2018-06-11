import React, { Component } from 'react';

class App extends Component {

	constructor(props) {
		super(props);
	}

	shouldComponentUpdate() {
		return true;
	}

	componentWillReceiveProps() {

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
		toggle: true,
		mycontrolledinput: "hello"
	};

	toggle = () => {
		this.setState({
			toggle: !this.state.toggle
		});
	}

	submit = (event) => {
		console.log(this.uncontrolledtext);
	}

	myOnInputChange = (event) => {
		this.setState({
			mycontrolledinput: event.target.value
		})
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
					<input type="text" onChange={this.myOnInputChange} value={this.state.mycontrolledinput}/>
					<input type="text" ref={(input) => {
						this.uncontrolledtext = input
						} }/>
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