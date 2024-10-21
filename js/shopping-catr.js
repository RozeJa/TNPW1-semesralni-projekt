let productsScrollBar = document.querySelector(".products-scroll-bar-content")

function setProductsForProductsBar(productBar, products) {
    let productsPlace = productBar.querySelector(".products-scroll-bar-products")
    let btns = Array.from(productBar.querySelectorAll("button"))

    products.forEach(p => {
        productsPlace.appendChild(creareProduct(p))
    })    

    btns[1].addEventListener("click", () => {
        let firstShowedProduct = productsPlace.querySelector(".products-scroll-bar-product")
      
        firstShowedProduct.classList.add("products-scroll-bar-product-hidden")
        firstShowedProduct.classList.remove("products-scroll-bar-product")
    })

    btns[0].addEventListener("click", () => {
        let hiddenProducts = Array.from(productsPlace.querySelectorAll(".products-scroll-bar-product-hidden"))
        
        if (hiddenProducts.length > 0) {            
            hiddenProducts[hiddenProducts.length - 1].classList.remove("products-scroll-bar-product-hidden")
            hiddenProducts[hiddenProducts.length - 1].classList.add("products-scroll-bar-product")

        }
    })
}

function creareProduct(product) {
    let container = document.createElement("div")
    container.classList.add("products-scroll-bar-product")

    let img = document.createElement("img")
    img.src = product.imagePath
    img.alt = product.name
    container.appendChild(img)

    let h3 = document.createElement("h3")
    h3.innerText = product.name
    container.appendChild(h3)

    let saleDiv = document.createElement("div")
    saleDiv.classList.add("products-scroll-bar-product-price")

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

fetch("/data/products.json")
.then(data => data.json())
.then(products => products.filter(() => Math.random() < .25))
.then(products => {
    setProductsForProductsBar(productsScrollBar, products)
})


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

    document.querySelector("#shopping-continue-price").innerText = `Cena nákupu: ${priceForAll} Kč`
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
    
    let desc = document.createElement("button")
    let countInput = document.createElement("input")
    let inc = document.createElement("button")

    desc.innerText = "-"
    countInput.type = "number"
    countInput.value = item.count
    inc.innerText = "+"

    desc.addEventListener("click", () => {
        let shoppingCartJson = localStorage.getItem("shoppingCart")
        let shoppingCart = JSON.parse(shoppingCartJson)
    
        shoppingCart[item.product.id].count -= 1

        localStorage.setItem("shoppingCart", JSON.stringify(shoppingCart))
        renderShoppingCart()
    })
    countInput.addEventListener("change", (event) => {
        let shoppingCartJson = localStorage.getItem("shoppingCart")
        let shoppingCart = JSON.parse(shoppingCartJson)
    
        shoppingCart[item.product.id].count = parseInt(event.target.value)

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

    let button = document.createElement("button")
    button.innerText = "x"
    button.addEventListener("click", () => {
        let shoppingCartJson = localStorage.getItem("shoppingCart")
        let shoppingCart = JSON.parse(shoppingCartJson)
    
        delete shoppingCart[item.product.id]

        localStorage.setItem("shoppingCart", JSON.stringify(shoppingCart))
        renderShoppingCart()
    })

    container.appendChild(button)

    return container
}

renderShoppingCart()