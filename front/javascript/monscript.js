
fetch("http://localhost:3000/api/products")  // fonction permettant d'envoyer une requete à l'API et récupérer des données de l'API
  .then(function(res){
    if (res.ok) {
      return res.json(); // On récupère les données au format JSON
    }
  })
  .then(function(products) {  //Création des différents composants d'un produit et rajout sur la page grâce au DOM
      products.forEach(function (product) {
          let section_items = document.getElementById("items");

          const newA = document.createElement("a");
          newA.href = "./product.html?id=" + product._id;

          const newArticle = document.createElement("article");

          const newImage = document.createElement("img");
          newImage.src = product.imageUrl;
          newImage.alt = product.altTxt;

          const newH3 = document.createElement("h3");
          newH3.className = "productName";
          newH3.innerHTML = product.name;

          const newP = document.createElement("p");
          newP.className = "productDescription";
          newP.innerHTML = product.description;

          newA.appendChild(newArticle);
          newArticle.appendChild(newImage);
          newArticle.appendChild(newH3);
          newArticle.appendChild(newP);

          section_items.appendChild(newA);
      });
  });


