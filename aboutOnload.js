function modalProfileLoad(user) {
  var hobby, food, subject, year, email;
  let rootRef = firebase.database().ref();
  rootRef.child("users/" + user).on("value", function (snapshot) {
    let userHobby = database.ref("users/" + user + "/0/hobby");
    userHobby.on("value", (snapshot) => {
      hobby = snapshot.val();
      document.getElementById("profileSpanHobby").textContent =
        "Hobby: " + hobby;
    });
    let userFood = database.ref("users/" + user + "/1/food");
    userFood.on("value", (snapshot) => {
      food = snapshot.val();
      document.getElementById("profileSpanFood").textContent = "Food: " + food;
    });
    let userSubject = database.ref("users/" + user + "/2/subject");
    userSubject.on("value", (snapshot) => {
      subject = snapshot.val();
      document.getElementById("profileSpanSubject").textContent = "Favourite Subject: " + subject;
    });
    let userYear = database.ref("users/" + user + "/3/year");
    userYear.on("value", (snapshot) => {
      year = snapshot.val();
      document.getElementById("profileSpanYear").textContent = "Year: " + year;
    });
    let userEmail = database.ref("users/" + user + "/4/email");
    userEmail.on("value", (snapshot) => {
      email = snapshot.val();
      document.getElementById("profileSpanEmail").textContent = "Email: " + email;
    });
  });
}
function userModalProfileLoad() {
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      user = firebase.auth().currentUser;
      let name = user.displayName;
      let nameId = name.replace(/\s/g, "");
      let userInfoObject = {
        userName: name,
        userNameId: nameId,
      };
      let userModalProfileLoadHTML = `
<div id="followingCards">
<div class="profileTitle">
  <p id="profileName">Currently Logged In As: ${userInfoObject["userName"]}</p>
</div>

<button type="button" class="btn btn-primary" data-toggle="modal" data-target='#${userInfoObject["userNameId"]}' id='${userInfoObject["userName"]}' style='margin-bottom:0.5rem;' onclick='modalProfileLoad(this.id);'>
  View Profile
</button>
</div>

<div class="modal fade" id="${userInfoObject["userNameId"]}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
<div class="modal-dialog">
  <div class="modal-content">
   <div class="modal-header">
    <h5 class="modal-title text-primary" id="exampleModalLabel">${userInfoObject["userName"]}</h5>
    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button>
</div>
    <div class="modal-body">
      <div id='profileHobby'>
        <p id='profileHobbyText'>
        <span id='profileSpanHobby'>Hobby: </span>
        </p>
      </div>
      <div id='profileFood'>
        <p id='profileFoodText'>
        <span id='profileSpanFood'>Food: </span>
        </p>
      </div>
      <div id='profileSubject'>
        <p id='profileSubjectText'>
        <span id='profileSpanSubject'>Favourite Subject: </span>
        </p>
      </div>
      <div id='profileYear'>
        <p id='profileYearText'>
        <span id='profileSpanYear'>Year: </span>
        </p>
      </div>
      <div id='profileEmail'>
        <p id='profileEmailText'>
        <span id='profileSpanEmail'>Email: </span>
        </p>
      </div>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-primary" data-dismiss="modal">Close</button>
    </div>
  </div>
</div>
</div>
`;
      document.getElementById('aboutContent').innerHTML += userModalProfileLoadHTML;
    }
  });
}
userModalProfileLoad();

function aboutPageOnload() {
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      user = firebase.auth().currentUser;
      var name = user.displayName;
      var followingRef = firebase
        .database()
        .ref("users/" + name + "/6/following/");
      var z;

      followingRef.once("value").then(function (snapshot) {
        numChildrenFollowing = snapshot.numChildren();

        var childKeyStringify = JSON.stringify(snapshot.val());
        var newObject = JSON.parse(childKeyStringify);
        const values = Object.values(newObject);

        let carddisplay = document.getElementById("followingContent");

        var data = new Object();

        for (z = 0; z < numChildrenFollowing; z++) {
          var usernameTarget = values[z];
          usernameTarget = usernameTarget.replace(/\s/g, "");

          data = {
            username: values[z],
            target: usernameTarget,
          };
          let card = `
            <div id="followingCards">
              <div class="profileTitle">
                <p id="profileName">${data["username"]}</p>
              </div>`;
          if (data['username'] != "Following: ") {
            carddisplay.innerHTML += card;
          }
        }
      });
    }
  });
}
aboutPageOnload();
