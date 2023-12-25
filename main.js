// Saving the cars info in an object
let cars = {
    0 : ['images/servis/Audi Q8.png' , 'Manual' , 'Audi Q8' , '2024' , '30€/day' , '4 Avalible'],
    1 : ['images/servis/Bugatti.png' , 'Automatic' , 'Bugatti' , '2022' , '50€/day' , '1 Avalible'],
    2 : ['images/servis/Llamburgini.png' , 'Manual' , 'Llamburgini' , '2023' , '50€/day' , '1 Avalible'],
    3 : ['images/servis/Mercedes AMG GT Coupe.png' , 'Automatic' , 'Mercedes Coupe' , '2024' , '20€/day' , '6 Avalible'],
    4 : ['images/servis/Ferrari.png' , 'Manual' , 'Ferrari' , '2017' , '80€/day' , '1 Avalible'],
    5 : ['images/servis/Mercedes E-Class Cabriolet.png' , 'Automatic' , 'Mercedes E-Class' , '2020' , '30€/day' , '3 Avalible'],
    6 : ['images/servis/Mercedes EQS SUV.png' , 'Manual' , 'Mercedes EQS' , '2023' , '20€/day' , '5 Avalible'],
    7 : ['images/servis/Mercedes-AMG GT 2024.png' , 'Automatic' , 'Mercedes-AMG' , '2023' , '50€/day' , '2 Avalible'],
}

// Login Accounts Data
let loginData = {
    0 : ['admin' , 'admin' , 'admin'],
    1 : ['doda' , 'root.doda@gmail.com' , 'password'],
}


// All Global Scope Variables ----

let servis = document.querySelector('.servis')
let content = document.createElement('div')
// Saving car info in to local storage
let carInfo = localStorage.getItem('carInfo')
// Sorting cars servis
let manualText = document.querySelector('#manual')
let autoText = document.querySelector('#auto')
let allText = document.querySelector('#all')
// Account settings and properties
let user = localStorage.getItem('user')
let emails = localStorage.getItem('email')
let pass = localStorage.getItem('pass')
let userDisplay = document.querySelector('#login')
let loginPage = document.querySelector('.display')
let logoutPage = document.querySelector('.logout')
let reviewForm = document.querySelector('.leaveReview')

// Index page - Cars Population with info
if ( document.URL.includes("index.html") ) {
    // Car Cards
    content.setAttribute('class', 'content')
    servis.append(content)
    for (let car in cars) {
        appendCars(car)
    }    
    // Hiding the reviews
    reviewForm.style.display = 'none'
}

// About page - Animated text
if ( document.URL.includes("about.html") ) {
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

// Order Page - Content Population
if ( document.URL.includes("order.html") ) {
    let orderInfo = document.querySelectorAll('.orderInfo p')
    let orderImage = document.querySelector('.orderImage img')
    orderImage.src = cars[carInfo][0]
    orderInfo[0].innerText = `Car 🚗: ${cars[carInfo][2]}`
    orderInfo[1].innerText = `Gear ⚙️: ${cars[carInfo][1]}`
    orderInfo[2].innerText = `Year 📅: ${cars[carInfo][3]}`
    orderInfo[3].innerText = `Price 💵: ${cars[carInfo][4]}`
}

// Login page - Info Population
if ( document.URL.includes("login.html") ) {
    let loginInfo = document.querySelectorAll('.logoutInfo h3')
    loginInfo[0].innerText = `Username - ${user}`
    loginInfo[1].innerText = `Email - ${emails}`
    loginInfo[2].innerText = `Password - ${pass}`
}


// All functions ----------

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
// Sorting all car cards
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

// Sorting manual car cards
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

// Sorting automatic car cards
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

// Checking if user value is null and displaying the correct properties
user != null ? userDisplay.innerText = user : false ;
if (user != null && reviewForm != null) {
    userDisplay.innerText = user
    reviewForm.style.display = 'flex'
}
else if (user != null && loginPage != null && loginPage != null) {
    loginPage.style.display = 'none';
    logoutPage.style.display = 'flex';
}
else if (logoutPage != null) {
    loginPage.style.display = 'flex'
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
            emails = localStorage.setItem('email' , email)
            pass = localStorage.setItem('pass' , password)
            location.reload()
        }
    }
}

// Logout function
function delUser () {
    localStorage.removeItem('user');
    localStorage.removeItem('carInfo')
    localStorage.removeItem('email')
    localStorage.removeItem('pass')
    location.reload()
}

// ---- Sending Order Email ------------
if ( document.URL.includes("order.html") ) {
    (function(){
        emailjs.init("Zj9B-Pm5zyK4DxWLD");
    })();
    function sendOrder() {
        event.preventDefault()
        let pickCity = document.querySelector('#PickCity').value
        let dropCity = document.querySelector('#DropCity').value
        let pickDate = document.querySelector('#PickDate').value
        let dropDate = document.querySelector('#DropDate').value
        emailjs.send("service_vjjgctq","template_n69lm4q",{
            name: user,
            message: `Hello your order for a ${cars[carInfo][2]} has been Recived \n
            You will pick up your car in ${pickCity} on ${pickDate} \n
            You will return the car in ${dropCity} on ${dropDate} \n
            If you do not return the car in time you will be hearing from our boss Unikkatil`,
            emails: emails,
        });
        alert('Information sent to your email')
    }
    // Sending test drive order -----
    function testDrive() {
        emailjs.send("service_vjjgctq","template_n69lm4q",{
            name: user,
            message: `In order to test Drive one of our cars you have to come to our nearest location in Prishtina`,
            emails: emails,
        });
        alert('Information for test drive sent to your email')
    }
}

// Sign Up Event
let indexOfObject = 2
function signUp () {
    event.preventDefault()
    let userName = document.querySelector('#username').value
    let email = document.querySelector('#email').value
    let password = document.querySelector('#password').value
    loginData.indexOfObject = [userName , email , password]
    console.log(loginData)
    indexOfObject++
    alert('Sign Up was successful \nPlease Login to continue')
}


function leaveReview() {
    event.preventDefault()
    let reviewsAppend = document.querySelector('.reviews')
    let div = document.createElement('div')
    let img = document.createElement('img')
    let h2 = document.createElement('h2')
    let p = document.createElement('p')
    let reviewText = document.querySelector('#reviewText').value
    reviewsAppend.append(div)
    div.setAttribute('class', 'card')
    div.append(img)
    div.append(h2)
    div.append(p)
    img.src = 'images/User.png'
    h2.innerText = user
    p.innerText = reviewText
}
