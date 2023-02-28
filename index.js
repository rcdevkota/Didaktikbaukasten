var varienteName;
var menge;
//this function is called when user selects different radio buttons 
//different 3d image is schon according to the user selection
function displaySelected() {

  var image = document.querySelector('input[name="image-select"]:checked').value;
  var selectedImage = document.getElementById("selected-image");
    selectedImage.src = image + ".glb";
    switch (image) {
  case 'resources/image1':
   varienteName = "Einstieg - Budget"
     break;
      case 'resources/image2':
   varienteName = "Einstieg - hochwertig"
     break;
      case 'resources/image3':
   varienteName = "Vollausstattung- Budget"
     break;
      case 'resources/image4':
   varienteName = "Vollausstattung- hochwertig"
     break;
    }
}
//after the user selects and enters the right data and clicks the order button this function is called
//here AJAX is used to send data from frontend to the backend server containing database 
//
//for further information see the server.js file
async function  order() {
    var number_input = document.getElementById("number_input");
    menge = number_input.value;
    $.ajax({
    type: 'POST',
    url: 'http://127.0.0.1:3000/insert',
    data: { variation: varienteName,quantity:menge },
    success: function(result) {
        console.log(result);
    },
    error: function(error) {
        console.log(error);
    }
});
} 
