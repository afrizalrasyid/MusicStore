var firebaseConfig = {
  apiKey: "AIzaSyA4m95ssBRD4lEAFdReLjXbp6eNGv6RaSg",
  authDomain: "musicstore-6e0e0.firebaseapp.com",
  databaseURL: "https://musicstore-6e0e0-default-rtdb.firebaseio.com",
  projectId: "musicstore-6e0e0",
  storageBucket: "musicstore-6e0e0.appspot.com",
  messagingSenderId: "176855708478",
  appId: "1:176855708478:web:f9773f5c0a3d1bf3fb726f",
  measurementId: "G-RQ783BLG3R"
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();

function signUp() {
  var email=document.getElementById("email").value;
  var password=document.getElementById("password").value;
  var repeat=document.getElementById("repeatPassword").value;

  if(password == repeat) {
    firebase.auth().createUserWithEmailAndPassword(email,password)
    .then(function() {
    alert("Registration Success!");
    window.location.href="login.html";

    }).catch(function (error) {

      var errorMessage=error.message;
      alert(errorMessage);
    });
  }
  else {
    alert("Password & Repeat Password do not match!");
  }
}