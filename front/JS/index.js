// La fonction addProduct permet de récupère tous les produits par l'API 
async function addProducts() {
    const response = await fetch('http://localhost:3000/api/products')
    if(response.ok){
        return response.json()
    }
}

// Appeler la fonction addProduct

addProducts()
    .then(function(products){
        

        //Pour chaque élément de la réponse, créer un log dans la console et créer le produit dans le DOM (index.html)
        products.forEach(function(element) {
        console.log(element)
    
        //Crée une balise a pour chaque produit
        const newA = document.createElement('a')
        const elementItems = document.getElementById('items')
        newA.href = ('./product.html?id=') + element._id
        elementItems.appendChild(newA)

        //Crée une balise article pour chaque produit
        const newArticle = document.createElement('article')
        newA.appendChild(newArticle)

        //Crée une balise img pour chaque produit
        const newImg = document.createElement('img')
        newImg.src = element.imageUrl
        newImg.alt = element.alTxt
        newArticle.appendChild(newImg)

        //Crée une balise h3 pour chaque produit
        const newH3 = document.createElement('h3')
        newH3.className = ('productName')
        newH3.innerText = element.name
        newArticle.appendChild(newH3)

        //Crée une balise p pour chaque produit
        const newP = document.createElement('p')
        newP.classList = ('productsDescription')
        newP.innerText = element.description 
        newArticle.appendChild(newP)

        });

    })

