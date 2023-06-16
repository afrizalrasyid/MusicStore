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

var tbPiano = document.getElementById('tb_piano');
var databaseRef = firebase.database().ref('product_piano/');
var rowIndex = 1;

databaseRef.once('value', function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
        var childKey = childSnapshot.key;
        var childData = childSnapshot.val();
        var row = tbPiano.insertRow(rowIndex);
        var cellId = row.insertCell(0);
        var cellName = row.insertCell(1);
        var cellSeri = row.insertCell(2);
        var cellPrice = row.insertCell(3);
        var cellAbout = row.insertCell(4);{}
        cellId.appendChild(document.createTextNode(childKey));
        cellName.appendChild(document.createTextNode(childData.name));
        cellSeri.appendChild(document.createTextNode(childData.seri));
        cellPrice.appendChild(document.createTextNode(childData.price));                                
        cellAbout.appendChild(document.createTextNode(childData.about));                                
        rowIndex = rowIndex + 1;
    });
    
    var table = document.getElementById("tb_piano");
    var rows = table.getElementsByTagName("tr");
    
    for (i = 0; i < rows.length; i++) {
            var currentRow = table.rows[i];
            var createClickHandler = function(row) {
                return function() {
                    var cell1 = row.getElementsByTagName("td")[0];
                    var cell2 = row.getElementsByTagName("td")[1];
                    var cell3 = row.getElementsByTagName("td")[2];
                    var cell4 = row.getElementsByTagName("td")[3];
                    var cell5 = row.getElementsByTagName("td")[4];
                    var id = cell1.innerHTML;
                    var name = cell2.innerHTML;
                    var seri = cell3.innerHTML;
                    var price = cell4.innerHTML;
                    var about = cell5.innerHTML;                           
                    document.getElementById('uid').value = id;
                    document.getElementById('name').value = name;
                    document.getElementById('seri').value = seri;
                    document.getElementById('price').value = price;
                    document.getElementById('about').value = about;
                    
                };
            };
        currentRow.onclick = createClickHandler(currentRow);
        }
    });


    function update_product(){
        var name = document.getElementById('name').value;
        var seri = document.getElementById('seri').value;
        var price = document.getElementById('price').value;
        var about = document.getElementById('about').value;
        var uid = document.getElementById('uid').value;
        var data = {
            name: name,
            seri: seri,
            price: price,
            about: about
        }
        var updates = {};
        updates['/product_piano/' + uid] = data;
        firebase.database().ref().update(updates);
        alert('product updated successfully!');               
        reload_page();
    }
    
    function delete_product(){
        var uid = document.getElementById('uid').value;
        firebase.database().ref().child('/product_piano/' + uid).remove();
        alert('product deleted successfully!');
        reload_page();
    }
    
    function reload_page(){
        window.location.reload();
    }