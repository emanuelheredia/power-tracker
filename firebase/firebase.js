// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
	getFirestore,
	getDocs,
	collection,
	doc,
	getDoc,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
	apiKey: "AIzaSyAAQxqnYeDu_AU57piBYTHqXiUU8QmeKCA",
	authDomain: "power--tracker.firebaseapp.com",
	projectId: "power--tracker",
	storageBucket: "power--tracker.appspot.com",
	messagingSenderId: "398532456654",
	appId: "1:398532456654:web:6f77bca8af9ee1c96a609f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const collection = collection(db, "power-tracker");
