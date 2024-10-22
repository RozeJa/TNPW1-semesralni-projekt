// získá z url GET atributy

let properties = []
window.location.href.split("?")[1].split("&").forEach(p => {
    let propery = p.split("=")
    properties[propery[0]] = propery[1]
})

//

let page_nav = document.querySelector(".page-nav p")

let a = document.createElement("a")
a.href = `/offer/category.html?category=${properties["category"]}&subcategory=`
a.innerText = properties["category"]

page_nav.appendChild(a)


if (properties["subcategory"] !== "") {
    page_nav.innerHTML = page_nav.innerHTML + "&nbsp;>&nbsp;"
    
    a = document.createElement("a")
    a.href = `/offer/category.html?category=${properties["category"]}&subcategory=${properties["subcategory"]}`
    a.innerText = properties["subcategory"]
    page_nav.appendChild(a)

} else if (properties["category"] !== "") {
    
    let subcategories = document.querySelector(".category-subcategory-selection") 
    let h2 = document.createElement("h2")
    let container = document.createElement("div")
    h2.innerText = "Podkategorie"
    container.classList.add("category-subcategories")
    subcategories.appendChild(h2)
    
    fetch("/data/categories.json")
    .then(data => data.json())
    .then(categories => {
        fetch("/data/subcategories.json")
        .then(data => data.json())
        .then(subcategories => {
            let curentCategory = categories.find(c => c.url === properties["category"])
            let selectedSubcategories = subcategories.filter(subcategory => curentCategory.subcategory_ids.includes(subcategory.id))
            
            selectedSubcategories.forEach(subcategory => {
                let subcategoryContainer = document.createElement("div")
                subcategoryContainer.classList.add("category-subcategory")

                let p = document.createElement("p")
                let a = document.createElement("a")
                let a_img = document.createElement("a")
                let img = document.createElement("img")

                a.href = `/offer/category.html?category=${properties["category"]}&subcategory=${subcategory.url}`
                a.innerText = subcategory.name

                a_img.href = `/offer/category.html?category=${properties["category"]}&subcategory=${subcategory.url}`
                img.src = subcategory.imagePath
                img.alt = subcategory.url

                p.appendChild(a)
                a_img.appendChild(img)

                subcategoryContainer.appendChild(p)
                subcategoryContainer.appendChild(a_img)

                container.appendChild(subcategoryContainer)
            })
        })
    })
    
    subcategories.appendChild(container)
} else {
    let subcategories = document.querySelector(".category-subcategory-selection") 
    let h2 = document.createElement("h2")
    let container = document.createElement("div")
    h2.innerText = "Kategorie"
    container.classList.add("category-subcategories")
    subcategories.appendChild(h2)
    
    fetch("/data/categories.json")
    .then(data => data.json())
    .then(categories => {
                
        categories.forEach(category => {
            let categoryContainer = document.createElement("div")
            categoryContainer.classList.add("category-subcategory")

            let p = document.createElement("p")
            let a = document.createElement("a")

            a.href = `/offer/category.html?category=${category.url}&subcategory=`
            a.innerText = category.name

            p.appendChild(a)

            categoryContainer.appendChild(p)

            container.appendChild(categoryContainer)
        })
    })
    
    subcategories.appendChild(container)
}


// aktualizace košíku
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

    document.querySelector("#shopping-cart-order-ref").innerText = `Dokončit ${priceForAll} Kč`
}

function createItem(item) {
    let container = document.createElement("div")
    container.classList.add("shopping-cart-item")

    let name = document.createElement("p")
    name.innerText = item.product.name
    container.appendChild(name)

    let count = document.createElement("div")
    
    let desc = document.createElement("button")
    let countInput = document.createElement("input")
    let inc = document.createElement("button")

    desc.innerText = "-"
    countInput.type = "number"
    countInput.value = item.count
    countInput.min = 1
    inc.innerText = "+"

    desc.addEventListener("click", () => {
        let shoppingCartJson = localStorage.getItem("shoppingCart")
        let shoppingCart = JSON.parse(shoppingCartJson)
    
        shoppingCart[item.product.id].count -= 1

        if (shoppingCart[item.product.id].count <= 0) {
            delete shoppingCart[item.product.id]
        }

        localStorage.setItem("shoppingCart", JSON.stringify(shoppingCart))
        renderShoppingCart()
    })
    countInput.addEventListener("change", (event) => {
        let shoppingCartJson = localStorage.getItem("shoppingCart")
        let shoppingCart = JSON.parse(shoppingCartJson)
    
        shoppingCart[item.product.id].count = parseInt(event.target.value)

        if (shoppingCart[item.product.id].count <= 0) {
            shoppingCart[item.product.id] = 1
        }

        localStorage.setItem("shoppingCart", JSON.stringify(shoppingCart))
        renderShoppingCart()
    })
    inc.addEventListener("click", () => {
        let shoppingCartJson = localStorage.getItem("shoppingCart")
        let shoppingCart = JSON.parse(shoppingCartJson)
    
        shoppingCart[item.product.id].count += 1

        localStorage.setItem("shoppingCart", JSON.stringify(shoppingCart))
        renderShoppingCart()
    })

    count.appendChild(desc)
    count.appendChild(countInput)
    count.appendChild(inc)

    container.appendChild(count)

    let price = document.createElement("p")
    price.innerText = `${((item.product.price * (100 - item.product.discount)) / 100) * item.count} Kč`
    container.appendChild(price)

    return container
}

