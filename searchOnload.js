function searchOnload(v, user) {
    v = document.getElementById('profileName').textContent;
    user = firebase.auth().currentUser;
    var name = user.displayName;
    var checkRef = firebase.database().ref('users/' + v + '/5/');
    checkRef.once("value")
        .then(function (snapshot) {
            var childKey = snapshot.child("followers/").val(); // followers' names
            var childKeyStringify = JSON.stringify(childKey);
            var newObject = JSON.parse(childKeyStringify);
            const values = Object.values(newObject);
            var counter = 0;
            var buttonValue = new Boolean();
            var i = 0;
            var j = 0;

            
            for (i = 0; i < values.length; i++) {
                if (values[i] == name) {
                    buttonValue = true;
                    break;
                }
                else{
                    buttonValue = false;
                }
            }
            for (j = 0; j < values.length; j++) {
                counter += 1
            }
            
            document.getElementById('followerCount').innerHTML = 'Followers: ' + (counter-1).toString();
            if (buttonValue == true) {

                document.getElementById('followButton').innerHTML = 'Unfollow';
                document.getElementById('followButton').setAttribute('onclick', 'javascript: unfollow()')
            }
            else if (buttonValue == false) {
                document.getElementById('followButton').innerHTML = 'Follow';
                document.getElementById('followButton').setAttribute('onclick', 'javascript: follow()')
            }
            
            
        });
}