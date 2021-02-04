var firebaseConfig = {
    apiKey: "AIzaSyAr0J-PXfZwxRbio0dWtxt64qd9O4sB2kY",
    authDomain: "year10designfirebasedemozg.firebaseapp.com",
    databaseURL: "https://year10designfirebasedemozg.firebaseio.com",
    projectId: "year10designfirebasedemozg",
    storageBucket: "year10designfirebasedemozg.appspot.com",
    messagingSenderId: "445964366173",
    appId: "1:445964366173:web:c307374f6ab987c38c38b4",
    measurementId: "G-PWQ5DD6X6Q"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var database = firebase.database()
var ui = new firebaseui.auth.AuthUI(firebase.auth());
firebase.analytics();

firebase.auth().onAuthStateChanged(function(user){
    if(user && document.getElementById('loginLink').style.display == null){
        console.log('User already signed in');
    }
    else if(user) {
        document.getElementById('loginLink').style.display = 'none';
        document.getElementById('logoutButton').style.display = 'block';
    }
});