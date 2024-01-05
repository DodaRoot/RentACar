// Connecting with the dom
let scroll = document.querySelector('.scrollBar')
// Finding the scroll height
let scrollHeight = document.body.scrollHeight - window.innerHeight

// Navbar Hover Effect
// Navbar links
let link = document.querySelectorAll('.navBar p')
let actLink = document.querySelector('.active')
let overlay = document.querySelector('.navBar .overlay')

// Checking which page we are on
if ( document.URL.includes("index.html") ) {
    link[0].setAttribute('class' , 'active')
    link[1].removeAttribute('class' , 'active')
    link[4].removeAttribute('class' , 'active')
    actLink = document.querySelector('.active')
    navLoad()
}
if ( document.URL.includes("about.html") ) {
    link[0].removeAttribute('class' , 'active')
    link[1].setAttribute('class' , 'active')
    link[4].removeAttribute('class' , 'active')
    actLink = document.querySelector('.active')
    navLoad()
}
if ( document.URL.includes("login.html") ) {
    link[0].removeAttribute('class' , 'active')
    link[1].removeAttribute('class' , 'active')
    link[4].setAttribute('class' , 'active')
    actLink = document.querySelector('.active')
    navLoad()
}

// Navbar on load behavior
function navLoad() {
    let domWidth = document.body.offsetWidth
    let pos = actLink.getBoundingClientRect()
    overlay.style.left = (pos.x / domWidth) * 100 + '%'
    overlay.style.width = (pos.width / domWidth) * 100 + '%'
}

// Adding on click listeners to navbar links
let click = false;
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

// Slider
// Slider content
let sliderCont = {
    0 : ['Sedan - The perfect car for a family trip' , 'images/SliderImg/Slider1.png'],
    1 : ['Coupe - Have the best adventure you can !' , 'images/SliderImg/Slider2.png'],
    2 : ['Sport Car - Drive as fast as you can with this car' , 'images/SliderImg/Slider3.png'],
}

let sliderIndex = 0
let imgDiv = document.querySelector('.header .img')
let img = document.querySelector('.header img')
let text = document.querySelector('.header .text')

// Previous slide button
function slideNext() {
    // Removing the images with animations
    text.style.animation = '1s textOut ease-in-out';
    imgDiv.style.animation = '1s slideOut ease-in-out';
    // Switching animations
    setTimeout(() => {
        if (sliderIndex >= Object.keys(sliderCont).length - 1) {
            sliderIndex = 0
        }
        else {
            sliderIndex++
        }
        text.style.animation = '1s textIn ease-in-out';
        text.innerText = sliderCont[sliderIndex][0]
        imgDiv.style.animation = '1s slideIn ease-in-out';
        img.src = sliderCont[sliderIndex][1]
    } , 900)
}

// Next slide button
function slidePre() {
    // Removing the images with animations
    text.style.animation = '1s textOut ease-in-out';
    imgDiv.style.animation = '1s slideOut ease-in-out';
    // Switching animations
    setTimeout(() => {
        if (sliderIndex <= 0) {
            sliderIndex = Object.keys(sliderCont).length - 1
        }
        else {
            sliderIndex--
        }
        text.style.animation = '1s textIn ease-in-out';
        text.innerText = sliderCont[sliderIndex][0]
        imgDiv.style.animation = '1s slideIn ease-in-out';
        img.src = sliderCont[sliderIndex][1]
    } , 900)
}

// Sorting cars
let cars = document.querySelectorAll('.cardWrap')
let wrap = document.querySelectorAll('.wraper')
let sortButtons = document.querySelectorAll('.sortButtons button')
// Auto sorting button
function auto() {
    sortButtons[0].style.color = 'black'
    sortButtons[1].style.color = 'rgb(148, 148, 148)'
    sortButtons[2].style.color = 'rgb(148, 148, 148)'
    let i = 0
    cars.forEach((x) => {
        let type = wrap[i].getAttribute('data-type')
        if (type == 'manual') {
            x.style.display = 'none'
        }
        else {
            x.style.display = 'flex'
        }
        i++
    })
}

// Manual sorting button
function manual() {
    sortButtons[0].style.color = 'rgb(148, 148, 148)'
    sortButtons[1].style.color = 'rgb(148, 148, 148)'
    sortButtons[2].style.color = 'black'
    let i = 0
    cars.forEach((x) => {
        let type = wrap[i].getAttribute('data-type')
        if (type == 'auto') {
            x.style.display = 'none'
        }
        else {
            x.style.display = 'flex'
        }
        i++
    })
}

// All sorting button
function allCars() {
    sortButtons[0].style.color = 'rgb(148, 148, 148)'
    sortButtons[1].style.color = 'black'
    sortButtons[2].style.color = 'rgb(148, 148, 148)'
    cars.forEach((x) => {
        x.style.display = 'flex'
    })
}

// Scroll functions
window.onscroll = function() {
    // Changing scroll bar size
    let percentage = (window.pageYOffset / scrollHeight) * 100;
    scroll.style.height = `${percentage}%`
    // Changing navbar links
    if ( document.URL.includes("index.html") ) {
        // Finding the locations in the page
        // Home section location
        let home = document.querySelector('#home')
        let homeLoc = home.getBoundingClientRect().height / scrollHeight * 100 + 5
        // Cars Section location
        let cars = document.querySelector('#cars')
        let carsLoc = cars.getBoundingClientRect().height / scrollHeight * 100 + 5
        // Changing navbar link to home
        if (percentage <= homeLoc) {
            link[0].setAttribute('class' , 'active')
            link[2].removeAttribute('class' , 'active')
            actLink = document.querySelector('.active')
            navLoad()
        }
        // Changing navbar link to cars
        else if (percentage >= homeLoc && percentage <= carsLoc) {
            link[0].removeAttribute('class' , 'active')
            link[2].setAttribute('class' , 'active')
            actLink = document.querySelector('.active')
            navLoad()
        }
        // Changing navbar link to reviews
        else if (percentage >= carsLoc + 20) {
            link[0].removeAttribute('class' , 'active')
            link[2].removeAttribute('class' , 'active')
            link[3].setAttribute('class' , 'active')
            actLink = document.querySelector('.active')
            navLoad()
        }
    }
}


