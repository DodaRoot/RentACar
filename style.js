// ScrollBar
// Connecting with the dom
let scroll = document.querySelector('.scrollBar')
// Finding the scroll height
let scrollHeight = document.body.scrollHeight - window.innerHeight
// Changing scroll bar size
window.onscroll = function() {
    let percentage = (window.pageYOffset / scrollHeight) * 100;
    scroll.style.height = `${percentage}%`
}

// Navbar Hover Effect
// Navbar links
let link = document.querySelectorAll('.navBar p')
let actLink = document.querySelector('.active')
let overlay = document.querySelector('.navBar .overlay')
link.forEach((x) => {
    x.addEventListener('mouseover' , () => {
        let domWidth = document.body.offsetWidth
        let pos = x.getBoundingClientRect()
        overlay.style.left = (pos.x / domWidth) * 100 + '%'
        overlay.style.width = pos.width + 'px'
    })
    x.addEventListener('mouseleave' , () => {
        let domWidth = document.body.offsetWidth
        let actPos = actLink.getBoundingClientRect()
        overlay.style.left = (actPos.x / domWidth) * 100 + '%'
        overlay.style.width = actPos.width + 'px'
    })
})