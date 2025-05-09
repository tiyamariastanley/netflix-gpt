import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCMx3jVapqSYguulN-i7mq8NvPHXbDZriI",
  authDomain: "netflixgpt-49239.firebaseapp.com",
  projectId: "netflixgpt-49239",
  storageBucket: "netflixgpt-49239.appspot.com",
  messagingSenderId: "249384324658",
  appId: "1:249384324658:web:ca6ca5aad5864519a5b62b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
