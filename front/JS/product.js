let product = [];

async function init(){
    product = await getProductById();
    console.log(product)
    buildHTML(product);
    addToCard ();
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

function addToCard () {
    const colorsOption = document.getElementById("colors");
    const productQuantity = document.getElementById("quantity");    
    const addToCartButton = document.getElementById("addToCart");
    //Click sur le bouton "ajouter panier" 
    addToCartButton.addEventListener("click", (event) => {
        const color = colorsOption.value;
        const quantity = productQuantity.value;
        //si au moin une de ces valeurs n'est pas acceptée (ajout au panier invalide)
        if (color == "" || quantity < 1 || quantity > 100) {
            alert("Renseignez la couleur") = color;
            alert("Rensignez la bonne quantité") = quantity;
        //sinon valider le produit avec couleur / quantité / ID du produit
        } else {
            const validProduct = {
                color: color,
                quantity: quantity,
                idProduct : product._id,
            };
            alert("produit ajouté au panier avec succès")
            console.log(validProduct);
        }// si il y a déja un produit du même modéle et même couleurs dans localStorage
        if (localStorage.getItem("product")) {
            const productInLocalStorage = JSON.parse(localStorage.getItem("product"));
            const searchProduct = productInLocalStorage.find(product => product.color === color && product.idProduct == id);
            //ajouter seulement une nouvelle quantité
            if (searchProduct){
                const newQuantity = parseInt(quantity) + parseInt(searchProduct.quantity);
                searchProduct = newQuantity;
                localStorage.setItem("product", JSON.stringify(productInLocalStorage));
            }else{ //sinon ajouter le produit dans localStorage
                const productInLocalStorage = JSON.parse(localStorage.getItem("product"));
                productInLocalStorage.push(validProduct);
                localStorage.setItem("product", JSON.stringify(productInLocalStorage));
                console.log(productInLocalStorage)
            }
        }
        
    })
        
}             

init();




