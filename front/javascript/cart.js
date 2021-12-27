//Affichage des articles dans le panier calcul du Nombre total d'articles et du prix total du panier

let totalArticles = 0;
let prixTotal = 0;

let newTotalQuantity = document.getElementById("totalQuantity"); 
let newTotalPrice = document.getElementById("totalPrice");

Object.keys(localStorage).forEach(function(key) {
  let ligne_de_panier = JSON.parse(localStorage.getItem(key));
  totalArticles += parseInt(ligne_de_panier.quantity); 
  prixTotal += ligne_de_panier.price * ligne_de_panier.quantity;
  var fetch_url = "http://localhost:3000/api/products/" + ligne_de_panier.id ;
  fetch(fetch_url) 
  .then(function(res) {
      if (res.ok) {
        return res.json();
      }
  })
  .then(function(product_item){
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
    newInput.dataset.id = ligne_de_panier.id;
    newInput.dataset.color = ligne_de_panier.color;
    newInput.addEventListener("change", updateQuantity);

    divContentSettingsQuantity.appendChild(newInput);

    let divContentSettingsDelete = document.createElement("div");
    divContentSettingsDelete.classList = "cart__item__content__settings__delete";

    divContentSettings.appendChild(divContentSettingsDelete);

    const newP3 = document.createElement("p");
    newP3.className = "deleteItem";
    newP3.innerHTML = "Supprimer";
    newP3.dataset.id = ligne_de_panier.id;
    newP3.dataset.color = ligne_de_panier.color;
    newP3.addEventListener("click", deleteRow);

    divContentSettingsDelete.appendChild(newP3);

    article.appendChild(divImage);
    article.appendChild(divContent);

    newTotalQuantity.innerHTML = totalArticles;
    newTotalPrice.innerHTML = prixTotal;
    });
 
});

function updateQuantity(e) {    //fonction permettant de mettre à jour la quantité saisie dans le panier
    let a= this.dataset.id;
    let idString = a.toString();
    console.log(idString);
    let b= this.dataset.color;
    let colorString = b.toString();
    let ligne_de_panier = JSON.parse(localStorage.getItem(idString +'_'+ colorString));
    localStorage.removeItem(idString +'_'+ colorString);
    ligne_de_panier.quantity = this.value;
    localStorage.setItem(idString +'_'+ colorString, JSON.stringify(ligne_de_panier));
    updateTotalPriceAndQuantity() // fonction mettant à jour la quantité totale et le prix total
}

function deleteRow(e) { //fonction permettant de supprimer une ligne dans le panier
    console.log(this.parentElement.parentElement.parentElement.parentElement);
    console.log(this.dataset.id);
    console.log(this.dataset.color);
    let a= this.dataset.id;
    let idString = a.toString();
    console.log(idString);
    let b= this.dataset.color;
    let colorString = b.toString();
    //console.log(colorString);
    let ligne_de_panier = JSON.parse(localStorage.getItem(idString +'_'+ colorString));
    localStorage.removeItem(idString +'_'+ colorString);
    document.querySelector('article[data-id="'+idString+'"]').remove();
    updateTotalPriceAndQuantity();
}

function updateTotalPriceAndQuantity() { //fonction calculant le prix total et le nombre total d'articles
    let new_prixTotal = 0;
    let new_totalArticles = 0;

    Object.keys(localStorage).forEach(function(key) {
        let ligne_de_panier_bis = JSON.parse(localStorage.getItem(key));
        new_totalArticles += parseInt(ligne_de_panier_bis.quantity);
        new_prixTotal += ligne_de_panier_bis.price * ligne_de_panier_bis.quantity;
    });

    prixTotal = new_prixTotal;
    totalArticles = new_totalArticles;
    newTotalQuantity.innerHTML = totalArticles;
    newTotalPrice.innerHTML = prixTotal;
}



//variables regex pour valider le format

