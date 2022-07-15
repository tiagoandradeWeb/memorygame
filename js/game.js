const grid = document.querySelector('.grid')
const spanPlayer = document.querySelector(".player")
const hour = document.querySelector('.hour')
const minutes = document.querySelector('.minutes')
const seconds = document.querySelector('.seconds')

let h = 0
let m = 0
let s = 0

const modal = document.querySelector(".modal")
const scoreboard = document.querySelector('.scoreboard')
const btnOk = document.querySelector('.ok')
const btnNewGame = document.querySelector('.new__game')
const btnSwitchPlayer = document.querySelector('.switch__player')

const characters = [
    "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"
]

const createElement = (tag, className) => {
    const element = document.createElement(tag)
    element.className = className
    return element
}

let firstCard = ""
let secondCard = ""

const checkEndGame = () =>{
    const disabledCards = document.querySelectorAll('.disabled-card')
    scoreboard.innerHTML = `Parabéns ${spanPlayer.innerHTML} seu tempo é de <span> ${h}h: ${m}m: ${s}s </span>`
    if(disabledCards.length === 20){
        clearInterval(this.loop)
        modal.style.top = 0
        modal.style.opacity = 1

        btnOk.addEventListener("click", () => {
            modal.style.top = "-" + 1000 + "px"
        })

        btnNewGame.addEventListener("click", () =>{
            location.reload()
        })

        btnSwitchPlayer.addEventListener("click", () =>{
            window.location = "/index.html"
        })
    }
}

const checkCard = () => {
    const firstCharacter = firstCard.getAttribute('data-character')
    const secondCharacter = secondCard.getAttribute('data-character')


     if(firstCharacter === secondCharacter){
        firstCard.firstChild.classList.add('disabled-card')
        secondCard.firstChild.classList.add('disabled-card')

        firstCard = ""
        secondCard = ""
    }else{
         setTimeout(()=>{
             firstCard.classList.remove("reveal-card")
             secondCard.classList.remove("reveal-card")

             firstCard = ""
             secondCard = ""
         }, 500)
     }

     checkEndGame()
}

const revealCard = ({target}) =>{
    if(target.parentNode.className.includes('reveal-card')) {
        return
    }

    if(firstCard === ""){
        target.parentNode.classList.add('reveal-card')
        firstCard = target.parentNode

        checkCard()
    } else if(secondCard === ""){
        target.parentNode.classList.add('reveal-card')
        secondCard = target.parentNode

        checkCard()
    }
}

const createCard = (character) => {
    const card = createElement("div", "card")
    const front = createElement("div", "face front")
    const back = createElement("div", "face back")

    front.style.backgroundImage = `url('../imagens/${character}.jpg')`

    card.appendChild(front)
    card.appendChild(back)

    card.addEventListener('click', revealCard)
    card.setAttribute("data-character", character)
    return card
}

const loadGame = () => {

    const duplicateCharacters = [...characters, ...characters]

    const shurffleArray = duplicateCharacters.sort(() => Math.random() - 0.5)

    shurffleArray.forEach((character)=>{
        const card = createCard(character)
        grid.appendChild(card)
    })
}

const startTimer = () => {

    this.loop = setInterval(()=>{
        hour.innerHTML = h < 10 ? "0" + h : h
        minutes.innerHTML = m < 10 ? "0" + m : m
        seconds.innerHTML = s < 10 ? "0" + s : s
        if(s < 59){
            s += 1
        }else if(m < 59){
            s = 0
            m += 1
        }else if(h < 24){
            s = 0
            m = 0
            h += 1
        }else{
            alert('Acabou o tempo!')
        }
    },1000)
}

window.onload = () => {
    const playerName = localStorage.getItem('player')

    spanPlayer.innerHTML = playerName

    startTimer()
    loadGame()
}


// const startTimer = () => {
//     this.loop = setInterval(()=>{
//         const currentTime = +timer.innerHTML
//         timer.innerHTML = currentTime + 1
//     },1000)
// }