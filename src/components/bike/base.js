import Rebase from 're-base'; // Allows state to be be mirrored to firebase
import firebase from 'firebase'; // API to firebase

const firebaseApp = firebase.initializeApp({
	apiKey: 'AIzaSyAE8-dBXjn3e7ZcisMmbYAQV2iXIx8Wmls',
	authDomain: 'react-boilerplate-rmemory.firebaseapp.com',
	databaseURL: 'https://react-boilerplate-rmemory.firebaseio.com/',
});

const base = Rebase.createClass(firebaseApp.database());

// This is a named export
export { firebaseApp };

// This is a default export
export default base;
