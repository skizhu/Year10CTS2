function follow(v, user) {
    v = document.getElementById('profileName').textContent;
    user = firebase.auth().currentUser;
    var rootRef = firebase.database().ref().child('users/' + v + '/5/followers/');
    var followingRef = firebase.database().ref().child('users/' + user.displayName + '/6/following/');
    if (user.displayName == v) {
        window.alert('You cannot follow yourself.')
    }
    else {
        rootRef.push(user.displayName);
        followingRef.push(v);
        searchOnload();
        return
    }
}
function unfollow(user, name) {
    var v = document.getElementById('profileName').textContent;
    user = firebase.auth().currentUser;
    name = user.displayName
    var rootRef = firebase.database().ref('users/' + v + '/5/followers');
    var followingRef = firebase.database().ref('users/' + name + '/6/following/');

    var numChildren;
    var numChildrenFollowing;
    var k;
    var z;
    var path;
    var location;
    rootRef.once('value')
    .then(function(snapshot){
        numChildren = snapshot.numChildren()

        var childKeyStringify = JSON.stringify(snapshot.val());
        var newObject = JSON.parse(childKeyStringify);
        const values = Object.values(newObject);
        
        for(k = 0; k < (numChildren); k++){
            if(values[k] == (name)){
                path = Object.keys(snapshot.val())[k];
                break
            }
        }
        rootRef.child(path).remove();
        searchOnload();
    })
    followingRef.once('value')
    .then(function(snapshot){
        numChildrenFollowing = snapshot.numChildren()
        
        var childKeyStringify = JSON.stringify(snapshot.val());
        var newObject = JSON.parse(childKeyStringify);
        const values = Object.values(newObject);

        for(z = 0; z < (numChildrenFollowing); z++){
            if(values[z] == (v)){
                location = Object.keys(snapshot.val())[z];
                break
            }
        }
        followingRef.child(location).remove();
        searchOnload();
    })
}