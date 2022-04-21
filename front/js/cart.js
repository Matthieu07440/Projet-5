
const cart = JSON.parse(localStorage.getItem("product"));
//  Appel des fonctions
(async function () {
	const product = await getProducts();
	displayCart();
	price(product);
	totalPrice();
})();
// Récupération des produits avec l'API
function getProducts() {
	return fetch("http://localhost:3000/api/products/")
		.then((res) => res.json())
		.catch((error) =>
			alert(
				"Problème de chargement des produits.\nVeuillez nous excuser du désagrément.\nNous mettons tout en oeuvre pour régler le problème.\n" + error.message,
			)
		);
}
// Affichage panier
function displayCart() {
    // Si panier vide 
	if (cart == null) {
		document.querySelector("h1").innerText = "Votre panier est vide";
		document.querySelector(".cart__price").innerHTML = "";
	} else {
        // Si produits dans panier, affichage panier 
		const displayProduct = document.getElementById("cart__items");
		cart.forEach((element) => {
			displayProduct.innerHTML += `
            <article class="cart__item" data-id="${element.id}" data-color="${element.color}">
                <div class="cart__item__img">
                <img src="${element.imageProduct}" alt="${element.altTxt}">
                </div>
                <div class="cart__item__content">
                <div class="cart__item__content__description">
                    <h2>${element.nameOfProduct}</h2>
                    <p>${element.color}</p>
                    <p id="priceProduct"></p>
                </div>
                <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                    <p>Qté : </p>
                    <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${element.quantity}">
                    </div>
                    <div class="cart__item__content__settings__delete">
                    <p class="deleteItem">Supprimer</p>
                    </div>
                </div>
                </div>
            </article>`;
		});
        totalQuantity();
		removeItem();
		updateQuantity();
		validateForm();
    }
}
// affichage du prix par ligne de produits
function price(product) {
	const priceProduct = document.querySelectorAll("#priceProduct");
	const inputQuantity = document.querySelectorAll(".itemQuantity");
	priceProduct.forEach((item, i) => {
		const id = item.closest(".cart__item").dataset.id;
		const find = product.find(element => element._id == id);
		item.innerText = find.price * inputQuantity[i].value + " €";
	});
}
// Calcul et affichage de la quantité totale
    function totalQuantity() {
        const totalQuantity = document.getElementById("totalQuantity");
        const quantityProduct = document.querySelectorAll(".itemQuantity");   
        let totalNumber = 0;
        quantityProduct.forEach((quantity) => {
            totalNumber += parseInt(quantity.value);
        });
        totalQuantity.innerText = totalNumber;
        }
// Calcul et affichage du prix total
        function totalPrice() {
            const totalPrice = document.getElementById("totalPrice");
            const priceProduct = document.querySelectorAll("#priceProduct");
            let totalNumber = 0;
            priceProduct.forEach((element) => {
                const getTotalPrice = element.textContent;
                totalNumber += parseInt(getTotalPrice);
                totalPrice.innerText = totalNumber;
            });
        }
// Mise à jour quantité article et localStorage
        function updateQuantity() {
            const inputQuantity = document.querySelectorAll(".itemQuantity");
            cart.forEach((product, i) => {
                inputQuantity[i].addEventListener("change", () => {
                    if (inputQuantity[i].value > 0 && inputQuantity[i].value <= 100) {
                        const prodIndex = cart.findIndex(
                            (item) => item.id === product.id && item.color === product.color,
                        );
                        if (prodIndex !== -1) {
                            cart[prodIndex].quantity = Number(inputQuantity[i].value);
                        }
                    } else {
                        alert("Veuillez choisir une quantité entre 1 et 100");
                    }
                    localStorage.setItem("product", JSON.stringify(cart));
                    location.reload();
                });
        
            });
        }
// Suppression article dans panier et localStorage
        function removeItem() {
            const deleteBtn = document.querySelectorAll(".deleteItem");
            deleteBtn.forEach((element, i) => {
                deleteBtn[i].addEventListener("click", () => {
                    if (
                        window.confirm("Voulez-vous vraiment supprimer le produit sélectionné?")
                    ) {
                        const idRemove = cart[i].id;
                        const colorDelete = cart[i].color;
                        const RemoveStorage = cart.filter(
                            (product) => product.id !== idRemove || product.color !== colorDelete,
                        );
                        localStorage.setItem("product", JSON.stringify(RemoveStorage));
                        location.reload();
                    }
                });
            });
            if (deleteBtn.length == 0) {
                localStorage.removeItem("product");
                location.reload();
            }
        }
