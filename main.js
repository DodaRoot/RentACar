// Connecting the dom
let loginDisplay = document.querySelectorAll('.navBar a')[4]
let loginForm = document.querySelectorAll('.login')[0]
let signupForm = document.querySelectorAll('.login')[1]
let infoForm = document.querySelectorAll('.login')[2]
let commentsForm = document.querySelector('#comments')
// Home data
let cardsTitle = document.querySelectorAll('.card-back h2')
let cardsInfo = document.querySelectorAll('.card-back p')
let cardsButton = document.querySelectorAll('.card-back button')
let cardsImage = document.querySelectorAll('.card-front img')
// ADMIN BUTTON
let adminBtn = document.querySelector('.adminBtn')
// Setting local storage short cut
let localObj = null;

// Checking if the user is logged in
let userIndex = localStorage.getItem('userIndex');

// Hiding login displays
if ( document.URL.includes("login.html") ) {
    signupForm.style.display = 'none'
    infoForm.style.display = 'none'
    adminBtn.style.display = 'none'
}

// Hiding the comment section
if ( document.URL.includes("index.html") ) {
    commentsForm.style.display = 'none'
}

// Main Object
let accountObj = {
    0 : ['admin' , 'admin' , 'admin' , 'Private'],
    1 : ['doda' , 'doda@gmail.com' , 'pass' , '044 111 323'],
    2 : ['sufi' , 'sufi@gmail.com' , 'pass' , '045 676 313'],
}

// Checking if main obj is in local storage
if (localStorage.getItem('obj') == null) {
    localStorage.setItem('obj' , JSON.stringify(accountObj))
    localObj = JSON.parse(localStorage.getItem('obj'))
}
else {
    localObj = JSON.parse(localStorage.getItem('obj'))
}

// Changing nav bar login text to user text
if (userIndex != null) {
    loginDisplay.innerText = localObj[userIndex][0]
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

// Login Function
function login () {
    event.preventDefault()
    let loginUsernameOrEmail = document.querySelector('#loginUsernameEmail').value
    let loginPassword = document.querySelector('#loginPassword').value
    for (let user in localObj) {
        if (loginUsernameOrEmail == localObj[user][0] && loginPassword == localObj[user][2]) {
            popup('Success' , `Welcome ${loginUsernameOrEmail}` , true , user)
            break;
        }
        else if (loginUsernameOrEmail == localObj[user][0] || loginUsernameOrEmail == localObj[user][1]) {
            popup('Error' , 'User exists but the password is wrong')
            break;
        }
        else {
            if (Object.keys(localObj).length - 1 == user) {
                popup('Error' , 'User does not exist')
            }
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
    infoText[0].innerText = 'Username $- ' + userArray[0]
    infoText[1].innerText = 'Email $- ' + userArray[1]
    infoText[2].innerText = 'Number $- ' + userArray[3]
    infoText[3].innerText = 'Password $- ' + userArray[2]
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
    localStorage.removeItem('year')
    localStorage.removeItem('title')
    localStorage.removeItem('userIndex')
    localStorage.removeItem('image')
    localStorage.removeItem('type')
    localStorage.removeItem('price')
    location.reload()
}

// Admin button
function admin () {
    localStorage.clear()
    location.reload()
}

// Seting card info to localstorage
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
            popup('Error' , 'You need to sign in to continue')
        }
    })
}

// Populating the order page
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

// Order -------
let ordersObj = {}

// Checking if orderObj is in local storage
if (localStorage.getItem('objOrder') == null) {
    localStorage.setItem('objOrder' , JSON.stringify(ordersObj))
    localOrderObj = JSON.parse(localStorage.getItem('objOrder'))
}
else {
    localOrderObj = JSON.parse(localStorage.getItem('objOrder'))
}

function order() {
    let title = localStorage.getItem('title')
    let type = localStorage.getItem('type')
    let year = localStorage.getItem('year')
    let price = localStorage.getItem('price')
    let image = localStorage.getItem('image')
    let pickDate = document.querySelector('#PickDate').value
    let dropDate = document.querySelector('#DropDate').value
    let pickCity = document.querySelector('#PickCity').value
    let dropCity = document.querySelector('#DropCity').value
    console.log(pickDate + dropDate + pickCity + dropCity)
    // Setting up the new data
    let new_data = [title , type , year , price , image , pickDate , dropDate , pickCity , dropCity , userIndex]
    // Getting the value from obj and setting to temp value
    let old_data = JSON.parse(localStorage.getItem('objOrder'))
    // Getting the index of the temp obj
    let index = (Object.keys(old_data).length)
    // Setting the new value to temp obj
    old_data[index] = new_data
    // Making the temp obj the primary obj
    localStorage.setItem('objOrder' , JSON.stringify(old_data))
    // Reloading the page
    location.replace('index.html')    
}

function orderData () {
    location.replace('orderData.html')
}   

