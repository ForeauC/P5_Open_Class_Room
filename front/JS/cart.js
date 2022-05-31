
const productInLocalStorage = JSON.parse(localStorage.getItem("cart"));
console.log(productInLocalStorage);

async function init(){
    buildHTMLCart();
}

function buildHTMLCart() {
    const cartH1 = document.querySelector("h1");
    if (productInLocalStorage === null || productInLocalStorage === 0) {
        cartH1.innerText = "Votre panier est vide.";
    } else {
        for (let product in productInLocalStorage) {
          
        const cartSection = document.getElementById("cart__items");

        const cartArcticle = document.createElement("article");
        cartArcticle.className = "cart--item";
        cartArcticle.dataset.id = "{product-ID}";
        cartArcticle.dataset.color = "{product-color}";
        cartSection.appendChild(cartArcticle);

        const cartDivImg = document.createElement("div");
        cartDivImg.className = "cart__item__img";
        cartArcticle.appendChild(cartDivImg);

        const cartProductImg = document.createElement("img");
        cartProductImg.className = "cart__product__img";
        cartDivImg.appendChild(cartProductImg);

        const cartDivContent = document.createElement("div");
        cartDivContent.className = "cart__item__content";
        cartArcticle.appendChild(cartDivContent);

        const cartDivContentDescription = document.createElement("div");
        cartDivContentDescription.className = "cart__item__content__desciption";
        cartDivContent.appendChild(cartDivContentDescription);

        const cartProductName = document.createElement("h2");
        cartProductName.className = "cart__product__name";
        cartDivContentDescription.appendChild(cartProductName);

        const cartProductColor = document.createElement("p")
        cartProductColor.innerText = productInLocalStorage[product].color;
        cartDivContentDescription.appendChild(cartProductColor);

        const cartProductPrice = document.createElement("p");
        cartProductPrice.className = "cart__product__price"
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
        cartInputQuantity.value = productInLocalStorage[product].quantity;
        cartContentQuantity.appendChild(cartInputQuantity);

        const cartDivContentDelete = document.createElement("div");
        cartDivContentDelete.className = "cart__item__content__settings__delete";
        cartDivContentSetting.appendChild(cartDivContentDelete);

        const cartProductDelete = document.createElement("p");
        cartProductDelete.className= "deleteItem";
        cartProductDelete.innerText = "Supprimer";
        cartDivContentDelete.appendChild(cartProductDelete);

        }   
    }
}

function getProducts() {
    return ( 
    fetch(`http://localhost:3000/api/products/${productInLocalStorage.id}`)
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

function displayProduct() {
    const apiElement = getProducts();
    console.log("api el", apiElement);
    
    const cartProductImg = document.getElementsByClassName("cart__Product__Img")
    const cartProductName = document.getElementsByClassName("cart__product__name");
    const cartProductPrice = document.getElementsByClassName("cart__product__price");

    cartProductImg.src = apiElement.imageUrl;
    cartProductImg.alt = apiElement.altTxt;
    cartProductName.innerText = apiElement.name;
    cartProductPrice.value = apiElement.price;
    cartProductPrice.innerText = apiElement.price + "€";

}

displayProduct();

init();