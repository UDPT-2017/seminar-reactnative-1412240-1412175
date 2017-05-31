import * as firebase from 'firebase';

var config = {
   apiKey: "AIzaSyBQcpDcDsp5XgNmsAjRmB4VWh_FT4PpiKg",
   authDomain: "readbook-62249.firebaseapp.com",
   databaseURL: "https://readbook-62249.firebaseio.com",
   projectId: "readbook-62249",
   storageBucket: "readbook-62249.appspot.com",
   messagingSenderId: "171007325576"
 };

 module.exports = firebase.initializeApp(config);
