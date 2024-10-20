const bookmarks = Array.from(document.querySelectorAll(".info-container-bookmark"))

setInterval(() => {
    const links = Array.from(document.querySelector(".info-nav").querySelectorAll("li"))

    let lastBookmark = -1
    bookmarks.forEach((e,i) => {
        if (e.getBoundingClientRect().top < 10) {
            lastBookmark = i
        }
    })
    
    if (lastBookmark === -1) {
        links[0].classList.add("info-nav-active")
        links.splice(1).forEach(e => e.classList.remove("info-nav-active"))
    } else {        
        let selectedLink = links[lastBookmark]

        links.forEach(e => e.classList.remove("info-nav-active"))
        selectedLink.classList.add("info-nav-active")
    }
    
}, 100)
