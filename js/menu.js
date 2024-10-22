fetch("/data/categories.json")
.then(data => data.json())
.then(categories => {
    fetch("/data/subcategories.json")
    .then(data => data.json())
    .then(subcategories => generateCategories(subcategories, categories))    
})


function generateCategories(subcategories, categories) {
    const categoriesList = document.querySelector(".nav-bar-categories-categories")
    const subcategoriesPart = document.querySelector(".nav-bar-categories-subcategories")
    const subctegoriesBlocks = []    

    categories.forEach(category => {
        let li = document.createElement("li")
        let a = document.createElement("a")
        a.href = `/offer/category.html?category=${category.url}&subcategory=`
        a.innerHTML = category.name + "&nbsp;>"
        li.appendChild(a)

        
        let subcategoriesForCategory = subcategories.filter(subcategory => category.subcategory_ids.includes(subcategory.id))

        subctegoriesBlocks[category.url] = []
        subcategoriesForCategory.forEach(subcategory => {
            let container = document.createElement("div")
            container.classList.add("nav-bar-categories-subcategory")
            container.classList.add("nav-bar-categories-subcategory-hidden")

            let img_a = document.createElement("a")
            let a = document.createElement("a")
            let img = document.createElement("img")
            let p = document.createElement("p")

            img_a.href = `/offer/category.html?category=${category.url}&subcategory=${subcategory.url}`
            a.href = `/offer/category.html?category=${category.url}&subcategory=${subcategory.url}`

            img.src = subcategory.imagePath
            a.innerText = subcategory.name

            img_a.appendChild(img)
            p.appendChild(a)
            container.appendChild(img_a)
            container.appendChild(p)

            subctegoriesBlocks[category.url].push(container)
            subcategoriesPart.appendChild(container)
        });

        li.addEventListener("mouseover", () => {
            
            for (const key in subctegoriesBlocks) {
                if (key !== category.url) 
                    subctegoriesBlocks[key].forEach(container => container.classList.add("nav-bar-categories-subcategory-hidden"))
            }

            subctegoriesBlocks[category.url].forEach(container => 
                container.classList.remove("nav-bar-categories-subcategory-hidden")
            )
        })

        categoriesList.appendChild(li)
    });
}


let userJson = sessionStorage.getItem("user")
if (userJson !== null) {
    let user = JSON.parse(userJson)
    document.querySelector("#nav-login").innerText = user.name
    document.querySelector("#nav-login").href = "/user/account.html"
}

let navBurgerContent = document.querySelector(".nav-burger-content")
document.querySelector(".nav-burger-menu").addEventListener("click", () => {
    navBurgerContent.classList.remove("nav-burger-content-hide")
})
document.querySelector("main").addEventListener("click", () => {
    navBurgerContent.classList.add("nav-burger-content-hide")
})