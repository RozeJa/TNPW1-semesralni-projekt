const headers = Array.from(document.querySelectorAll("h2"))
headers.unshift(document.querySelector("h1"))

setInterval(() => {
    const links = Array.from(document.querySelector(".info-nav").querySelectorAll("li"))

    let lastHeader = -1
    headers.forEach((e,i) => {
        if (e.getBoundingClientRect().top < 100) {
            lastHeader = i
        }
    })
    
    if (lastHeader === -1) {
        links[0].classList.add("info-nav-active")
        links.splice(1).forEach(e => e.classList.remove("info-nav-active"))
    } else {        
        let selectedLink = links[lastHeader]

        links.forEach(e => e.classList.remove("info-nav-active"))
        selectedLink.classList.add("info-nav-active")
    }
    
}, 100)
