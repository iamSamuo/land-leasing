import app from "firebase/app";
import "firebase/auth";
import "firebase/database";

const config = {
  // apiKey: process.env.REACT_APP_API_KEY,
  apiKey: "AIzaSyDDSIhiCDKQe08nYp6LprqIhIe0HeWfBaA",
  // authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  authDomain: "land-website-fc967.firebaseapp.com",
  // databaseURL: process.env.REACT_APP_DATABASE_URL,
  databaseURL: "https://land-website-fc967.firebaseio.com",
  // projectId: process.env.REACT_APP_PROJECT_ID,
  projectId: "land-website-fc967",
  // storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  storageBucket: "land-website-fc967.appspot.com",
  // messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  messagingSenderId: "783040368429",
};
class Firebase {
  constructor() {
    app.initializeApp(config);
    // instantiating the auth package
    this.auth = app.auth();
    this.db = app.database();
  }

  // AUTH API

  //sign up function
  doRegister = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  // sign in function
  doLogin = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  // sign out
  doSignOut = () => this.auth.signOut();

  // password reset
  doPasswordReset = (email) => this.auth.sendPasswordResetEmail(email);

  // password update
  doPasswordUpdate = (password) =>
    this.auth.currentUser.updatePassword(password);

  user = (uid) => this.db.ref(`users/${uid}`);

  users = () => this.db.ref("users");
}
export default Firebase;
