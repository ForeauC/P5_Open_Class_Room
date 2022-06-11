
//afficher les produits du LocalStorage
const productInLocalStorage = JSON.parse(localStorage.getItem("cart"));
//console.log(productInLocalStorage);


async function init() {
    noProductInLocalStorage();
}
init();

//Si il n'y as pas de produit dans le localStorage sinon afficher le ou les produits
function noProductInLocalStorage() {
    const cartH1 = document.querySelector("h1");
    if (productInLocalStorage === null || productInLocalStorage === 0) {
        cartH1.innerText = "Votre panier est vide.";
    } else {
        buildHTMLCart();
    }
}

//Chercher les produits avec leur ID
function getProducts(idProduct) {
    return ( 
    fetch(`http://localhost:3000/api/products/${idProduct}`)
        .then((res) => res.json())
        .then((data) => {
            //console.log("data", data);
            return data
        })
        .catch((data) => { 
            return error;
        }) 
    );
}

//Crée un nouveau tableau avec les élement des produits au complet 
async function getProductsFromAPI() {
    let completeProductTable = [];

    for (const productLS of productInLocalStorage) {
        await getProducts(productLS.idProduct).then((productAPI) => {

            completeProductTable.push( {
                id: productAPI._id,
                name: productAPI.name,
                img: productAPI.imageUrl,
                price: productAPI.price,
                quantity: productLS.quantity,
                color: productLS.color
            }) 
        })
    }        
    return completeProductTable;
}

async function buildHTMLCart(){

    const elementToBuildHTML =   await getProductsFromAPI();
    console.log("element HTML", elementToBuildHTML)
    
    elementToBuildHTML.forEach(elementCart =>{
        console.log(elementCart)

        const cartSection = document.getElementById("cart__items");

        const cartArcticle = document.createElement("article");
        cartArcticle.className = "cart--item";
        cartArcticle.dataset.id = elementCart.id;
        cartArcticle.dataset.color = elementCart.color;
        cartSection.appendChild(cartArcticle);

        const cartDivImg = document.createElement("div");
        cartDivImg.className = "cart__item__img";
        cartArcticle.appendChild(cartDivImg);

        const cartProductImg = document.createElement("img");
        cartProductImg.className = "cart__product__img";
        cartProductImg.src = elementCart.img;
        cartDivImg.appendChild(cartProductImg);

        const cartDivContent = document.createElement("div");
        cartDivContent.className = "cart__item__content";
        cartArcticle.appendChild(cartDivContent);

        const cartDivContentDescription = document.createElement("div");
        cartDivContentDescription.className = "cart__item__content__desciption";
        cartDivContent.appendChild(cartDivContentDescription);

        const cartProductName = document.createElement("h2");
        cartProductName.className = "cart__product__name";
        cartProductName.innerText = elementCart.name;
        cartDivContentDescription.appendChild(cartProductName);

        const cartProductColor = document.createElement("p")
        cartProductColor.innerText = elementCart.color;
        cartDivContentDescription.appendChild(cartProductColor);

        const cartProductPrice = document.createElement("p");
        cartProductPrice.className = "cart__product__price"
        cartProductPrice.innerText = elementCart.price + "€";
        cartDivContentDescription.appendChild(cartProductPrice);

        const cartDivContentSetting = document.createElement("div");
        cartDivContentSetting.className = "cart__item__content__settings";
        cartDivContent.appendChild(cartDivContentSetting);

        const cartContentQuantity = document.createElement("div");
        cartContentQuantity.className = "cart__item__content__settings__quantity";
        cartDivContentSetting.appendChild(cartContentQuantity);

        const cartProductQuantity = document.createElement("p")
        cartProductQuantity.innerText = "Qté :";
        cartContentQuantity.appendChild(cartProductQuantity);

        const cartInputQuantity = document.createElement("input");
        cartInputQuantity.type = "number";
        cartInputQuantity.className = "itemQuantity";
        cartInputQuantity.name = "itemQuantity";
        cartInputQuantity.min = "1";
        cartInputQuantity.max ="100";
        cartInputQuantity.value = elementCart.quantity;
        cartContentQuantity.appendChild(cartInputQuantity);

        const cartDivContentDelete = document.createElement("div");
        cartDivContentDelete.className = "cart__item__content__settings__delete";
        cartDivContentSetting.appendChild(cartDivContentDelete);

        const cartProductDelete = document.createElement("p");
        cartProductDelete.className= "deleteItem";
        cartProductDelete.innerText = "Supprimer";
        cartDivContentDelete.appendChild(cartProductDelete);

    }); 
    AddEventchangeQuantity();

}

// calculer le nombre produit total dans le panier
function getNumberProduct () {
    let cart = getCart();
    let number = 0;
    for (let product of cart) {
        number += product.quantity;
    }
    let totalQuantity = document.getElementById("totalQuantity");
    totalQuantity.innerText = number;
}
getNumberProduct();

//calculer le prix total du panier
async function getTotalPrice() {
    const elementToBuildHTML = await getProductsFromAPI();
    let totalPrice = 0;
    for (let product of elementToBuildHTML) {
        const elementToBuildHTML = getProductsFromAPI()
        totalPrice += product.quantity * product.price;
    }
    let totalPriceCart = document.getElementById("totalPrice")
    totalPriceCart.innerText = totalPrice;
}
getTotalPrice();


//pour changer la quantité des produit du panier
function AddEventchangeQuantity() {
    const quantityInput = document.querySelectorAll(".itemQuantity");
    quantityInput.forEach((quantityProduct) => {
        quantityProduct.addEventListener("change", (e) => {
            changeQuantity(e);
        })
    })

}
// fonction pour changer la quantité dans le dom et le local storage
function changeQuantity(e){
    const quantityElement = e.target.closest("input.itemQuantity");//cibler l'input pour le changement de quantité
    console.log("element", quantityElement);

    if(quantityElement != null) {

        const number = quantityElement.value;//valeur quantité dans le dom
        console.log("number", number)
        const productId = e.target.closest("article.cart--item").getAttribute('data-id');
        console.log("id",productId)//cibler l'id du produit
        const productColor = e.target.closest("article.cart--item").getAttribute('data-color');
        console.log("color",productColor)//cibler la couleur du produit

        let cart = getCart();//on vas chercher le contenu du LS
        console.log("caaart",cart)
        let foundProduct = cart.findIndex(p => p.idProduct === productId && p.color === productColor);//pour chercher le meme l'id et couleur dans le LS
        console.log("found",foundProduct)
       
        if (foundProduct != undefined) {
        cart[foundProduct].quantity = parseInt(number);//ajouter la nouvelle quantité au LS
        console.log("cart2", cart[2])
        cart.push(localStorage.setItem("cart", JSON.stringify(cart)))//push du nouveau panier avec la nouvelle quantité
        }
    }
    getNumberProduct();
    getTotalPrice();
    location.reload();
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

function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
}

