//Récupérer la valeur id à partir de l'URL


//ajouter un image du produit
const productImg = document.querySelector('.item__img');
const imgSofa = document.createElement('img');
productImg.appendChild(imgSofa);


const productDescription = document.getElementById('title');

const productPrice = document.getElementById('price');

const productColor = document.getElementById('color');

// Fonction pour récupérer un produit avec son id
async function getProductById (){
    let params = new URL(document.location).searchParams;
    let id = params.get("id");// id du produit
    console.log(id);
    console.log(`http://localhost:3000/api/products/${id}`)
    const response = await fetch(`http://localhost:3000/api/products/${id}`);
    if(response.ok){
        console.log(response)
        return response.json
    }     
}

const product = await getProductById();
createElements(product);

function createElements(array) {
    console.log(array)
    .then(function(product){
        product.forEach(function(element) {
            console.log(element);
        let productImg = document.querySelector(".item__img");
        let img = document.createElement("img"); // Create img for the product.
        productImg.appendChild(img);

        })
    })
    
}