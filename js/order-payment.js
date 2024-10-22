// získá z url GET atributy

let properties = []
window.location.href.split("?")[1].split("&").forEach(p => {
    let propery = p.split("=")
    properties[propery[0]] = propery[1]
})

let ordersJson = localStorage.getItem("orders")

if (ordersJson !== null) {
    let orders = JSON.parse(ordersJson)
    let order = orders[properties["id"]]
 
    Array.from(document.querySelectorAll(".order-payment-price")).forEach(p => {
        p.innerText = `${order.totalPrice} Kč`
    })

    document.querySelector("#order-payment-variable-simbol").innerText = order.id

    document.querySelector("#order-payment-container").querySelector("a").href = `/offer/order.html?id=${order.id}`
}