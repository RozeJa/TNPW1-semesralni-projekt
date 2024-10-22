// získá z url GET atributy

let properties = []
window.location.href.split("?")[1].split("&").forEach(p => {
    let propery = p.split("=")
    properties[propery[0]] = propery[1]
})

//

const ui_map = {
    "products": "produkty",
    "categories": "kategorie",
    "orders": "objednavky",
    "users": "uzivatele",
}

let page_nav = document.querySelector(".page-nav p")

let a = document.createElement("a")
a.href = `/administration/data-table.html?category=${properties["category"]}`
a.innerText = ui_map[properties["category"]]

page_nav.appendChild(a)

//

document.querySelector("h1").innerText = ui_map[properties["category"]].charAt(0).toUpperCase() + ui_map[properties["category"]].slice(1)


let newRef = document.querySelector(".spreadsheet-header").querySelector("a")

newRef.href = `/administration/item.html?category=${properties["category"]}&id=new`

function generateThead() {
    let tr = document.querySelector("thead").querySelector("tr")

    let id = document.createElement("th")
    id.innerText = "ID"

    let name = document.createElement("th")
    name.innerText = "Název"

    let subcategory = document.createElement("th")
    subcategory.innerText = "Subkategorie"

    let price = document.createElement("th")
    price.innerText = "Cena"

    tr.appendChild(id)

    switch (properties["category"]) {
        case "products":
            tr.appendChild(name)
            tr.appendChild(subcategory)
            tr.appendChild(price)
            
            let discount = document.createElement("th")
            discount.innerText = "Sleva"
            tr.appendChild(discount)

            let stock = document.createElement("th")
            stock.innerText = "Naskladě"
            tr.appendChild(stock)

            break;
        case "categories":
            tr.appendChild(name)
            tr.appendChild(subcategory)
            break;
        case "orders":
            let items = document.createElement("th")
            items.innerText = "Počet položek"
            tr.appendChild(items)

            let ordered = document.createElement("th")
            ordered.innerText = "Objednano"
            tr.appendChild(ordered)

            tr.appendChild(price)
            break;
        case "users":
            let email = document.createElement("th")
            email.innerText = "Přihlašovací email"
            tr.appendChild(email)
            break;
    }
}

function generateTbody() {

    let tbody = document.querySelector("tbody")

    switch (properties["category"]) {
        case "products":
            fetch("/data/subcategories.json")
            .then(data => data.json())
            .then(subcategories => {
                fetch("/data/products.json")
                .then(data => data.json())
                .then(products => {
                    products.forEach(product => {
                        let tr = document.createElement("tr")
    
                        let id = document.createElement("td")
                        let id_a = document.createElement("a")
                        id_a.href = `/administration/item.html?category=${properties["category"]}&id=${product.id}`
                        id_a.innerText = product.id
                        id.appendChild(id_a)
                        tr.appendChild(id)
    
                        let name = document.createElement("td")
                        let name_a = document.createElement("a")
                        name_a.href = `/administration/item.html?category=${properties["category"]}&id=${product.id}`
                        name_a.innerText = product.name
                        name.appendChild(name_a)
                        tr.appendChild(name)

                        let subcategory = document.createElement("td")
                        subcategory.innerText = subcategories.find(subcategory => subcategory.id === product.subcategoryId).name
                        tr.appendChild(subcategory)

                        let price = document.createElement("td")
                        price.innerText = `${product.price} Kč` 
                        tr.appendChild(price)

                        let discount = document.createElement("td")
                        discount.innerText = `${product.discount} %` 
                        tr.appendChild(discount)

                        let stock = document.createElement("td")
                        stock.innerText = `${product.stock} ks` 
                        tr.appendChild(stock)
                        
                        tbody.appendChild(tr)
                    })
                })
            })
            
            break;
        case "categories":
            fetch("/data/categories.json")
            .then(data => data.json())
            .then(categories => {
                categories.forEach(category => {
                    let tr = document.createElement("tr")

                    let id = document.createElement("td")
                    let id_a = document.createElement("a")
                    id_a.href = `/administration/item.html?category=${properties["category"]}&id=${category.id}`
                    id_a.innerText = category.id
                    id.appendChild(id_a)
                    tr.appendChild(id)

                    let name = document.createElement("td")
                    let name_a = document.createElement("a")
                    name_a.href = `/administration/item.html?category=${properties["category"]}&id=${category.id}`
                    name_a.innerText = category.name
                    name.appendChild(name_a)

                    tr.appendChild(name)
                    let subcategories = document.createElement("td")
                    
                    subcategories.innerText = category.subcategory_ids.length
                    tr.appendChild(subcategories)
                    
                    tbody.appendChild(tr)
                })
            })
            break;
        case "orders":
            let ordersJson = localStorage.getItem("orders")
            let orders = {}
            if (ordersJson !== null) {
                orders = JSON.parse(ordersJson)
            }

            Object.values(orders).forEach(order => {
                let tr = document.createElement("tr")
                
                let id = document.createElement("td")
                let id_a = document.createElement("a")
                id_a.href = `/offer/order.html?id=${order.id}`
                id_a.innerText = order.id
                id.appendChild(id_a)
                tr.appendChild(id)

                let count = document.createElement("td")
                count.innerText = Object.values(order.items).length
                tr.appendChild(count)

                let ordered = document.createElement("td")
                ordered.innerText = order.ordered.split("T")[0]
                tr.appendChild(ordered)

                let price = document.createElement("td")
                price.innerText = `${order.totalPrice} Kč`
                tr.appendChild(price)

                tbody.appendChild(tr)
            })


            break;
        case "users":
            break;
    }
}


generateThead()
generateTbody()