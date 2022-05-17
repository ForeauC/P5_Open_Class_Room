//Récupérer la valeur id à partir de l'URL
let params = new URL(document.location).searchParams;
let id = params.get("id");// id du produit
console.log(id);



