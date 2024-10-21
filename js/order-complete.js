function renderShoppingCart() {
    let shoppingCartContent = document.querySelector(".shopping-cart-content")
    shoppingCartContent.innerHTML = ""
    
    let shoppingCartJson = localStorage.getItem("shoppingCart")
    let shoppingCart = {}

    if (shoppingCartJson !== null) {
        shoppingCart = JSON.parse(shoppingCartJson)
    } 

    let priceForAll = 0
    for (const productID in shoppingCart) {
        let item = shoppingCart[productID]
        shoppingCartContent.appendChild(createItem(item))
        priceForAll += ((item.product.price * (100 - item.product.discount)) / 100) * item.count
    }

    document.querySelector("#shopping-continue-price").innerText = `Cena nákupu: ${priceForAll} Kč`
}

function createItem(item) {
    let container = document.createElement("div")
    container.classList.add("shopping-cart-item")

    
    let img = document.createElement("img")
    img.src = item.product.imagePath
    img.alt = item.product.name
    container.appendChild(img)

    let name = document.createElement("p")
    name.innerText = item.product.name
    container.appendChild(name)

    let count = document.createElement("div")
    
    let countInput = document.createElement("input")

    countInput.type = "number"
    countInput.value = item.count
    countInput.readOnly = true

    countInput.addEventListener("change", (event) => {
        let shoppingCartJson = localStorage.getItem("shoppingCart")
        let shoppingCart = JSON.parse(shoppingCartJson)
    
        shoppingCart[item.product.id].count = parseInt(event.target.value)

        localStorage.setItem("shoppingCart", JSON.stringify(shoppingCart))
        renderShoppingCart()
    })

    count.appendChild(countInput)
    container.appendChild(count)

    let price = document.createElement("p")
    price.innerText = `${((item.product.price * (100 - item.product.discount)) / 100) * item.count} Kč`
    container.appendChild(price)

    return container
}

renderShoppingCart()