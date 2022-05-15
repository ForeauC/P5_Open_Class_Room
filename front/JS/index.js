// Envoi d'une réponse à l'API
fetch("http://localhost:3000/api/products/")
    .then(res => console.log(res))

// Parcourir l'ensemble des produits dans l'API
fetch("http://localhost:3000/api/products")
    .then(res => res.json())
    .then(data => console.log(data))

fetch("http://localhost:3000/api/products")
    .then(res => res.json())
    .then(data => productName = data[0].name)

function addElement () {
// Pour créer un nouveau élement "a" enfant de l'ID "items" dans le DOM de la page index.html     
    const newLink = document.createElement("a");
    const currentLink = document.getElementById('items');
    currentLink.appendChild(newLink)

// Pour créer un nouveau élement "article" enfant de la balise "a" dans le DOM de la page index.html
    const newArcticle = document.createElement("article");
    const currentArticle =document.querySelector('#items a')
    currentArticle.appendChild(newArcticle)

// Pour créer un élement "img" enfant de la balise "article" dans le dom de la page index.html  
    const newImage = document.createElement("img");
    
// Pour créer un élement "h3" enfant de la balise "article" dans le dom de la page index.html    
    const newH3 = document.createElement('h3');
    newH3.className = "productName";
    
// Pour créer un élement "p" enfant de la balise "article" dans le dom de la page index.html
    const newP = document.createElement('p');
    newP.className = "productDescription";
    
    const article = document.getElementsByTagName("article");

    article[0].appendChild(newImage)
    article[0].appendChild(newH3)
    article[0].appendChild(newP)

}

addElement ();

