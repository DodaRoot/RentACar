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
function navLoad() {
    let domWidth = document.body.offsetWidth
    let pos = actLink.getBoundingClientRect()
    overlay.style.left = (pos.x / domWidth) * 101 + '%'
    overlay.style.width = pos.width + 'px'
}
navLoad()
link.forEach((x) => {
    x.addEventListener('mouseover' , () => {
        let domWidth = document.body.offsetWidth
        let pos = x.getBoundingClientRect()
        overlay.style.left = (pos.x / domWidth) * 101 + '%'
        overlay.style.width = pos.width + 'px'
    })
    x.addEventListener('mouseleave' , () => {
        let domWidth = document.body.offsetWidth
        let actPos = actLink.getBoundingClientRect()
        overlay.style.left = (actPos.x / domWidth) * 101 + '%'
        overlay.style.width = actPos.width + 'px'
    })
})

// Slider
// Slider content
let sliderCont = {
    0 : ['Sedan - The perfect car for a family trip' , 'images/SliderImg/Slider1.png'],
    1 : ['Coupe - Have the best adventure you can !' , 'images/SliderImg/Slider2.png'],
    2 : ['Sport Car - Drive as fast as you can with this monster' , 'images/SliderImg/Slider3.png'],
}
let sliderIndex = 0
let imgDiv = document.querySelector('.header .img')
let img = document.querySelector('.header img')
let text = document.querySelector('.header .text')
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
let cars = document.querySelectorAll('.wraper')
function auto() {
    cars.forEach((x) => {
        let type = x.getAttribute('data-type')
        if (type == 'manual') {
            x.style.display = 'none'
        }
        else {
            x.style.display = 'flex'
        }
    })
}
function manual() {
    cars.forEach((x) => {
        let type = x.getAttribute('data-type')
        if (type == 'auto') {
            x.style.display = 'none'
        }
        else {
            x.style.display = 'flex'
        }
    })
}
function allCars() {
    cars.forEach((x) => {
        x.style.display = 'flex'
    })
}

// NavBar Switching 
window.onscroll = function() {
    let percentage = (window.pageYOffset / scrollHeight) * 100;
    if (percentage >= 28) {
        console.log('change')
        link[0].removeAttribute('class' , 'active')
        link[2].setAttribute('class' , 'active')
        actLink = document.querySelector('.active')
        navLoad()
    }
    else if (percentage <= 28) {
        console.log('change')
        link[2].removeAttribute('class' , 'active')
        link[0].setAttribute('class' , 'active')
        actLink = document.querySelector('.active')
        navLoad()
    }
}