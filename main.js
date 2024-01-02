// Connecting the dom
let loginDisplay = document.querySelectorAll('.navBar p')[4]
let loginForm = document.querySelectorAll('.login')[0]
let signupForm = document.querySelectorAll('.login')[1]
let infoForm = document.querySelectorAll('.login')[2]

// Hiding login displays
signupForm.style.display = 'none'
infoForm.style.display = 'none'

// Main Object
accountObj = {
    0 : ['doda' , 'doda@gmail.com' , 'pas' , '044 111 323'],
    1 : ['sufi' , 'sufi@gmail.com' , 'pas' , '045 676 313'],
}

// Logic Functions
function login () {
    event.preventDefault()
    let loginUsernameOrEmail = document.querySelector('#loginUsernameEmail').value
    let loginPassword = document.querySelector('#loginPassword').value
    for (let user in accountObj) {
        if (loginUsernameOrEmail == accountObj[user][0] && loginPassword == accountObj[user][2]) {
            console.log('Login Successful')
            successLogin(user)
            break;
        }
        else if (loginUsernameOrEmail == accountObj[user][0] || loginUsernameOrEmail == accountObj[user][1]) {
            console.log('User exists but the password is wrong')
            break;
        }
        else {
            console.log('Username does not exist')
            break;
        }
    }
}

// Successful login function
function successLogin (index) {
    loginDisplay.innerText = accountObj[index][0]
}

// Signing up function
function signup () {
    event.preventDefault()
    let signupUsername = document.querySelector('#signupUsername').value
    let signupEmail = document.querySelector('#signupEmail').value
    let signupPhone = document.querySelector('#signupPhone').value
    let signupPassword = document.querySelector('#signupPassword').value
}

// Hiding the login form from display
function changeSignUp () {
    event.preventDefault()
    loginForm.style.display = 'none'
    signupForm.style.display = 'flex'
    infoForm.style.display = 'none'
}