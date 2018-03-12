import firebase from 'firebase'
var config = { /* COPY THE ACTUAL CONFIG FROM FIREBASE CONSOLE */
    apiKey: "AIzaSyBaHcCEZTBRWPltNN9AAw0SpSdUYkZ9FnY",
    authDomain: "listlistear.firebaseapp.com",
    databaseURL: "https://listlistear.firebaseio.com",
    projectId: "listlistear",
    storageBucket: "listlistear.appspot.com",
    messagingSenderId: "882711208992"
};
var fire = firebase.initializeApp(config);
export default fire;