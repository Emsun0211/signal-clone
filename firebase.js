// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// import * as firebase from "firebase";
// import "firebase/auth";
// import "firebase/firestore";

// import * as firebase from "firebase";
// import "firebase/auth";
// import "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyAJs_wfB2eyyG-CeFIAawtI4GmPSYsWKQI",
	authDomain: "signal-clone-build-180eb.firebaseapp.com",
	projectId: "signal-clone-build-180eb",
	storageBucket: "signal-clone-build-180eb.appspot.com",
	messagingSenderId: "435943782531",
	appId: "1:435943782531:web:7d4812d5bde47cf6fcc3b6",
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
