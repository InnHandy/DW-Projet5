const newElt1 = document.createElement("a");
const newElt2 = document.createElement("article");
const newElt3 = document.createElement("img");
const newElt4 = document.createElement("h3");
const newElt5 = document.createElement("p");

let elt= document.getElementById("items");

elt.appendChild(newElt1);
newElt1.appendChild(newElt2);
newElt2.appendChild(newElt3,newElt4,newElt5);



fetch("http://localhost:3000/api/products")
  .then(function(res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function(value) {
    for (var i = 0; i < 9; i++){
    elt.innerHTML +=  
    '  <a href="./product.html?id=42">\n' +
    '            <article>\n' +
    '              <img src="'+ value[i].imageUrl +'" alt="'+ value[i].altTxt +'">\n' +
    '              <h3 class="productName">'+ value[i].name +'</h3>\n' +
    '              <p class="productDescription">'+ value[i].description +'</p>\n' +
    '            </article>\n' +
    '          </a>';
  }})
  .catch(function(err) {
    // Une erreur est survenue
  });