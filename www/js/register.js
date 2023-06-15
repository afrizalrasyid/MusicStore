import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";

import { 
        getAuth, 
        createUserWithEmailAndPassword, 
    } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";

import {
    getDatabase,
    set,
    ref,
} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-database.js";

const firebaseConfig = {

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
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

let signupButton = document.getElementById("signup-button");

signupButton.addEventListener("click", (e) => {
    var name = document.getElementById("username").value;    
    var emailSignup = document.getElementById("email").value;
    var passwordSignup = document.getElementById("password").value;
  
    //========= START - MEMBUAT FUNGSI UNTUK FORM KOSONG =========\\
    if (name == "") {
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 5000,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
      });
  
      Toast.fire({
        icon: "warning",
        title: "Input Form Cannot Be Empty",
      });
      return false;
    }
    
    if (emailSignup == "") {
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 5000,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
      });
  
      Toast.fire({
        icon: "warning",
        title: "Input Form Cannot Be Empty",
      });
      return false;
    }
    if (passwordSignup == "") {
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 5000,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
      });
  
      Toast.fire({
        icon: "warning",
        title: "Input Form Cannot Be Empty",
      });
      return false;
    }
    //========= END - MEMBUAT FUNGSI UNTUK FORM KOSONG =========\\
  
    //========= START - MEMBUAT FUNGSI PANJANG KARAKTER PASSWORD =========\\
    if (passwordSignup.length < 6) {
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 5000,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
      });
  
      Toast.fire({
        icon: "error",
        title: "Password should be at least 6 characters",
      });
      return false;
    }
    //========= END - MEMBUAT FUNGSI PANJANG KARAKTER PASSWORD =========\\
  
    //========= START - MEMBUAT FUNGSI REGISTER =========\\
    createUserWithEmailAndPassword(auth, emailSignup, passwordSignup)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
  
        set(ref(database, "users/" + user.uid), {
          name: name,          
          email: emailSignup,
          password: passwordSignup,
        })
          .then(() => {
            // Data saved successfully!
            const Toast = Swal.mixin({
              toast: true,
              position: "top-end",
              showConfirmButton: false,
              timer: 5000,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.addEventListener("mouseenter", Swal.stopTimer);
                toast.addEventListener("mouseleave", Swal.resumeTimer);
              },
            });
  
            Toast.fire({
              icon: "success",
              title: "User Berhasil Ditambahkan",
            }).then(function () {
              window.location = "index.html"; // Redirecting to other page.
            });
          })
          .catch((error) => {
            //the write failed
            alert(error);
          });
      })
      .catch((error) => {
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 5000,
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
          },
        });
  
        Toast.fire({
          icon: "error",
          title: "E-mail Already Registered",
        });
        return false;
      });
    //========= END - MEMBUAT FUNGSI REGISTER =========\\
  });
