//afficher les produits du LocalStorage
const productInLocalStorage = JSON.parse(localStorage.getItem("cart"));
console.log(productInLocalStorage);

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
            console.log("data", data);
            return data
        })
        .catch((data) => { 
            return error;
        }) 
    );
}

//Crée un nouveau tableau avec les élement des produits au complet 
function getProductsFromAPI(productInLocalStorage) {
    let completeProductTable = [];
    productInLocalStorage.forEach(productLS =>{ 

        getProducts(productLS.idProduct).then((productAPI) => {

            completeProductTable.push( {
                id: productAPI._id,
                name: productAPI.name,
                img: productAPI.imageUrl,
                price: productAPI.price,
                quantity: productLS.quantity,
                color: productLS.color
            }) 
        })
    });
        
    return completeProductTable;
}

function buildHTMLCart() {
    const elementToBuildHTML =  getProductsFromAPI(productInLocalStorage);
    console.log("element HTML", elementToBuildHTML)
    
    elementToBuildHTML.forEach(elementCart =>{
        
        const cartSection = document.getElementById("cart__items");

        const cartArcticle = document.createElement("article");
        cartArcticle.className = "cart--item";
        cartArcticle.dataset.id = "{product-id}";
        cartArcticle.dataset.color = "{product-color}";
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
        cartProductColor.innerText = elementToBuildHTML[product].color;
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
}


