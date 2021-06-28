import firebase from "firebase/app";
import "firebase/auth"
import "firebase/firestore"
import "firebase/storage"

var firebaseConfig = {
    apiKey: "AIzaSyArt3K_V8ydymscuQtI-viz-v0jXY3lx_E",
    authDomain: "rptm-7ae38.firebaseapp.com",
    projectId: "rptm-7ae38",
    storageBucket: "rptm-7ae38.appspot.com",
    messagingSenderId: "648405924520",
    appId: "1:648405924520:web:18c2c6f265ecad0168209d",
    measurementId: "G-KP7CJQDR9K"
};
// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

export { app }