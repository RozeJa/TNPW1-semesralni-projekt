function renderShoppingCart() {
    let shoppingCartContent = document.querySelector(".shopping-cart-content")
    
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

    document.querySelector("#order-complete-price").innerText = `Cena nákupu: ${priceForAll} Kč`

    document.querySelector(".shopping-continue").querySelector("button").addEventListener("click", () => {
        let order = {
            id: Math.round(Math.random() * 10000),
            totalPrice: priceForAll,
            items: shoppingCart,
            ordered: new Date()
        }

        let ordersJson = localStorage.getItem("orders")
        let orders = {}
        if (ordersJson !== null) {
            orders = JSON.parse(ordersJson)
        }

        console.log(ordersJson, orders);
        

        orders[order.id] = order

        localStorage.setItem("orders", JSON.stringify(orders))
        localStorage.setItem("shoppingCart", JSON.stringify({}))

        window.location.href = `/offer/order-payment.html?id=${order.id}`
    })
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


    count.appendChild(countInput)
    container.appendChild(count)

    let price = document.createElement("p")
    price.innerText = `${((item.product.price * (100 - item.product.discount)) / 100) * item.count} Kč`
    container.appendChild(price)

    return container
}

renderShoppingCart()