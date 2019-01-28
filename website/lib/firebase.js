import * as firebase from "firebase";
import "firebase/firestore";
import "firebase/storage";

const config = {
  apiKey: "apiKey",
  authDomain: "your_firebase_project.firebaseapp.com",
  databaseURL: "https://your_firebase_project.firebaseio.com",
  storageBucket: "your_firebase_project.appspot.com",
  projectId: "your_firebase_project"
};

let firestore;
if (!firebase.apps.length) {
  firestore = firebase.initializeApp(config).firestore();
} else {
  firestore = firebase.app().firestore();
}

firestore.settings({ timestampsInSnapshots: true });

export default firebase;
