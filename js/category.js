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

console.log(properties["subcategory"]);


if (properties["subcategory"] !== "") {
    page_nav.innerHTML = page_nav.innerHTML + "&nbsp;>&nbsp;"
    
    a = document.createElement("a")
    a.href = `/offer/category.html?category=${properties["category"]}&subcategory=${properties["subcategory"]}`
    a.innerText = properties["subcategory"]
    page_nav.appendChild(a)

} else {
    
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
}

