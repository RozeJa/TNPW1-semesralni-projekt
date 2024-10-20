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
    let div = document.createElement("div")
    h2.innerText = "Podkategorie"
    div.classList.add("category-subcategories")
    subcategories.appendChild(h2)

    
    // TODO načti kategorie a podkategorie zjisti které podkategorie je třeba vyrentrovat a vyrendruj je



    subcategories.appendChild(div)

    /**
     * 
     *                 <h2>Podkategorie</h2>
                <div class="category-subcategories">
                <!-- generuje se -->
                    <div class="category-subcategory">
                        <p><a href="podkategorie">asdasdasda</a></p>
                        <a href="podkategorie"><img src="" alt="obrazek"></a>
                    </div>
                </div>
     */

}

