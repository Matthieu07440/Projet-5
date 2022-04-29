let params = new URL(document.location).searchParams;
let id = params.get("id");
(async function () {
	const product = await getProduct(id);
	displayProduct(product);
    addProductEvent(product);
})();
// Récupération de l'ID du produit avec l'API
function getProduct(id){
    return fetch("http://localhost:3000/api/products/"+id)
    .then(response => response.json())
    .then((responseData) => {
      console.log(responseData);
      return responseData;
    })
    .catch ((error) => {
        let products = document.getElementById("item");
        products.innerHTML = ("oups, nous ne pouvons pas afficher les canapés.");
    })
}    
// Affichage des caractéristiques du produit sur le DOM
function displayProduct(product){
        document.title = product.name;
        let pictureProduct = document.querySelector(".item__img");
        let img = document.createElement("img");
        pictureProduct.appendChild(img);
        img.src = product.imageUrl;
        let imgAlt = document.createElement("alt");
        img.appendChild(imgAlt);
        imgAlt.innerHTML = product.altTxt;
        let titleProduct = document.getElementById("title");
        titleProduct.innerHTML = product.name;
        let priceProduct = document.getElementById("price");
        priceProduct.innerHTML = product.price;
        let descriptionProduct = document.getElementById("description");
        descriptionProduct.innerHTML = product.description;
        let colorProduct = document.getElementById("colors");
        for (let i = 0; i < product.colors.length; i ++){
            let optionColor = document.createElement("option");
            colorProduct.appendChild(optionColor);
            optionColor.innerHTML = product.colors[i];
        }
}
// Ecoute du bouton pour ajout du produit au panier
function addProductEvent(product) {
    let addBtn = document.querySelector("#addToCart");
    addBtn.addEventListener("click", () => {
		addProduct(product);
	});
}
// Condition d'ajout au localstorage et ajout du produit au panier
function addProduct(product) {
	let color = document.getElementById("colors").value;
	let quantity = Number(document.getElementById("quantity").value);
	let basket = JSON.parse(localStorage.getItem("basket"));
    if (basket == null) {
		basket = [];
	}
	//Création de l'objet avant envoi au localStorage
	let optionBasket = {
		id: product._id,
		name: product.name,
		altTxt: product.altTxt,
		imgSrc: product.imageUrl,
		color,
		quantity,
	};

	//Condition a remplir pour ajout localStorage
	if (quantity > 0 && quantity <= 100 && color !== "") {
		// Ajout produit si localStorage existant ou non
		if (basket !== null) {
            console.log(basket);
			let productFound = basket.find(
				(element) => element.id === optionBasket.id && element.color === optionBasket.color
			);
			let productFoundIndex = basket.findIndex(
				(element) => element.id === optionBasket.id && element.color === optionBasket.color
			  );
			// si l'element est trouvé dans le localStorage ou  non
			if (productFound) {
				productFound.quantity += quantity;
				console.log(productFound.quantity);				
				basket[productFoundIndex].quantity = productFound.quantity;
				//localStorage.setItem("basket", JSON.stringify(basket));
			} else {
				basket.push(optionBasket);
			}
		}
		localStorage.setItem("basket", JSON.stringify(basket));
		popupValidate(product.name, quantity, color);
	} else {
		alert("Veuillez choisir une quantité entre 1 et 100 et une couleur.");
	}
}

    // Popup choix après ajout au panier
function popupValidate(name, quantity, color){
	if (
		window.confirm(
			`${quantity} ${name} de couleur ${color} ont été ajoutés à votre panier.\nCliquez sur OK pour continuer vos achats ou ANNULER pour aller au panier`,
		)
	) {
		window.location.href = "index.html";
	} else {
		window.location.href = "cart.html";
	}
}