if (document.URL.includes("orderData.html")) {
    let table = document.querySelector('#orderData table')
    if (localOrderObj != null && userIndex != 0) {
        for(let element in localOrderObj) {
            if (localOrderObj[element][9] == userIndex) {
                let row = document.createElement('tr')
                table.append(row)
                let title = document.createElement('td')
                title.innerText = localOrderObj[element][0]
                row.append(title)
                let type = document.createElement('td')
                type.innerText = localOrderObj[element][1]
                row.append(type)
                let year = document.createElement('td')
                year.innerText = localOrderObj[element][2]
                row.append(year)
                let price = document.createElement('td')
                price.innerText = localOrderObj[element][3]
                row.append(price)
                let pickDate = document.createElement('td')
                pickDate.innerText = localOrderObj[element][5]
                row.append(pickDate)
                let returnDate = document.createElement('td')
                returnDate.innerText = localOrderObj[element][6]
                row.append(returnDate)
                let pickCity = document.createElement('td')
                pickCity.innerText = localOrderObj[element][7]
                row.append(pickCity)
                let returnCity = document.createElement('td')
                returnCity.innerText = localOrderObj[element][8]
                row.append(returnCity)
            }
        }
    }
    else if (localOrderObj != null && userIndex == 0) {
        let headers = document.querySelectorAll('#orderData table tr')
        let person = document.createElement('th')
        let number = document.createElement('th')
        person.innerText = 'Person'
        number.innerText = 'Number'
        headers[0].append(person)
        headers[0].append(number)
        for(let element in localOrderObj) {
            let row = document.createElement('tr')
            table.append(row)
            let title = document.createElement('td')
            title.innerText = localOrderObj[element][0]
            row.append(title)
            let type = document.createElement('td')
            type.innerText = localOrderObj[element][1]
            row.append(type)
            let year = document.createElement('td')
            year.innerText = localOrderObj[element][2]
            row.append(year)
            let price = document.createElement('td')
            price.innerText = localOrderObj[element][3]
            row.append(price)
            let pickDate = document.createElement('td')
            pickDate.innerText = localOrderObj[element][5]
            row.append(pickDate)
            let returnDate = document.createElement('td')
            returnDate.innerText = localOrderObj[element][6]
            row.append(returnDate)
            let pickCity = document.createElement('td')
            pickCity.innerText = localOrderObj[element][7]
            row.append(pickCity)
            let returnCity = document.createElement('td')
            returnCity.innerText = localOrderObj[element][8]
            row.append(returnCity)
            let name = document.createElement('td')
            name.innerText = localObj[localOrderObj[element][9]][0] 
            row.append(name)
            let number = document.createElement('td')
            number.innerText = localObj[localOrderObj[element][9]][3] 
            row.append(number)
        }
    }
}

// Admin button adding
if (userIndex == 0 && document.URL.includes("login.html")) {
    adminBtn.style.display = 'flex'
}

// Comment object

let commentObj = {}
let localCommentObj = null
// Setting the comment section
if (localStorage.getItem('commentObj') == null) {
    localStorage.setItem('commentObj' , JSON.stringify(commentObj))
    localCommentObj = JSON.parse(localStorage.getItem('commentObj'))

}
else {
    localCommentObj = JSON.parse(localStorage.getItem('commentObj'))
}

// Showing the comments section
if (userIndex != null && document.URL.includes("index.html")) {
    commentsForm.style.display = 'flex'
    function subComment() {
        event.preventDefault()
        let text = document.querySelector('#comment').value
        // Setting up the new data
        let new_data = [text , localObj[userIndex][0]]
        // Getting the value from obj and setting to temp value
        let old_data = JSON.parse(localStorage.getItem('commentObj'))
        // Getting the index of the temp obj
        let index = (Object.keys(old_data).length)
        // Setting the new value to temp obj
        old_data[index] = new_data
        // Making the temp obj the primary obj
        localStorage.setItem('commentObj' , JSON.stringify(old_data))
        // Reloading the page
        location.reload() 
    }
}
if (document.URL.includes("index.html") && localCommentObj != null) {
    for (let comment in localCommentObj) {
        let container = document.querySelector('.reviews')
        let div = document.createElement('div')
        let img = document.createElement('img')
        let h2 = document.createElement('h2')
        let p = document.createElement('p')
        div.setAttribute('class' , 'card')
        container.append(div)
        img.src = 'images/profile.jpg'
        div.append(img)
        h2.innerText = localCommentObj[comment][1]
        div.append(h2)
        p.innerText = localCommentObj[comment][0]
        div.append(p)
    }
}

// Popup
function popup (title , content , func , user) {
    let contain = document.createElement('div')
    let div = document.createElement('div')
    let head = document.createElement('h2')
    let text = document.createElement('p')
    let button = document.createElement('button')
    contain.setAttribute('class' , 'contain')
    div.setAttribute('class' , 'popup')
    document.body.append(contain)
    contain.append(div)
    head.innerText = title
    text.innerText = content
    button.innerText = 'Close'
    div.append(head)
    div.append(text)
    div.append(button)
    button.addEventListener('click' , () => {
        div.style.display = 'none'
        if (func == true) {
            successLogin(user)
        }
    })
}