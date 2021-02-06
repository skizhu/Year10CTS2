/* HOW TO DRAW SPECIFIC DATA
var userFname= database.ref('users/' + userId + '/Fname/Fname');
    userFname.on('value', (snapshot) =>{
    const Fdata = snapshot.val();
        const title = document.getElementById('title');
        title.innerHTML = Fdata;
    })

function writeUserData(Fname, Lname, Hobby, Food, Subject, userId) {
    Fname = document.getElementById('Fname').value;
    Lname = document.getElementById('Lname').value;
    Hobby = document.getElementById('Hobby').value;
    Food = document.getElementById('Food').value;
    Subject = document.getElementById('Subject').value;
    userId = document.getElementById('Fname').value + ' ' + document.getElementById('Lname').value;
    firebase.database().ref('users/' + userId + '/Fname').set({ Fname: Fname });
    firebase.database().ref('users/' + userId + '/Lname').set({ Lname: Lname });
    firebase.database().ref('users/' + userId + '/Hobby').set({ Hobby: Hobby });
    firebase.database().ref('users/' + userId + '/Food').set({ Food: Food });
    firebase.database().ref('users/' + userId + '/Subject').set({ Subject: Subject });
}
*/

//ADD USER
var questions = ['inputEmail', 'inputPassword', 'inputFname', 'inputLname',
    'inputHobby', 'inputFood', 'inputSubject', 'inputYear'];

document.getElementById('signUpButton').disabled = false;
document.getElementById('hoverModal').addEventListener('mouseover', (e) =>{
    const email = document.getElementById(questions[0]);
    const password = document.getElementById(questions[1]);
    const Fname = document.getElementById(questions[2]);
    const Lname = document.getElementById(questions[3]);
    const hobby = document.getElementById(questions[4]);
    const food = document.getElementById(questions[5]);
    const subject = document.getElementById(questions[6]);
    const year = document.getElementById(questions[7]);

    if(year.value !== 'Choose Year'){
        if(email.value && password.value && Fname.value 
            && Lname.value && hobby.value && food.value && subject.value && year.value !== '' || email.value && password.value && Fname.value 
            && Lname.value && hobby.value && food.value && subject.value === ''){
            document.getElementById('signUpButton').style.color = '#6200ee';
            document.getElementById('signUpButton').style.cursor = 'pointer';
            }
        else{
            document.getElementById('signUpButton').style.color = '#9e9e9e';
            document.getElementById('signUpButton').style.cursor = 'not-allowed';
        }
        document.getElementById('signUpButton').disabled = false;
    }
    else{
        document.getElementById('signUpButton').style.color = '#9e9e9e';
        document.getElementById('signUpButton').style.cursor = 'not-allowed';
    }
})
document.getElementById('loginButtonModal').disabled = false;
document.getElementById('loginHoverModal').addEventListener('mouseover', (e) =>{
    const loginEmail = document.getElementById('modalInputEmailLogin');
    const loginPassword = document.getElementById('modalInputPasswordLogin');

    if (loginEmail.value && loginPassword.value !== '') {
        document.getElementById('loginButtonModal').style.color = '#6200ee';
        document.getElementById('loginButtonModal').style.cursor = 'pointer';
    }
    else {
        document.getElementById('loginButtonModal').style.color = '#9e9e9e';
        document.getElementById('loginButtonModal').style.cursor = 'not-allowed';
    }
    document.getElementById('loginButtonModal').disabled = false;
})

function addUser(newid, email, password, hobby, food, subject, year, userInfo, followers, following) {
    var rootRef = firebase.database().ref();
    newid = document.getElementById(questions[2]).value + ' ' + document.getElementById(questions[3]).value;
    email = document.getElementById(questions[0]).value;
    password = document.getElementById(questions[1]).value;
    hobby = document.getElementById(questions[4]).value;
    food = document.getElementById(questions[5]).value;
    subject = document.getElementById(questions[6]).value;
    year = document.getElementById(questions[7]).value;
    followers = ['Followers: '];
    following = ['Following: '];
    userInfo = 
    [{hobby:hobby},
    {food:food},
    {subject:subject},
    {year:year},
    {email:email},
    {followers:followers},
    {following:following}]

    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((cred, newid) => {
            // Signed in 
            //var user = userCredential.user;
            newid = document.getElementById(questions[2]).value + ' ' + document.getElementById(questions[3]).value;
            var user = firebase.auth().currentUser;
            user.updateProfile({
            displayName: newid,

            }).catch(function(error) {
                var errorCode = error.code;
                var errorMessage = error.message;
                const errorAlert = errorCode + ': ' + errorMessage;
                window.alert(errorAlert);
            });

        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            const errorAlert = errorCode + ': ' + errorMessage;
            window.alert(errorAlert);
    // ..
  });
    var idRef = rootRef.child('users/' + newid);
    //var newidRef = idRef.push();
    rootRef.child('users/' + newid + '/1/email/').on("value", function(snapshot){
        const snapshotData = snapshot.val();
    
        if (snapshot.exists() && snapshotData == email) {
            //EMAIL EXISTS SHOULD NOT BE ALLOWED TO MAKE NEW ACCOUNT
            document.getElementById('toastAlert').style.display = 'block';
        }
        else if(snapshotData == null){
            //EMAIL EXISTS SHOULD BE ALLOWED TO MAKE ACCOUNT
            idRef.set(userInfo);
          }
        else{console.error('Neither Statements Are True')};
        });
        
        }

function signIn(email, password){
    email = document.getElementById('modalInputEmailLogin').value;
    password = document.getElementById('modalInputPasswordLogin').value;

    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
    .then(() => {
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then((name, year) => {
                // Signed in
                var user = firebase.auth().currentUser;
                name = user.displayName;
                email = user.email;
                var year
                var yearRef = database.ref('users/' + name + '/3/year');
                yearRef.on('value', (snapshot) => {
                    year = snapshot.val();
                })
                window.location.replace('search.html');

            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                const errorAlert = errorCode + ': ' + errorMessage;
                window.alert(errorAlert);
            });
    })
    .catch((error) =>{
        var errorCode = error.code;
        var errorMessage = error.message;
        const errorAlert = errorCode + ': ' + errorMessage;
        window.alert(errorAlert);
    })
}