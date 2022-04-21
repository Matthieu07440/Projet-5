let params = new URL(document.location).searchParams;
let id = params.get("id");
let basket = JSON.parse(localStorage.getItem("product"));
(async function () {
	const product = await getProduct(id);
	displayProduct(product);
	addProduct();
})();
// Récupération de l'ID du produit avec l'API
function getProduct(id){
fetch(`http://localhost:3000/api/products/${id}`)
    .then(response => response.json())
    .catch ((error) => {
        let products = document.getElementById("item");
        products.innerHTML = ("oups, nous ne pouvons pas afficher les canapés.");
    })
}    
// Affichage des caractéristiques du produit sur le DOM
function displayProduct(product){
    product.then((data) => {
        document.title = data.name;
        let pictureProduct = document.querySelector(".item__img");
        let img = document.createElement("img");
        pictureProduct.appendChild(img);
        img.src = data.imageUrl;
        let imgAlt = document.createElement("alt");
        img.appendChild(imgAlt);
        imgAlt.innerHTML = data.altTxt;
        let titleProduct = document.getElementById("title");
        titleProduct.innerHTML = data.name;
        let priceProduct = document.getElementById("price");
        priceProduct.innerHTML = data.price;
        let descriptionProduct = document.getElementById("description");
        descriptionProduct.innerHTML = data.description;
        let colorProduct = document.getElementById("colors");
        for (let i = 0; i < data.colors.length; i ++){
            let optionColor = document.createElement("option");
            colorProduct.appendChild(optionColor);
            optionColor.innerHTML = data.colors[i];
        }
    });
}    
// Ecoute du bouton et condition d'ajout au localstorage
function addProduct(){
    let addBtn = document.querySelector("#addToCart");
    addBtn.addEventListener("click", (event)=>{
        let color = document.querySelector("#colors").value;
        let quantity = Number (document.querySelector("#quantity").value);
        let optionBasket ={
            id: data._id,
            nameOfProduct: document.title,
            color,
            quantity,
            imageProduct: data.imageUrl,
            altTxt: data.altTxt,
            description: data.description, 
        }
    })
}
    //Condition a remplir pour ajout localStorage
function addToBasket(){	
        if (quantity > 0 && quantity <= 100 && color !== "") {
		// Ajout produit si localStorage existant ou non
		if (basket !== null) {
			const productFound = basket.find(
				(element) => element.id === optionBasket.id && element.color === optionBasket.color,
			);
			// si l'element est trouvé dans le localStorage ou  non
			if (productFound != undefined) {
				productFound.quantity += quantity;
			} else {
				basket.push(optionBasket);
			}
		}
		localStorage.setItem("product", JSON.stringify(basket));
        popupValidate();
    
        // Ajout du produit au panier
        if (basket) {
            let foundProduct = basket.find((element) => element.id === optionBasket.id && element.color === optionBasket.color);
            if (foundProduct){
                foundProduct.quantity += quantity;
                localStorage.setItem("product", JSON.stringify(basket));
            } else{
                basket.push(optionBasket);
                localStorage.setItem("product", JSON.stringify(basket));
            }
            basket.push(optionBasket);

        }
        else {
            alert("Veuillez choisir une quantité entre 1 et 100 et une couleur.");
        }
    }
}
    // Popup choix après ajout au panier
function popupValidate(){
	if (
		window.confirm(
			`${quantity} ${document.title} de couleur ${color} ont été ajoutés à votre panier.\nCliquez sur OK pour continuer vos achats ou ANNULER pour aller au panier`,
		)
	) {
		window.location.href = "index.html";
	} else {
		window.location.href = "cart.html";
	}
}