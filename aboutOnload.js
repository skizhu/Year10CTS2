function aboutPageOnload() {
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      user = firebase.auth().currentUser;
      var name = user.displayName
      var followingRef = firebase.database().ref('users/' + name + '/6/following/');

      var numChildrenFollowing;
      var z;
      var location;
      followingRef.once('value')
        .then(function (snapshot) {
          numChildrenFollowing = snapshot.numChildren()

          var childKeyStringify = JSON.stringify(snapshot.val());
          var newObject = JSON.parse(childKeyStringify);
          const values = Object.values(newObject);

          var followingContent = document.createElement('div');
          followingContent.classList.add('followingContent');
          document.getElementById('divs').appendChild(followingContent);

          for (z = 0; z < (numChildrenFollowing); z++) {

            var newTag = document.createElement('p');
            var node = document.createTextNode(values[z]);
            newTag.appendChild(node);
            console.log(newTag.textContent);
            

            let followingCards = document.createElement('div');
            followingCards.id = 'followingCards';

            let profileTitle = document.createElement('div');
            profileTitle.classList.add('profileTitle');

            let profileName = document.createElement('p');
            profileName.id = 'profileName';

            if (newTag.textContent != 'Following: ') {
              followingContent.appendChild(followingCards);
              followingCards.appendChild(profileTitle);
              profileTitle.appendChild(profileName)
              profileName.innerHTML = (newTag).textContent;
            }
            
          }
        })
    } else {
      // No user is signed in.
    }
  });
}
aboutPageOnload();