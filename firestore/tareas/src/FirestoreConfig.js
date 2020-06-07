import firebase from 'firebase/app';
import 'firebase/app';
import 'firebase/firestore';

firebase.initializeApp({
      apiKey: "AIzaSyBf7XkBxFXzzH5V5khF-MyZPyv8uH35c90",
      authDomain: "todos-e89d3.firebaseapp.com",
      projectId: "todos-e89d3",

});

let db = firebase.firestore();
db.settings({timestampsInSnapshots: true});

export default db;
