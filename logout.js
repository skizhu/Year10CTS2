function signOut(){
    firebase.auth().signOut().then(function(){
    window.location.replace('login.html');
})
}