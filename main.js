// Connecting the dom
let loginDisplay = document.querySelectorAll('.navBar a')[4]
let loginForm = document.querySelectorAll('.login')[0]
let signupForm = document.querySelectorAll('.login')[1]
let infoForm = document.querySelectorAll('.login')[2]
let commentsForm = document.querySelector('#comments')


// Setting local storage short cut
let localObj = null;
// Checking if the user is logged in
let userIndex = localStorage.getItem('userIndex');

if ( document.URL.includes("login.html") ) {
    // Hiding login displays
    signupForm.style.display = 'none'
    infoForm.style.display = 'none'
}
if ( document.URL.includes("index.html") ) {
    // Hiding the comment section
    commentsForm.style.display = 'none'
}

// Main Object
let accountObj = {
    0 : ['doda' , 'doda@gmail.com' , 'pass' , '044 111 323'],
    1 : ['sufi' , 'sufi@gmail.com' , 'pass' , '045 676 313'],
}

// Checking if main obj is in local storage
if (localStorage.getItem('obj') == null) {
    localStorage.setItem('obj' , JSON.stringify(accountObj))
    localObj = JSON.parse(localStorage.getItem('obj'))
}
else {
    localObj = JSON.parse(localStorage.getItem('obj'))
}

if (userIndex != null) {
    loginDisplay.innerText = localObj[userIndex][0]
}

// Logic Functions
function login () {
    event.preventDefault()
    let loginUsernameOrEmail = document.querySelector('#loginUsernameEmail').value
    let loginPassword = document.querySelector('#loginPassword').value
    for (let user in localObj) {
        if (loginUsernameOrEmail == localObj[user][0] && loginPassword == localObj[user][2]) {
            successLogin(user)
            break;
        }
        else if (loginUsernameOrEmail == localObj[user][0] || loginUsernameOrEmail == localObj[user][1]) {
            console.log('User exists but the password is wrong')
            break;
        }
        else {
            console.log('Username does not exist')
        }
    }
}

// Successful login function
function successLogin (index) {
    userIndex = localStorage.setItem('userIndex' , index);
    location.reload()
}

// Switching from login to info if user is logged in
if (userIndex != null && document.URL.includes("login.html")) {
    // Information in the user info
    loginForm.style.display = 'none'
    signupForm.style.display = 'none'
    infoForm.style.display = 'flex'
    let userArray = localObj[userIndex]
    let infoText = document.querySelectorAll('.info p')
    infoText[0].innerText = 'Your username is / ' + userArray[0]
    infoText[1].innerText = 'Your email is / ' + userArray[1]
    infoText[2].innerText = 'Your number is / ' + userArray[2]
    infoText[3].innerText = 'Your password is / ' + userArray[3]
}

// Showing the comments section
if (userIndex != null && document.URL.includes("index.html")) {
    commentsForm.style.display = 'flex'
    function subComment() {
        event.preventDefault()
        let text = document.querySelector('#comment').value
        let container = document.querySelector('.reviews')
        let div = document.createElement('div')
        let img = document.createElement('img')
        let h2 = document.createElement('h2')
        let p = document.createElement('p')
        div.setAttribute('class' , 'card')
        container.append(div)
        img.src = 'images/profile.jpg'
        div.append(img)
        h2.innerText = localObj[userIndex][0]
        div.append(h2)
        p.innerText = text
        div.append(p)
    }
}



// Signing up function
function signup () {
    event.preventDefault()
    let signupUsername = document.querySelector('#signupUsername').value
    let signupEmail = document.querySelector('#signupEmail').value
    let signupPhone = document.querySelector('#signupPhone').value
    let signupPassword = document.querySelector('#signupPassword').value
    // Setting up the new data
    let new_data = [signupUsername , signupEmail , signupPassword , signupPhone]
    // Getting the value from obj and setting to temp value
    let old_data = JSON.parse(localStorage.getItem('obj'))
    // Getting the index of the temp obj
    let index = (Object.keys(old_data).length)
    // Setting the new value to temp obj
    old_data[index] = new_data
    // Making the temp obj the primary obj
    localStorage.setItem('obj' , JSON.stringify(old_data))
    // Reloading the page
    location.reload()
}

// Hiding the login form from display
function changeSignUp () {
    event.preventDefault()
    loginForm.style.display = 'none'
    signupForm.style.display = 'flex'
    infoForm.style.display = 'none'
}
function changeBack () {
    event.preventDefault()
    loginForm.style.display = 'flex'
    signupForm.style.display = 'none'
    infoForm.style.display = 'none'
}
 
// Sign Out Button
function signout () {
    localStorage.clear()
    location.reload()
}


// Home data
let cardsTitle = document.querySelectorAll('.card-back h2')
let cardsInfo = document.querySelectorAll('.card-back p')
let cardsButton = document.querySelectorAll('.card-back button')
let cardsImage = document.querySelectorAll('.card-front img')

for (let [index , value] of cardsButton.entries()) {
    value.addEventListener('click' , () => {
        if (userIndex != null) {
            let array = cardsInfo[index].innerText.split('/')
            localStorage.setItem('title' , cardsTitle[index].innerText)
            localStorage.setItem('type' , array[0])
            localStorage.setItem('year' , array[1])
            localStorage.setItem('price' , array[2])
            localStorage.setItem('image' , cardsImage[index].src)
            location.replace('order.html')
        }
        else {
            alert('you need to login')
        }
    })
}

if (document.URL.includes("order.html")) {
    let title = localStorage.getItem('title')
    let type = localStorage.getItem('type')
    let year = localStorage.getItem('year')
    let price = localStorage.getItem('price')
    let image = localStorage.getItem('image')
    let orderImage = document.querySelector('.orderImage img')
    let orderInfo = document.querySelectorAll('.orderInfo p')
    orderImage.src = image
    orderInfo[0].innerText = title
    orderInfo[1].innerText = type
    orderInfo[2].innerText = year
    orderInfo[3].innerText = price
    // Get the modal
    let modal = document.getElementById("myModal");
    // Get the button that opens the modal
    let btn = document.getElementById("myBtn");
    // Get the <span> element that closes the modal
    let span = document.getElementsByClassName("close")[0]
    // Modali ---------
    btn.onclick = function() {
        modal.style.display = "block";
    }
    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modal.style.display = "none";
    }
    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}

