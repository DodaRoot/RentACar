// Text animation
let anchor = document.querySelector('.content p')
let text = 'Planning your journey is just a click away. Our user-friendly online car reservation system ensures a hassle-free booking process, putting you in control of your travel plans.'
console.log(anchor)

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