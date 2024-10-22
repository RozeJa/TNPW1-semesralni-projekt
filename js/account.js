let ordersJson = localStorage.getItem("orders")
if (ordersJson !== null) {
    let orders = JSON.parse(ordersJson)
    let orderContent = document.querySelector(".shopping-cart-content")

    Object.values(orders).forEach(order => {
        orderContent.appendChild(createOrder(order))
    })

    function createOrder(order) {
        let container = document.createElement("div")
        container.classList.add("shopping-cart-item")

        let date = document.createElement("p")
        date.innerText = order.ordered.split("T")[0]
        container.appendChild(date)

        let id = document.createElement("p")
        let id_a = document.createElement("a")
        id_a.href = `/offer/order.html?id=${order.id}`
        id_a.innerText = `Objednávka: ${order.id}`
        id.appendChild(id_a)
        container.appendChild(id)

        let price = document.createElement("p")
        price.innerText = `${order.totalPrice} Kč`
        container.appendChild(price)

        let state = document.createElement("p")
        state.innerText = "Čeká na zaplacení"
        container.appendChild(state)

        return container
    }
}