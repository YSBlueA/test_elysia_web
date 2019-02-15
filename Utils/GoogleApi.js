function start() {
    console.log(">onClickSignIn");
    googleAuth.signIn().then(// Signs in the user with the options specified to gapi.auth2.init(). returns A Promise   with the GoogleUser
        onSignIn, function (error) {
            console.log("failed to sign in: " + error);
        });
};
// 1. Load the JavaScript client library.

function onSignOut() {
    console.log('>onSignOut');
    //showSignedOutUserControls();
}
function onSignIn(user) {
    console.log('>onSignIn');
    printUser(user);
    //signIntoBackEnd(user);
}

function onSignIntoBackEnd(email) {
    console.log('>onSignIntoBackEnd: email=' + email);
    showSignedInUserControls(email);
}
function printUser(googleUser) {
    console.log('>printUser: ' + googleUser.isSignedIn());
    // Useful data for your client-side scripts:
    var profile = googleUser.getBasicProfile();
    console.log("ID: " + profile.getId()); // Don't send this directly to your server!
    console.log('Full Name: ' + profile.getName());
    console.log('Given Name: ' + profile.getGivenName());
    console.log('Family Name: ' + profile.getFamilyName());
    console.log("Image URL: " + profile.getImageUrl());
    console.log("Email: " + profile.getEmail());

    // The ID token you need to pass to your backend:
    var id_token = googleUser.getAuthResponse().id_token;
    console.log("ID Token: " + id_token);

    var userid = profile.getEmail().split('@');

    DataBaseLogin(userid[0], callback);
}

function callback(result) {
    if (result == 0) {
        console.log('FAIL : login ');
    } else {
        if (gStory == 0) {
            console.log(' start prologue ');
            game.scene.switch('LoginScene', 'PrologueScene');
        } else {
            console.log(' start main ');
            game.scene.switch('LoginScene', 'MainScene');
        }
    }
}

function checkIfUserSignedIn() {
    console.log(">checkIfUserSignedIn");
    
    var user = googleAuth.currentUser.get();// Returns a GoogleUser object that represents the current user.

    console.log(">checkIfUserSignedIn : user : " + user);
    console.log(">checkIfUserSignedIn : signedin : " + user.isSignedIn());

    if (user && user.isSignedIn()) { // true if the user is signed in 
        onSignIn(user);
    } else {
        start();
        //onSignOut();
    }
}

function onLoadedAuth(auth2) {
    console.log(">onLoadedAuth");
    checkIfUserSignedIn(); // this happens after redirect
}

function signinChanged(val) { //  true when the user signs in, and false when the user signs out.
    console.log('>signinChanged: ', val);
}


function userChanged(user) {
    console.log('>userChanged: ', user);
}

function googleCreate() {
    gapi.load('auth2', () => {
        auth2 = gapi.auth2.init({
            client_id: [GOOGLE CLIENT ID]
            fetch_basic_profile: false,
            scope: 'email',
            ux_mode: 'redirect',
            redirect_uri: [REDIRECT URL]
        })
            .then(function () {
                googleAuth = gapi.auth2.getAuthInstance();
                googleAuth.then(() => {
                    googleAuth.isSignedIn.listen(signinChanged);// Listen for sign-in state changes.
                    googleAuth.currentUser.listen(userChanged);// Listen for changes to current user.
                    googleAuth.then(onLoadedAuth, function (error) {
                        console.log(error); // if GoogleAuth failed to initialize.
                    });
                });
            });
    });
}
