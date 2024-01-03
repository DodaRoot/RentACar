// Connecting the dom
let loginDisplay = document.querySelectorAll('.navBar p')[4]
let loginForm = document.querySelectorAll('.login')[0]
let signupForm = document.querySelectorAll('.login')[1]
let infoForm = document.querySelectorAll('.login')[2]

// Hiding login displays
signupForm.style.display = 'none'
infoForm.style.display = 'none'

// Main Object
let accountObj = {
    0 : ['doda' , 'doda@gmail.com' , 'pass' , '044 111 323'],
    1 : ['sufi' , 'sufi@gmail.com' , 'pass' , '045 676 313'],
}

// Setting local storage short cut
let localObj = null;
// Checking if the user is logged in
let userIndex = localStorage.getItem('userIndex');

// Checking if main obj is in local storage
if (localStorage.getItem('obj') == null) {
    localStorage.setItem('obj' , JSON.stringify(accountObj))
    localObj = JSON.parse(localStorage.getItem('obj'))
}
else {
    localObj = JSON.parse(localStorage.getItem('obj'))
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
    loginDisplay.innerText = localObj[index][0]
    userIndex = localStorage.setItem('userIndex' , index);
    location.reload()
}
// Switching from login to info if user is logged in
if (userIndex != null) {
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

// localStorage.clear()