Object.keys(localStorage).forEach(function(key) {
    let ligne_de_panier = JSON.parse(localStorage.getItem(key));
    var url1= window.location.href;
    var url = new URL(url1);
    var id = url.searchParams.get("id");
    var fetch_url = "http://localhost:3000/api/products/" + id ;

    let product_item = null;

    fetch(fetch_url)
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

        let prixTotal = quantité * newPrice ;

        let items = document.getElementById("cart__items");

        let article = document.createElement("article");
        article.classList = "cart__item";
        article.dataset.id = "mon-id-produit";
        article.dataset.color = "ma-couleur";
        

        items.appendChild(article);

        let divImage = document.createElement("div");
        divImage.classList = "cart__item__img";

        const newImage = document.createElement("img");
          newImage.src = product.imageUrl;
          newImage.alt = product.altTxt;

        divImage.appendChild(newImage);


        let divContent = document.createElement("div");
        divContent.classList = "cart__item__content";

        let divContentDescription = document.createElement("div");
        divContent.classList = "cart__item__content__description";

        divContent.appendChild(divContentDescription);

        const newH2 = document.createElement("h2");
          newH2.className = "productName";
          newH2.innerHTML = product.name;

          const newP = document.createElement("p");
          newP.className = "productDescription";
          newP.innerHTML = product.description;

          const newP1 = document.createElement("p");
          newP1.className = "productDescription";
          newP1.innerHTML = product.description;

          divContentDescription.appendChild(newH2);
          divContentDescription.appendChild(newP);
          divContentDescription.appendChild(newP1);


          let divContentSettings = document.createElement("div");
          divContentSettings.classList = "cart__item__content__settings";

          divContent.appendChild(divContentSettings);




          let divContentSettingsQuantity = document.createElement("div");
          divContentSettings.classList = "cart__item__content__settings__quantity";

          divContentSettings.appendChild(divContentSettingsQuantity);

          const newP2 = document.createElement("p");
          newP2.innerHTML = "Qté :";

          divContentSettingsQuantity.appendChild(newP2); 

          const newInput = document.createElement("input");
          newInput.type = "number";
          newInput.className="itemQuantity" ;
          newInput.name="itemQuantity" ;
          newInput.min="1" ;
          newInput.max="100"; 
          newInput.value="42";

          divContentSettingsQuantity.appendChild(newInput);

          let divContentSettingsDelete = document.createElement("div");
          divContentSettingsDelete.classList = "cart__item__content__settings__delete";

          divContentSettings.appendChild(divContentSettingsDelete);

          const newP3 = document.createElement("p");
          newP3.className = "deleteItem";
          newP3.innerHTML = "Supprimer";

          divContentSettingsDelete.appendChild(newP3);

        article.appendChild(divImage);
        article.appendChild(divContent);
        
        let newTotalQuantity = document.getElementById("totalQuantity");
        newTotalQuantity.innerHTML = product.name;
        
        let newTotalPrice = document.getElementById("totalPrice");
        newTotalPrice.innerHTML = product.name;
        





/*
1. Parcourir ton panier dans le localStorage avec Object.keys(localStorage)
    Object.keys(localStorage).forEach(function(key) {
        let ligne_de_panier = JSON.parse(localStorage.getItem(key));

        2. Récupérer le prix unitaire dynamiquement à partir de l'API
        3. Incrémenter le nombre total des articles du panier + le prix total (quantité * prix unitaire)
    });
 */


/*
let items = document.getElementById("cart__items");

let article = document.createElement("article");
article.classList = "cart__item";
article.dataset.id = "mon-id-produit";
article.dataset.color = "ma-couleur";

items.appendChild(article);


let article2 = items.getElementsByTagName("article")[0];
console.log(article2.dataset.id);
*/