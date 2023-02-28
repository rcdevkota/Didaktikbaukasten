var varienteName;
var menge;
//nimmt bild ausgabe
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
//aufruf der function nach dem bestellen butten
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
