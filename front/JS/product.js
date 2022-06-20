const colorsOption = document.getElementById("colors");
const productQuantity = document.getElementById("quantity");    
const addToCartButton = document.getElementById("addToCart");
let product = [];


async function init(){
    product = await getProductById();
    console.log(product)
    checkProduct();
    clickButtonCard();
    
}

function checkProduct() {
    if (Object.keys(product).length === 0) {
    const title = document.querySelector(".item");
    const errorTitle = document.createElement("h3");
    errorTitle.innerText = "Pas de produits disponible";
    errorTitle.style.color = "red";
    title.appendChild(errorTitle);
    } else  {
        buildHTML();
    }
}

//function pour récupérer le produit avec son ID à partir de l'API
function getProductById() {
    let params = new URL(document.location).searchParams;
    let id = params.get("id");// id du produit
    return ( 
        fetch(`http://localhost:3000/api/products/${id}`)
            .then((res) => res.json())
            .then((data) => {
                return data
            })
            .catch((error) => { 
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

const errorElementColor = document.querySelector('.item__content__settings__color');

//Message d'erreur quand la couleur n'est pas renseigner
function showError (errorElementColor, errorClass, errorMessage) {
    const errorMsg = document.createElement('p');
    errorMsg.classList.add(errorClass);
    errorMsg.textContent = errorMessage;
    errorMsg.style.color = 'red';
    errorMsg.style.fontSize = '15px'
    errorMsg.style.textAlign ='center';
    errorMsg.style.padding = '5px';
    errorMsg.style.margin = '5px';
    errorElementColor.appendChild(errorMsg);
}

const errorElement = document.querySelector('.item__content__settings__quantity');

//Message d'erreur quand la quantité n'est pas renseigner
function showErrorQ (errorElement, errorClass, errorMessage) {
    const errorMsg = document.createElement('p');
    errorMsg.classList.add(errorClass);
    errorMsg.textContent = errorMessage;
    errorMsg.style.color = 'red';
    errorMsg.style.fontSize = '15px'
    errorMsg.style.textAlign ='center';
    errorMsg.style.padding = '5px';
    errorMsg.style.margin = '5px';
    errorElement.appendChild(errorMsg);
}

//Supression des message d'erreur 
function clearError() {
    let errorMsgColor = document.querySelector('.errorColor')
    let errorMsgQuantity = document.querySelector('.errorQuantity')

    if (errorMsgColor !== null) {
        errorMsgColor.remove();
    } if (errorMsgQuantity != null) {
        errorMsgQuantity.remove()
    } else {
        return false;
    }  
}


function clickButtonCard() {
    addToCartButton.addEventListener("click", (event) => {
        addToBasket();
    })
}

// vérifier les champs
function addToBasket() {
    const color = colorsOption.value;
    const quantity = productQuantity.value;
    clearError()
        //si au moin une de ces valeurs n'est pas acceptée (ajout au panier invalide)
        if (color === ""  ) {
            showError(errorElementColor, 'errorColor', 'Merci de sélectionner une couleur');
        } if (quantity < 1 || quantity > 99) {
            showErrorQ(errorElement, 'errorQuantity', 'La quantité est invalide');
        } else if (color != "" && quantity >= 1 && quantity < 99) {
            const validProduct = {
                color: color,
                quantity: quantity,
                idProduct : product._id,
            };
            alert("produit ajouté au panier avec succès")
            addCart(validProduct);
            location.reload();
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
    const color = colorsOption.value;
    const quantity = productQuantity.value;  
    
    let cart = getCart();

    let foundProduct = cart.find(p => p.id === product.id && p.color === product.color);
    // Si trouvé, ajustement quantité
    if(foundProduct != undefined){
        foundProduct.quantity += parseInt(quantity);
 
    // Sinon ajouter un nouveau produit
    }else{
        product.quantity = parseInt(quantity);        
       
        product.color = color
        cart.push(product)
    }
    saveCart(cart);
}


init();
