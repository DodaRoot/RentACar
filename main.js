// Saving the cars in a object
let cars = {
    0 : ['images/servis/Audi Q8.png' , 'Manual' , 'Audi Q8' , '2024' , '300€/month' , '4 Avalible'],
    1 : ['images/servis/Bugatti.png' , 'Automatic' , 'Bugatti' , '2022' , '500€/month' , '1 Avalible'],
    2 : ['images/servis/Llamburgini.jpg' , 'Manual' , 'Llamburgini' , '2023' , '500€/month' , '1 Avalible'],
    3 : ['images/servis/Mercedes AMG GT Coupe.png' , 'Automatic' , 'Mercedes Coupe' , '2024' , '200€/month' , '6 Avalible'],
    4 : ['images/servis/Ferrari.png' , 'Manual' , 'Ferrari' , '2017' , '800€/month' , '1 Avalible'],
    5 : ['images/servis/Mercedes E-Class Cabriolet.png' , 'Automatic' , 'Mercedes E-Class' , '2020' , '300€/month' , '3 Avalible'],
    6 : ['images/servis/Mercedes EQS SUV.png' , 'Manual' , 'Mercedes EQS' , '2023' , '200€/month' , '5 Avalible'],
    7 : ['images/servis/Mercedes-AMG GT 2024.png' , 'Automatic' , 'Mercedes-AMG' , '2023' , '500€/month' , '2 Avalible'],
}

let servis = document.querySelector('.servis')
let content = document.createElement('div')

if ( document.URL.includes("index.html") ) {
    content.setAttribute('class', 'content')
    servis.append(content)
    for (let car in cars) {
        appendCars(car)
    }
}

let carInfo = localStorage.getItem('carInfo')
// Main appending function
function appendCars(car) {
    // Creating the elements
    let card = document.createElement('div')
    let image = document.createElement('img')
    let text = document.createElement('div')
    // Appending and adding the classes
    content.append(card)
    card.setAttribute('class', 'card')
    card.append(image)
    text.setAttribute('class', 'text')
    card.append(text)
    // Info Text append
    for (let x = 0; x < 4; x++) {
        let p = document.createElement('p')
        p.innerText = cars[car][x + 1]
        text.append(p)
    }
    // Button append
    let btn = document.createElement('button')
    btn.addEventListener('click' , () => {
        if (user == null) {
            alert('You must login to continue')
            console.log(car)
        }
        else {
            location.replace('order.html')
            carInfo = localStorage.setItem('carInfo' , car)
        }
    });
    btn.innerText = 'Order'
    text.append(btn)
    image.src = cars[car][0]
}


// Sorting cars servis
let manualText = document.querySelector('#manual')
let autoText = document.querySelector('#auto')
let allText = document.querySelector('#all')

function allSort() {
    manualText.style.color = 'rgb(131, 131, 131)';
    allText.style.color = 'black';
    autoText.style.color = 'rgb(128, 128, 128)'
    content.remove()
    content = document.createElement('div')
    content.setAttribute('class', 'content')
    servis.append(content)
    for (let car in cars) {
        appendCars(car)
    }
}

function manualSort() {
    manualText.style.color = 'black';
    allText.style.color = 'rgb(131, 131, 131)';
    autoText.style.color = 'rgb(128, 128, 128)'
    content.remove()
    content = document.createElement('div')
    content.setAttribute('class', 'content')
    servis.append(content)
    for (let car in cars) {
        if (cars[car][1] == 'Manual') {
            appendCars(car)
        }
    }
}

function autoSort() {
    autoText.style.color = 'black';
    allText.style.color = 'rgb(128, 128, 128)'
    manualText.style.color = 'rgb(128, 128, 128)'
    content.remove()
    content = document.createElement('div')
    content.setAttribute('class', 'content')
    servis.append(content)
    for (let car in cars) {
        if (cars[car][1] == 'Automatic') {
            appendCars(car)
        }
    }
}

if ( document.URL.includes("about.html") ) {
    // Animated text in about page
    let anchor = document.querySelector('.contentAbout p')
    let text = 'Planning your journey is just a click away. Our user-friendly online car reservation system ensures a hassle-free booking process, putting you in control of your travel plans.'
    let i = 0
    textAnimation(anchor, text)
    function textAnimation (anchor, text) {
        if (i < text.length) {
            setTimeout (() => {
                anchor.append(text[i])
                i++
                textAnimation(anchor, text)
            }, 10)  
        } 
    }
}

// acaunt settings
let user = localStorage.getItem('user')
let userDisplay = document.querySelector('#login')
let loginPage = document.querySelector('.display')
let logoutPage = document.querySelector('.logout')
user != null ? userDisplay.innerText = user : false ;
if (user != null && loginPage != null && loginPage != null) {
    loginPage.style.display = 'none';
    logoutPage.style.display = 'contents';
}
else if (logoutPage != null) {
    logoutPage.style.display = 'none'
}

// Login function
function login() {
    let userName = document.querySelector('#username').value
    let email = document.querySelector('#email').value
    let password = document.querySelector('#password').value
    event.preventDefault()
    for (let e in loginData) {
        if (userName == loginData[e][0] && email == loginData[e][1] && password == loginData[e][2]) {
            console.log('login is successful')
            login.innerText = userName
            user = localStorage.setItem('user' , userName)
            location.reload()
        }
    }
}
// Logout function
function delUser () {
    localStorage.removeItem('user');
    location.reload()
}

// Login data
let loginData = {
    0 : ['admin' , 'admin' , 'admin'],
    1 : ['doda' , 'doda@gmail.com' , 'password'],
}

// order func
if ( document.URL.includes("order.html") ) {
    let orderInfo = document.querySelectorAll('.orderInfo p')
    let orderImage = document.querySelector('.orderImage img')
    orderImage.src = cars[carInfo][0]
    orderInfo[0].innerText = `Car 🚗: ${cars[carInfo][2]}`
    orderInfo[1].innerText = `Gear ⚙️: ${cars[carInfo][1]}`
    orderInfo[2].innerText = `Year 📅: ${cars[carInfo][3]}`
    orderInfo[3].innerText = `Price 💵: ${cars[carInfo][4]}`
    console.log(carInfo)
}
