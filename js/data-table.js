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