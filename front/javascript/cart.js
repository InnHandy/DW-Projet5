
let totalArticles = 0;
let prixTotal = 0;

let newTotalQuantity = document.getElementById("totalQuantity");
let newTotalPrice = document.getElementById("totalPrice");





Object.keys(localStorage).forEach(function(key) {
  let ligne_de_panier = JSON.parse(localStorage.getItem(key));
  totalArticles += ligne_de_panier.quantity;
  var tab = key.split("_");
  prixTotal += ligne_de_panier.quantity * parseInt(tab[2]) ;
  
  var fetch_url = "http://localhost:3000/api/products/" + ligne_de_panier.id ;
  
  
  fetch(fetch_url)
                  .then(function(res) {
                      if (res.ok) {
                      return res.json();
                      }
                  })
                  .then(function(product_item){
                    
                    ;
                    
                    
                    
                  
                
                        let items = document.getElementById("cart__items");
                
                        let article = document.createElement("article");
                        article.classList = "cart__item";
                        article.dataset.id = ligne_de_panier.id;
                        article.dataset.color = ligne_de_panier.color;
                        
                
                        items.appendChild(article);
                
                        let divImage = document.createElement("div");
                        divImage.classList = "cart__item__img";
                
                        const newImage = document.createElement("img");
                          newImage.src = product_item.imageUrl;
                          newImage.alt = product_item.altTxt;
                
                        divImage.appendChild(newImage);
                
                
                        let divContent = document.createElement("div");
                        divContent.classList = "cart__item__content";
                
                        let divContentDescription = document.createElement("div");
                        divContent.classList = "cart__item__content__description";
                
                        divContent.appendChild(divContentDescription);
                
                        const newH2 = document.createElement("h2");
                          newH2.className = "productName";
                          newH2.innerHTML = product_item.name;
                
                          const newP = document.createElement("p");
                          newP.innerHTML = ligne_de_panier.color;
                
                          const newP1 = document.createElement("p");
                          newP1.innerHTML = product_item.price;
                
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
                          newInput.value= ligne_de_panier.quantity;
                
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
                        
                        
    });

  
      
    });

    newTotalQuantity.innerHTML = totalArticles;
    newTotalPrice.innerHTML = prixTotal;

  


/**/




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
