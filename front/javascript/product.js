var url1= window.location.href;
var url = new URL(url1);
var id = url.searchParams.get("id");
var fetch_url = "http://localhost:3000/api/products/" + id ;

let product_item = null;

fetch(fetch_url) // Envoi d'une requete GET à l'API pour afficher le produit
  .then(function(res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function(product){
    product_item = product;

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

cliquer.setAttribute('onclick', "alerter()");

function alerter() { //fonction assurant le choix d'une couleur et d'une quantité pour un ajout dans le panier
    if (x1.value ==0 || x2.value=="" ){
        alert("veuillez renseigner la couleur ou une quantité")
    }
    else {
        //"1" + 1 = "11";
        let quantity = parseInt(x1.value); //string
        let color    = x2.value;
        if(product_item != null) {
            let key = product_item._id + '_' + color ; //id unique de mon produit + la liste des attributs (couleur du kanap)

            if(localStorage.getItem(key) !== null) {
                let ligne_de_panier = JSON.parse(localStorage.getItem(key));
                ligne_de_panier.quantity += quantity;
                localStorage.setItem(key, JSON.stringify(ligne_de_panier));
            }
            else {
                let ligne_de_panier = {
                    quantity: quantity,
                    color: color,
                    id: product_item._id,
                    price: product_item.price,
                }
                localStorage.setItem(key, JSON.stringify(ligne_de_panier));
            }
        }
        alert("Votre kanap a bien été ajouté au panier :)");
    }


}




