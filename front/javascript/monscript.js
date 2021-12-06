/*const newElt1 = document.createElement("a");
const newElt2 = document.createElement("article");
const newElt3 = document.createElement("img");
const newElt4 = document.createElement("h3");
const newElt5 = document.createElement("p");



elt.appendChild(newElt1);
newElt1.appendChild(newElt2);
newElt2.appendChild(newElt3,newElt4,newElt5);*/



fetch("http://localhost:3000/api/products")
  .then(function(res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function(products) {

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

          /*section_items.innerHTML +=
              '  <a href="./product.html?id=42">\n' +
              '            <article>\n' +
              '              <img src="'+ product.imageUrl +'" alt="'+ product.altTxt +'">\n' +
              '              <h3 class="productName">'+ product.name +'</h3>\n' +
              '              <p class="productDescription">'+ product.description +'</p>\n' +
              '            </article>\n' +
              '          </a>';*/
      });
  });

    /*for (var i = 0; i < products.length; i++){

    let product = products[i];
    let elt= document.getElementById("items");
    elt.innerHTML +=  
    '  <a href="./product.html?id=42">\n' +
    '            <article>\n' +
    '              <img src="'+ product.imageUrl +'" alt="'+ product.altTxt +'">\n' +
    '              <h3 class="productName">'+ product.name +'</h3>\n' +
    '              <p class="productDescription">'+ product.description +'</p>\n' +
    '            </article>\n' +
    '          </a>';
  })*/
