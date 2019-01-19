import * as firebase from 'firebase'

// Initialize Firebase
let config = {
  apiKey: "AIzaSyC8ywJ8Hhv4SarWy0veMvQD7q7DfdFSbw0",
  authDomain: "coolfood-ea952.firebaseapp.com",
  databaseURL: "https://coolfood-ea952.firebaseio.com",
  projectId: "coolfood-ea952",
  storageBucket: "coolfood-ea952.appspot.com",
  messagingSenderId: "85060199052"
};
let fire = firebase.initializeApp(config);

export default fire;