renderShoppingCart()


// generovani produktu

function generateProducts() {
    let productsContiner = document.querySelector(".category-products-container")

    
    if (properties["category"] === "") {
        fetch("/data/products.json")
        .then(data => data.json())
        .then(products => {
            products.forEach(product => {
                productsContiner.appendChild(creareProduct(product))
            })
        })
    } else if (properties["subcategory"] === "") {
        fetch("/data/categories.json")
        .then(data => data.json())
        .then(categories => {
            fetch("/data/products.json")
            .then(data => data.json())
            .then(products => {

                let category = categories.find(category => category.url === properties["category"])
                let filteredProducts = products.filter(p => category.subcategory_ids.includes(p.subcategoryId))
    
                filteredProducts.forEach(product => {
                    productsContiner.appendChild(creareProduct(product))
                })
            })
        })
    } else {
        fetch("/data/subcategories.json")
        .then(data => data.json())
        .then(subcategories => {
            fetch("/data/products.json")
            .then(data => data.json())
            .then(products => {

                let subcategory = subcategories.find(subcategory => subcategory.url === properties["subcategory"])
                let filteredProducts = products.filter(p => p.subcategoryId === subcategory.id)

                filteredProducts.forEach(product => {
                    productsContiner.appendChild(creareProduct(product))
                })
            })
        })
    }

}

function creareProduct(product) {
    let container = document.createElement("div")
    container.classList.add("category-product")

    let img = document.createElement("img")
    img.src = product.imagePath
    img.alt = product.name
    container.appendChild(img)

    let h3 = document.createElement("h3")
    h3.innerText = product.name
    container.appendChild(h3)

    let saleDiv = document.createElement("div")
    saleDiv.classList.add("category-product-price")

    let salePercent = document.createElement("p")
    let salePrice = document.createElement("p")

    salePercent.innerText = product.discount > 0 ? `Sleva ${product.discount} %` : ''
    salePrice.innerText = `${(product.price * (100 - product.discount)) / 100} Kč`
    
    saleDiv.appendChild(salePercent)
    saleDiv.appendChild(salePrice)

    container.appendChild(saleDiv)

    let button = document.createElement("button")
    button.innerText = "Do košíku"
    button.addEventListener("click", () => {
        let shoppingCartJson = localStorage.getItem("shoppingCart")
        let shoppingCart = {}

        if (shoppingCartJson !== null) {
            shoppingCart = JSON.parse(shoppingCartJson)
        } 

        if (shoppingCart[product.id] !== undefined) {
            shoppingCart[product.id].count += 1
        } else {
            shoppingCart[product.id] = {
                product: product,
                count: 1
            }
        }

        localStorage.setItem("shoppingCart", JSON.stringify(shoppingCart))
        renderShoppingCart()
    })

    container.appendChild(button)

    return container
}
generateProducts()


// zobrazování košíku a filtru 
let sitePanelsButtons = Array.from(document.querySelectorAll(".rolling-window-icon"))
let sitePanelsHideButtons = Array.from(document.querySelectorAll(".category-site-bar-hide-btn"))

sitePanelsButtons[0].addEventListener("click", () => {
    document.querySelector(".filter-container").classList.remove("category-site-bar-hide")
})
sitePanelsHideButtons[0].addEventListener("click", () => {
    document.querySelector(".filter-container").classList.add("category-site-bar-hide")
})
sitePanelsButtons[1].addEventListener("click", () => {
    document.querySelector(".shopping-cart-container").classList.remove("category-site-bar-hide")
    renderShoppingCart()
})
sitePanelsHideButtons[1].addEventListener("click", () => {
    document.querySelector(".shopping-cart-container").classList.add("category-site-bar-hide")
})