let nomRegex = /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]*$/;
let prenomRegex = /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]*$/;
let adresseRegex = /([-0-9çéà'a-zA-Z,\. ]*)?([0-9]{5})?([a-zA-Z]*)/;
let villeRegex = /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]*$/;
let adresseMailRegex = /^[_a-z0-9-]+(.[_a-z0-9-]+)*@[a-z0-9-]+(.[a-z0-9-]+)*(.[a-z]{2,4})$/;



//Validation formulaire 

const validation = document.getElementsByClassName("cart__order__form")[0];
validation.addEventListener("submit", valider);


function valider(e){ // fonction validant les données saisies dans le formulaire avec messages d'erreur
    e.preventDefault();
    let prenom = document.getElementById("firstName").value;
    let nom = document.getElementById("lastName").value;
    let adresse = document.getElementById("address").value;
    let ville = document.getElementById("city").value;
    let adresseMail = document.getElementById("email").value;
   
    if(prenomRegex.test(prenom))  { alert("prénom bien rempli");}
    else{ 
        alert("Erreur, veuillez saisir un prénom composé de lettres et quelques caractères spéciaux")  
        document.getElementById("firstNameErrorMsg").innerHTML = "Erreur, veuillez saisir un prénom composé de lettres et quelques caractères spéciaux";
        return false;
    };

    if(nomRegex.test(nom))  { alert("nom bien rempli");}
    else{ 
        alert("Erreur, veuillez saisir un nom composé de lettres et quelques caractères spéciaux")  
        document.getElementById("lastNameErrorMsg").innerHTML = "Erreur, veuillez saisir un nom composé de lettres et quelques caractères spéciaux";
        return false;
    };

    if(adresseRegex.test(adresse))  { alert("adresse bien remplie");}
    else{ 
        alert("Erreur, veuillez saisir une adresse valide");
        document.getElementById("addressErrorMsg").innerHTML = "Erreur, veuillez saisir une adresse valide";
        return false;
        };

    if(villeRegex.test(ville) ) { alert("ville bien remplie");}
    else{ 
        alert("Erreur, veuillez saisir une adresse valide");
        document.getElementById("cityErrorMsg").innerHTML = "Erreur, veuillez saisir une ville valide";
        return false;
    };

    if(adresseMailRegex.test(adresseMail))  { alert("email bien rempli");}
    else{ 
        alert("Erreur, veuillez saisir une adresse email valide")  
        document.getElementById("emailErrorMsg").innerHTML = "Erreur, veuillez saisir une adresse email valide";
        return false;
    };
    
    if (prenomRegex.test(prenom) && nomRegex.test(nom) && adresseRegex.test(adresse) && villeRegex.test(ville) && adresseMailRegex.test(adresseMail) )
    {
        validateOrder();
    }
    else { alert("Veuillez remplir correctement le formulaire s'il vous plait ! ");
                document.getElementById("firstNameErrorMsg").innerHTML = "";
                document.getElementById("lastNameErrorMsg").innerHTML = "";
                document.getElementById("addressErrorMsg").innerHTML = "";
                document.getElementById("cityErrorMsg").innerHTML = "";
                document.getElementById("emailErrorMsg").innerHTML = "";
    };
}






function validateOrder() {   //fonction de validation de la commande

    let prenom = document.getElementById("firstName").value;
    let nom = document.getElementById("lastName").value;
    let adresse = document.getElementById("address").value;
    let ville = document.getElementById("city").value;
    let adresseMail = document.getElementById("email").value;

    let produitsId = [];
    Object.values(localStorage).forEach(function(objet){
        let JSONobjet = JSON.parse(objet);
        //produitsId = produitsId.concat([JSONobjet.id]) ;
        produitsId.push(JSONobjet.id)
    });

    fetch("http://localhost:3000/api/products/order", { // envoi requete post pour obtenir l'orderId
        method: 'post',
        body: JSON.stringify({
            "contact": {
                "firstName": prenom,
                "lastName": nom,
                "address": adresse,
                "city": ville,
                "email": adresseMail
            },
            "products": produitsId,
        }),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json; charset=UTF-8'
        },
        })
        .then(function (res) {
            if (res.ok) {
                return res.json();
            } else {
                console.log("Erreur");
            }
        })
        .then(function (response) {
            console.log(response);
            console.log(response.orderId);
            let orderIdToStringify = response.orderId;
            window.location.assign(window.location.origin + '/front/html/confirmation.html?id='+ orderIdToStringify.toString());
            
            }
        )
        .catch(function (err) {
            // Une erreur est survenue
        });
}

