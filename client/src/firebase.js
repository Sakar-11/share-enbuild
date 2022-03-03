import firebase from "firebase";

const config = {
  apiKey: "AIzaSyCUTS67t69qHLarJnM_ZMkp9PG_TDpXMUY",
  authDomain: "sds-construction-c1bc7.firebaseapp.com",
  databaseURL: "https://sds-construction-c1bc7.firebaseio.com",
  projectId: "sds-construction-c1bc7",
  storageBucket: "sds-construction-c1bc7.appspot.com",
  messagingSenderId: "609490234826",
  appId: "1:609490234826:web:0dcef04e00b3b80a793333",
  measurementId: "G-PD22N068YM",
};
firebase.initializeApp(config);
// firebase.analytics();
export default firebase;