// création du formulaire et envoi dans le localStorage des valeurs remplies du formulaire
        function validateForm() {
            // récupérer valeurs depuis le DOM
            const firstName = document.getElementById("firstName");
            const lastName = document.getElementById("lastName");
            const address = document.getElementById("address");
            const city = document.getElementById("city");
            const email = document.getElementById("email");
            // récupérer message d'erreur depuis le DOM
            const firstNameErrorMsg = document.getElementById("firstNameErrorMsg");
            const lastNameErrorMsg = document.getElementById("lastNameErrorMsg");
            const addressErrorMsg = document.getElementById("addressErrorMsg");
            const cityErrorMsg = document.getElementById("cityErrorMsg");
            const emailErrorMsg = document.getElementById("emailErrorMsg");
            // création regex
            const regexFirstLastName = /^[A-Za-z\é\è\ê\-]{3,20}$/;
            const regexaddress = /^[A-Za-z0-9\é\è\ê\-\s\.\,]{5,100}$/;
            const regexCity = /^[A-Za-z\é\è\ê\ \,\-]{2,20}$/;
            const regexEmail = /^[A-Za-z0-9\-\.\_]+@([A-Za-z]+\.)+[A-Za-z]{2,4}$/;
            // condition validation regex input et affichage erreur
            firstName.addEventListener("input", () => {
                if (regexFirstLastName.test(firstName.value)) {
                    firstNameErrorMsg.innerText = "";
                } else {
                    firstNameErrorMsg.innerText =
                        "Le prénom doit contenir entre 3 et 20 lettres et un tiret au besoin";
                }
            });
            lastName.addEventListener("input", () => {
                if (regexFirstLastName.test(lastName.value)) {
                    lastNameErrorMsg.innerText = "";
                } else {
                    lastNameErrorMsg.innerText =
                        "Le nom doit contenir entre 3 et 20 lettres et un tiret au besoin";
                }
            });
            address.addEventListener("input", () => {
                if (regexaddress.test(address.value)) {
                    addressErrorMsg.innerText = "";
                } else {
                    addressErrorMsg.innerText =
                        "L'adresse doit contenir entre 5 et 100 caractères et ne doit pas avoir de caractères spéciaux";
                }
            });
            city.addEventListener("input", () => {
                if (regexCity.test(city.value)) {
                    cityErrorMsg.innerText = "";
                } else {
                    cityErrorMsg.innerText =
                        "La ville doit contenir entre 2 et 20 lettres uniquement";
                }
            });
            email.addEventListener("input", () => {
                if (regexEmail.test(email.value)) {
                    emailErrorMsg.innerText = "";
                } else {
                    emailErrorMsg.innerText =
                        "Veuillez respecter la convention (Exemple : kanap.kanap@kanap.com)";
                }
            });
            // Envoi commande
            const btnCommand = document.getElementById("order");
            btnCommand.addEventListener("click", (e) => {
                e.preventDefault();
                if (
                    regexFirstLastName.test(firstName.value) &&
                    regexFirstLastName.test(lastName.value) &&
                    regexaddress.test(address.value) &&
                    regexCity.test(city.value) &&
                    regexEmail.test(email.value)
                ) {
                    let productOrder = [];
                    cart.forEach(order => {
                        productOrder.push(order.id);
        
                    });
                    const order = {
                        contact: {
                            firstName: firstName.value,
                            lastName: lastName.value,
                            address: address.value,
                            city: city.value,
                            email: email.value,
                        },
                        products: productOrder,
                    };
                    addServer(order);
                } else {
                    e.preventDefault();
                    alert("Veuillez vérifier le formulaire.");
                }
            });
        }
            // Envoi au back-end
            function addServer(order) {
                fetch("http://localhost:3000/api/products/order", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(order),
                })
                    .then((response) => response.json())
                    .then((response) => {
                        localStorage.clear();
                        window.location.href = "./confirmation.html?orderId=" + response.orderId;
                    })
                    .catch((error) => {
                        alert(
                            "Problème de chargement des produits.\nVeuillez nous excuser du désagrément.\nNous mettons tout en oeuvre pour régler le problème.\n" +
                            error.message,
                        );
                    });
            }