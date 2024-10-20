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
const ui_map_item = {
    "products": "Produkt",
    "categories": "Kategorie",
    "orders": "Objednávka",
    "users": "Uživatel",
}

let page_nav = document.querySelector(".page-nav p")

let a = document.createElement("a")
a.href = `/administration/data-table.html?category=${properties["category"]}`
a.innerText = ui_map[properties["category"]]

page_nav.appendChild(a)
page_nav.innerHTML = page_nav.innerHTML + "&nbsp;>&nbsp;"

a = document.createElement("a")
a.href = `/administration/item.html?category=${properties["category"]}&id=${properties["id"]}`
a.innerText = properties["id"] !== "new" ? properties["id"] : "nový"
page_nav.appendChild(a)

let h1 = document.querySelector("h1")
h1.innerText = `${ui_map_item[properties["category"]]}: ${properties["id"] !== "new" ? properties["id"] : "nový"}`
