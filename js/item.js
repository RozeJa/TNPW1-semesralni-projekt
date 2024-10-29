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


function createFormElement(left, right) {
    let container = document.createElement("div")
    container.classList.add("form-element")

    container.appendChild(left)
    container.appendChild(right)

    return container
}

function createLabel(label, forInput) {
    let container = document.createElement("label")
    container.innerText = label
    container.htmlFor = forInput
    return container    
}

function createInput(name, type) {
    let container = document.createElement("input")
    container.name = name
    container.type = type
    container.id = name

    return container
}
function createTextArea(name) {
    let container = document.createElement("textarea")
    container.name = name
    return container
}


let form = document.querySelector(".form")

switch (properties["category"]) {
    case "products":
        form.appendChild(createFormElement(createLabel("Název", "name"), createInput("name", "text")))
        form.appendChild(createFormElement(createLabel("Cena", "price"), createInput("price", "number")))
        form.appendChild(createFormElement(createLabel("Sleva", "discount"), createInput("discount", "number")))
        form.appendChild(createFormElement(createLabel("Na spladě", "stock"), createInput("stock", "number")))
        form.appendChild(createFormElement(createLabel("Obrázek", "imagePath"), createInput("imagePath", "file")))
        form.appendChild(createFormElement(createLabel("Popis", "description"), createTextArea("description")))

        break;
    case "categories":
        form.appendChild(createFormElement(createLabel("Název", "name"), createInput("name", "text")))
        break;
    case "orders":
        break;
    case "users":
        break;
}

let return_a = document.createElement("a")
return_a.href = "/administration/crossroad.html"
return_a.innerText = "Zahodit změny"
let submit = document.createElement("input")
submit.type = "submit"
submit.value = "ulozit"

form.appendChild(createFormElement(return_a, submit))