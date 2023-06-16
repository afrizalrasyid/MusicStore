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
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

function signIn() {
    var email=document.getElementById("email").value;
    var password=document.getElementById("password").value;
    firebase.auth().signInWithEmailAndPassword(email,password).then(function () {

    window.location.href="index.html";
    }).catch(function (error) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
            
            })
    });
}