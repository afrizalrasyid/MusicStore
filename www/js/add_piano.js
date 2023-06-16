import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-storage.js";
import { getDatabase, ref as r, push, onValue, set, remove } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-database.js";


// Your web app's Firebase configuration

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

// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const storage = getStorage(app);
const gambarRef = r(database, 'product_piano');

// Tambah data
let tambahButton = document.getElementById("insert");

tambahButton.addEventListener("click", (e) => {
    const name = document.getElementById('name').value;
    const seri = document.getElementById('seri').value;
    const about = document.getElementById('about').value;
    const price = document.getElementById('price').value;
    const file = document.getElementById('image').files[0];

    if (file && name && seri && about && price) {
        const storageRef = ref(storage, 'product_piano/' + file.name);

        uploadBytes(storageRef, file)
            .then(() => {
                getDownloadURL(storageRef)
                    .then((url) => {
                        const gambarDataRef = push(gambarRef);
                        set(gambarDataRef, {
                            name: name,
                            seri: seri,
                            about: about,
                            price: price,
                            url: url
                        })
                            .then(() => {
                                console.log('Image successfully upload!');
                                document.getElementById('name').value = '';
                                document.getElementById('seri').value = '';
                                document.getElementById('about').value = '';
                                document.getElementById('price').value = '';
                                document.getElementById('image').value = '';
                                alert("Data added succcessfully")
                            })
                            .catch((error) => {
                                console.error('Error:', error);
                            });
                    })
                    .catch((error) => {
                        console.error('Error:', error);
                    });
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
}

);