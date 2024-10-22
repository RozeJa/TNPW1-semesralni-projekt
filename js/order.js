// získá z url GET atributy

let properties = []
window.location.href.split("?")[1].split("&").forEach(p => {
    let propery = p.split("=")
    properties[propery[0]] = propery[1]
})


let page_nav = document.querySelector(".page-nav p")

let a = document.createElement("a")
a.href = `/offer/order.html?id=${properties["id"]}`
a.innerText = "objednavka"

page_nav.appendChild(a)


let ordersJson = localStorage.getItem("orders")
let orders = JSON.parse(ordersJson)
let order = Object.values(orders).find(order => order.id == properties["id"])
if (ordersJson !== null && order !== undefined) {
    document.querySelector("h2").innerText = `Objednávka ${order.id}`

    document.querySelector(".shopping-cart").querySelector("button").addEventListener("click", () => {
        delete orders[properties["id"]]

        localStorage.setItem("orders", JSON.stringify(orders))

        window.location.href = "/index.html"
    })

    document.querySelector(".shopping-cart").querySelector("h3").innerText = `Objednáno: ${order.ordered.split("T")[0]}`


    let orderContent = document.querySelector(".shopping-cart-content")

    Object.values(order.items).forEach(item => {
        orderContent.appendChild(createItem(item))
    })

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
}