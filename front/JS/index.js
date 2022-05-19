let products = [];

async function init() {
    products = await getProducts(); 
    console.log(products);
    createHTML(products);
}    

function getProducts() {
    return ( 
    fetch('http://localhost:3000/api/products')
        .then((res) => res.json())
        .then((data) => {
            console.log("data", data);
            return data
        })
        .catch((data) => { 
            return error;
        }) 
    );
}

function createHTML(products){
    
    products.forEach(function(element){
        console.log(element);
    
        //Crée une balise a pour chaque produit
        const newA = document.createElement('a');
        const elementItems = document.getElementById('items');
        newA.href = ('./product.html?id=') + element._id;

        //Crée une balise article pour chaque produit
        const newArticle = document.createElement('article');

        //Crée une balise img pour chaque produit
        const newImg = document.createElement('img');
        newImg.src = element.imageUrl;
        newImg.alt = element.altTxt;

        //Crée une balise h3 pour chaque produit
        const newH3 = document.createElement('h3');
        newH3.className = ('productName');
        newH3.innerText = element.name;

        //Crée une balise p pour chaque produit
        const newP = document.createElement('p');
        newP.classList = ('productsDescription');
        newP.innerText = element.description;

        elementItems.appendChild(newA);
        newA.appendChild(newArticle);
        newArticle.appendChild(newImg);
        newArticle.appendChild(newH3);
        newArticle.appendChild(newP);

        });
}

init();