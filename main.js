let servis = document.querySelector('.content')

let cars = {
    0 : ['images/servis/Audi Q8.png' , 'Manual'],
    1 : ['images/servis/Bugatti.png' , 'Automatic'],
    2 : ['images/servis/Llamburgini.jpg' , 'Manual'],
    3 : ['images/servis/Mercedes AMG GT Coupe.png' , 'Automatic'],
    4 : ['images/servis/Ferrari.png' , 'Manual'],
    5 : ['images/servis/Mercedes E-Class Cabriolet.png' , 'Automatic'],
    6 : ['images/servis/Mercedes EQS SUV.png' , 'Manual'],
    7 : ['images/servis/Mercedes-AMG GT 2024.png' , 'Automatic'],
}

let i = 0
for (let arr in cars) {
    let card = document.createElement('div')
    let image = document.createElement('img')
    let text = document.createElement('div')
    let p = document.createElement('p')
    servis.append(card)
    card.setAttribute('class', 'card')
    card.append(image)
    text.setAttribute('class', 'text')
    card.append(text)
    image.src = cars[i][0]
    i++
}
function automaticSort() {
    for (let arr in cars) {
        arr.remove()
    }
    if (cars[i][1] == 'Automatic') {
        let card = document.createElement('div')
        let image = document.createElement('img')
        servis.append(card)
        card.setAttribute('class', 'card')
        card.append(image)
        image.src = cars[i][0]
        i++
    }
}