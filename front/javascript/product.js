var url1= window.location.search;
var str = "http://127.0.0.1:5500/front/html/product.html?id=107fb5b75607497b96722bda5b504926";
var url = new URL(str);
var id = url.searchParams.get("id");

fetch("http://localhost:3000/api/products/107fb5b75607497b96722bda5b504926")
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
    

    
    let class_img = document.getElementById("Imaje");
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

    

    
  })