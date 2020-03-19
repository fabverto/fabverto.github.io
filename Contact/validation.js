// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyCvPBeCTXeZWc_Kh9bI_zAuHu4LULEfxSw",
    authDomain: "mywebform-55f67.firebaseapp.com",
    databaseURL: "https://mywebform-55f67.firebaseio.com",
    projectId: "mywebform-55f67",
    storageBucket: "mywebform-55f67.appspot.com",
    messagingSenderId: "373665261791",
    appId: "1:373665261791:web:bbee3312c3013f6730e16a",
    measurementId: "G-C1DW3GPZ0V"
};

firebaseConfig.ini
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

var messageReference = firebase.database().ref('messages');


document.getElementById('contactForm').addEventListener('submit', submitForm);

function submitForm(m){
    m.preventDefault();

    var firstName = getInputVal('fname');
    var lastName = getInputVal('lname');
    var EmailAddress = getInputVal('email');
    var Country = getInputVal('country');
    var Message = getInputVal('subject');

    saveMessage(firstName, lastName, EmailAddress, Country, Message);

    document.querySelector('alert').style.display = 'block';

    setTimeout(function () {
        document.querySelector('alert').style.display = 'none';
    }, 3000);
}

function getInputVal(id) {
    return document.getElementById("id").value;
}

function saveMessage(firstName, lastName, email, country, message) {
var newMessageRef = messageReference.push();
newMessageRef.set({
    FirstName: firstName,
    LastName: lastName,
    Email: email,
    Country: country,
    Message: message
});
}
