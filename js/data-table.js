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

            let user = document.createElement("th")
            user.innerText = "Uživatel"
            tr.appendChild(user)

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
    
                        let p_id = document.createElement("td")
                        let p_id_a = document.createElement("a")
                        p_id_a.href = `/administration/item.html?category=${properties["category"]}&id=${product.id}`
                        p_id_a.innerText = product.id
                        p_id.appendChild(p_id_a)
                        tr.appendChild(p_id)
    
                        let p_name = document.createElement("td")
                        let p_name_a = document.createElement("a")
                        p_name_a.href = `/administration/item.html?category=${properties["category"]}&id=${product.id}`
                        p_name_a.innerText = product.name
                        p_name.appendChild(p_name_a)
                        tr.appendChild(p_name)

                        let p_subcategory = document.createElement("td")
                        p_subcategory.innerText = subcategories.find(subcategory => subcategory.id === product.subcategoryId).name
                        tr.appendChild(p_subcategory)

                        let p_price = document.createElement("td")
                        p_price.innerText = `${product.price} Kč` 
                        tr.appendChild(p_price)

                        let p_discount = document.createElement("td")
                        p_discount.innerText = `${product.discount} %` 
                        tr.appendChild(p_discount)

                        let p_stock = document.createElement("td")
                        p_stock.innerText = `${product.stock} ks` 
                        tr.appendChild(p_stock)
                        
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

                    let c_id = document.createElement("td")
                    let c_id_a = document.createElement("a")
                    c_id_a.href = `/administration/item.html?category=${properties["category"]}&id=${category.id}`
                    c_id_a.innerText = category.id
                    c_id.appendChild(c_id_a)
                    tr.appendChild(c_id)

                    let c_name = document.createElement("td")
                    let c_name_a = document.createElement("a")
                    c_name_a.href = `/administration/item.html?category=${properties["category"]}&id=${category.id}`
                    c_name_a.innerText = category.name
                    c_name.appendChild(c_name_a)

                    tr.appendChild(c_name)
                    let c_subcategories = document.createElement("td")
                    
                    c_subcategories.innerText = category.subcategory_ids.length
                    tr.appendChild(c_subcategories)
                    
                    tbody.appendChild(tr)
                })
            })
            break;
        case "orders":
            break;
        case "users":
            break;
    }
}


generateThead()
generateTbody()