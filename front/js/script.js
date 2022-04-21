// recupération des produits avec l'API
let url = 'http://localhost:3000/api/products';
fetch(url)
    .then(response => response.json())
    .catch ((error) => {
        let products = document.getElementById("items");
        products.innerHTML = ("oups, nous ne pouvons pas afficher les canapés.");
    })
// Affichage des produits sur le DOM
    .then(data => {
        console.log(data);
        for (let card of data){
            let products = document.getElementById("items");
            let link = document.createElement("a");
            products.appendChild(link);
            link.href  = "product.html?id=" + card._id;
            console.log(link)
            let article = document.createElement("article");
            link.appendChild(article);
            let image = document.createElement("img");
            article.appendChild(image);
            image.src = card.imageUrl;
            let name = document.createElement("name");
            article.appendChild(name);
            name.innerHTML = card.name;
            let description = document.createElement("p");
            article.appendChild(description);
            description.innerHTML = card.description;
            let price = document.createElement("p");
            article.appendChild(price);
            price.innerHTML = card.price + "€";
            console.log(card); 
        }
    }
    
);