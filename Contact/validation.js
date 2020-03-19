// Your web app's Firebase configuration


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

    document.querySelector('alert').style.display = 'none';

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
