let product = [];

async function init(){
    product = await getProductById();
    console.log(product)
    buildHTML();
    clickButtonCard();
}

//function pour récupérer le produit avec son ID à partir de l'API
function getProductById() {
    let params = new URL(document.location).searchParams;
    let id = params.get("id");// id du produit
    console.log(id);
    return ( 
        fetch(`http://localhost:3000/api/products/${id}`)
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

function buildHTML() {
    //ajout de l'image et du alt texte du produit à partir de l'API
    const itemImg = document.querySelector(".item__img");
    const productImg = document.createElement("img"); 
    productImg.src = product.imageUrl;
    productImg.alt = product.altText;
    itemImg.appendChild(productImg);
    //ajout du nom du produit à partir de l'API
    const productTitle = document.getElementById("title");
    productTitle.innerHTML = product.name;
    //ajout du prix du produit à partir de l'API
    const productPrice = document.getElementById("price");
    productPrice.innerHTML = product.price;
    //ajout de la description du produit à partir du produit 
    const productDescription = document.getElementById("description");
    productDescription.innerHTML = product.description;
        
    const productColorsChoice = document.getElementById("colors");
    //ajout du choix du couleur avec une boucle for à partir de l'API
    for (let i = 0; i < product.colors.length; i++){
        const colorChoice = document.createElement("option");
        colorChoice.value = product.colors[i];
        colorChoice.innerHTML = product.colors[i];
        productColorsChoice.appendChild(colorChoice);
    }     
}      

const colorsOption = document.getElementById("colors");
const productQuantity = document.getElementById("quantity");    
const addToCartButton = document.getElementById("addToCart");

const color = colorsOption.value;
const quantity = productQuantity.value;

function clickButtonCard() {
    addToCartButton.addEventListener("click", (event) => {
        addToBasket();
    })
}

function addToBasket() {
    const color = colorsOption.value;
    const quantity = productQuantity.value;
        //si au moin une de ces valeurs n'est pas acceptée (ajout au panier invalide)
        if (color == "" || quantity < 1 || quantity > 100) {
            alert("Renseignez la couleur") = color;
            alert("Rensignez la bonne quantité") = quantity;
        } else {
            const validProduct = {
                color: color,
                quantity: quantity,
                idProduct : product._id,
            };
            alert("produit ajouté au panier avec succès")
            console.log(validProduct);
            addCart(product);
        }
}

//Function qui permet d'enregister le panier dans le local storage
function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
}
    
// Function qui permet de récuper l'item "cart"
function getCart() {
    let cart = (localStorage.getItem("cart"));
    if(cart == null){
        return [];
    }else{
        return JSON.parse(cart);
    }      
}

// function pour ajouter au panier
function addCart(product) {
    let cart = getCart();
    let foundProduct = cart.find(p => p.id == product.id);
    if(foundProduct != undefined){
        foundProduct.quantity++;
    }else{
        product.quantity = 1;
        cart.push(product)
    }
    saveCart(cart);
}


init();




