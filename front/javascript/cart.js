let totalArticles = 0;
let prixTotal = 0;

let newTotalQuantity = document.getElementById("totalQuantity"); //let span_article
let newTotalPrice = document.getElementById("totalPrice");





Object.keys(localStorage).forEach(function(key) {
  let ligne_de_panier = JSON.parse(localStorage.getItem(key));
  totalArticles += ligne_de_panier.quantity; //prixTotal += ligne_de_panier.price * ligne_de_panier.quantity;
  var tab = key.split("_");
  //prixTotal += ligne_de_panier.quantity * parseInt(tab[2]) ;
  
  var fetch_url = "http://localhost:3000/api/products/" + ligne_de_panier.id ;
  
  
                  fetch(fetch_url)
                  .then(function(res) {
                      if (res.ok) {
                      return res.json();
                      }
                  })
                  .then(function(product_item){
                    



                        //console.log(product_item.price);
                        //console.log(ligne_de_panier.quantity);

                      prixTotal += product_item.price * ligne_de_panier.quantity;
                  
                
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
                          newInput.dataset.id = ligne_de_panier.id
                          newInput.addEventListener("change", updateQuantity);
                
                          divContentSettingsQuantity.appendChild(newInput);
                
                          let divContentSettingsDelete = document.createElement("div");
                          divContentSettingsDelete.classList = "cart__item__content__settings__delete";
                
                          divContentSettings.appendChild(divContentSettingsDelete);
                
                          const newP3 = document.createElement("p");
                          newP3.className = "deleteItem";
                          newP3.innerHTML = "Supprimer";
                          newP3.addEventListener("click", deleteRow);
                
                          divContentSettingsDelete.appendChild(newP3);
                
                        article.appendChild(divImage);
                        article.appendChild(divContent);

                      newTotalQuantity.innerHTML = totalArticles;
                      newTotalPrice.innerHTML = prixTotal;
                });

  
      
    });

function updateQuantity(e) {
    console.log(this.value);
    console.log(this.dataset.id);
    let ligne_de_panier = JSON.parse(localStorage.getItem(this.dataset.id +'_'+ this.dataset.color));
    ligne_de_panier.quantity = e;
    Object.keys(localStorage).forEach(function(key) {
      let ligne_de_panier = JSON.parse(localStorage.getItem(key));
      totalArticles += ligne_de_panier.quantity; //prixTotal += ligne_de_panier.price * ligne_de_panier.quantity;
      var tab = key.split("_");
      //prixTotal += ligne_de_panier.quantity * parseInt(tab[2]) ;
      
      var fetch_url = "http://localhost:3000/api/products/" + ligne_de_panier.id ;
      
      
                      fetch(fetch_url)
                      .then(function(res) {
                          if (res.ok) {
                          return res.json();
                          }
                      })
                      .then(function(product_item){
                        
    
    
    
                            //console.log(product_item.price);
                            //console.log(ligne_de_panier.quantity);
    
                          prixTotal += product_item.price * ligne_de_panier.quantity;})});
                      

    /*
        1. récupérer la ligne du panier qui est modifier
            this.dataset.id + this.dataset.color à chercher dans le localStorage
        2. Mettre à jour la ligne de panier dans le localStorage
        3. Sauvegarder dans le localStorage la ligne de panier à jour
        4. Mettre à jour le prix total + total article du panier
     */
}

function deleteRow(e) {
        /*
        1. récupérer la ligne du panier qui est modifier
            this.dataset.id + this.dataset.color à chercher dans le localStorage
            2. Supprime la l'élement HTML <article> de la ligne du panier
            3. supprimer la ligne du panier du localStorage
            4. Mettre à jour le prix total + total article du panier
         */
            let ligne_de_panier = JSON.parse(localStorage.getItem(this.dataset.id +'_'+ this.dataset.color));
            e = this.dataset.id +'_'+ this.dataset.color;
            if (article.dataset.id === ligne_de_panier.id && article.dataset.color === ligne_de_panier.color){
              article.remove();
            };
            localStorage.removeItem(e);
            Object.keys(localStorage).forEach(function(key) {
              let ligne_de_panier = JSON.parse(localStorage.getItem(key));
              totalArticles += ligne_de_panier.quantity; //prixTotal += ligne_de_panier.price * ligne_de_panier.quantity;
              var tab = key.split("_");
              //prixTotal += ligne_de_panier.quantity * parseInt(tab[2]) ;
              
              var fetch_url = "http://localhost:3000/api/products/" + ligne_de_panier.id ;
              
              
                              fetch(fetch_url)
                              .then(function(res) {
                                  if (res.ok) {
                                  return res.json();
                                  }
                              })
                              .then(function(product_item){
                                
            
            
            
                                    //console.log(product_item.price);
                                    //console.log(ligne_de_panier.quantity);
            
                                  prixTotal += product_item.price * ligne_de_panier.quantity;})})};


const validation = document.getElementsByClassName("cart__order__form")[0];
var prenom = document.getElementById("firstName").value;
var nom = document.getElementById("lastName").value;
var adresse = document.getElementById("address").value;
var ville = document.getElementById("city").value;
var adresseMail = document.getElementById("email").value;
function valider(){
  // Storing Field Values In Variables
if (prenom != '' && nom != '' && adresseMail != '') {return true;
};
}

validation.onsubmit = "return valider()"

let produitsId = [];
Object.values(localStorage).forEach(function(objet){

let JSONobjet = JSON.parse(objet);
produitsId = produitsId.concat([JSONobjet.id]) ;
});

fetch("http://localhost:3000/api/products/orderId", {
      method: "POST",
      body: JSON.stringify({
        "contact": {
              "firstName": prenom,
              "lastName": nom,
              "address": adresse,
              "ville": ville,
              "email": adresseMail
            },
            "products": produitsId,
          }),
      headers: {
  'Accept': 'application/json', 
        "Content-type": "application/json; charset=UTF-8"
                }
})
.then(function(res) {
  if (res.status==200) {
  return res.json();
  }
else{ return "Erreur 404"}
})
.then(function(value) {
  console.log(value);
})
.catch(function(err) {
  // Une erreur est survenue
});

/*
Pour la commande :
1. Vérifier sir tous les champs sont bien remplie

envoyer une requete HTTP POST vers http://localhost:3000/api/order avec le body ayant cette structure en JSON :*/
/**
  *
  * Expects request to contain:
  * contact: {
  *   firstName: string,
  *   lastName: string,
  *   address: string,
  *   city: string,
  *   email: string
  * }
  * products: [string] <-- array of product _id
  *
  */

/*
Récupérer l'orderId en réponse si http 201
http 400 en cas d'erreur
fetch("https://jsonplaceholder.typicode.com/posts", {

    // Adding method type
    method: "POST",

    // Adding body or contents to send
    body: JSON.stringify({
        title: "foo",
        body: "bar",
        userId: 1
    }),

    // Adding headers to the request
    headers: {
        "Content-type": "application/json; charset=UTF-8"
    }
})

*/
/*
const commander = document.getElementById("order")
commander.addEventListener("click", changeURL());
function changeURL (e){
  e.preventdefault();
  window.location.assign(window.location.origin + '/front/html/confirmation.html');
}
*/
