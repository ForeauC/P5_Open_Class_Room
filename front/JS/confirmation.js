// récupération du numéro de commande dans l'url de la page
let params = new URL(document.location).searchParams;
let id = params.get("id");

// affichage du numéro de commande
const orderId = document.getElementById('orderId');
orderId.textContent = id;