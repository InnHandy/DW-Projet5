var url1= window.location.href;
var url = new URL(url1);
var id = url.searchParams.get("id");
var fetch_url = "http://localhost:3000/api/products/" + id ;

fetch(fetch_url)
  .then(function(res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function(product){
    
    let newTitle = document.getElementById("title");
    newTitle.innerHTML = product.name;

    let newPrice = document.getElementById("price");
    newPrice.innerHTML = product.price;

    let newDescription = document.getElementById("description");
    newDescription.innerHTML = product.description;

    let colors_items = document.getElementById("colors");
    

    
    let class_img = document.getElementsByClassName("item__img")[0];
    const newImage = document.createElement("img");
    newImage.src = product.imageUrl;
    newImage.alt = product.altTxt;
    class_img.appendChild(newImage);

    for (var i = 0; i < product.colors.length; i++){
        const newOption = document.createElement("option");
        newOption.value = product.colors[i];
        newOption.innerHTML = product.colors[i];
        colors_items.appendChild(newOption);
    };

  
  });

let cliquer = document.getElementById("addToCart");

let x1 = document.getElementById("quantity");

let x2 = document.getElementById("colors");


localStorage.clear();

let clicks = 0;


cliquer.setAttribute('onclick', "alerter()");

function alerter() {

  if (x1.value ==0 || x2.value=="" ){
    alert("veuillez renseigner la couleur ou une quantité")
  }
  else { let y = x1.value;let z = x2.value; let newCouleur = 'couleur'+ String(clicks); let newNombre = 'nombre'+ String(clicks); localStorage.setItem(newCouleur, z);
  localStorage.setItem(newNombre, y); }
  clicks += 1
};
monStockage= localStorage;

let panierKey = Object.keys(monStockage);





