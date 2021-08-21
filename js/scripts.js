const yourVoteTo = document.querySelector('.division-1-1 span')
const place = document.querySelector('.division-1-2 span')
const label = document.querySelector('.division-1-4')
const notice = document.querySelector('.division-2')
const side = document.querySelector('.division-1-right')
const numbers = document.querySelector('.division-1-3')

let currentStage = 0
let number = ''
let whiteVote = false
let votes = []

function startStage() {
  let stage = stages[currentStage]

  let numberHTML = ''
  number = ''
  whiteVote = false

  for (let n = 0; n < stage.numbers; n++) {
    if (n === 0) {
      numberHTML += '<div class="number blink"></div>'
    } else {
      numberHTML += '<div class="number"></div>' 
    }
  }

  yourVoteTo.style.display = 'none'
  place.innerHTML = stage.title
  label.innerHTML = ''
  notice.style.display = 'none'
  side.innerHTML = ''
  numbers.innerHTML = numberHTML
}

function updateInterface() {
  let stage = stages[currentStage]
  let candidate = stage.candidates.filter((item) => {
    if (item.number === number) {
      return true
    } else {
      return false
    }
  })

  if (candidate.length > 0) {
    candidate = candidate[0]

    yourVoteTo.style.display = 'block'
    notice.style.display = 'block'
    label.innerHTML = `
      Nome: ${candidate.name}<br>
      Partido: ${candidate.party}
    `

    let photosHTML = ''

    for (let p in candidate.photos) {
      photosHTML += `
      <div class="division-1-image">
        <img src="./img/${candidate.photos[p].url}" alt="${candidate.photos[p].label}">
        ${candidate.photos[p].label}
      </div>
      `
    }

    side.innerHTML = photosHTML
  } else {
    yourVoteTo.style.display = 'block'
    notice.style.display = 'block'
    label.innerHTML = `
      <div class="big-notice blink">VOTO NULO</div>
    `
  }
}

function clicked(n) {
  let elNumber = document.querySelector('.number.blink')

  if (elNumber !== null) {
    elNumber.innerHTML = n
    number = `${number}${n}`

    elNumber.classList.remove('blink')

    if (elNumber.nextElementSibling !== null) {
      elNumber.nextElementSibling.classList.add('blink')
    } else {
      updateInterface()
    }
  }
}

function white() {
  if (number === '') {
    whiteVote = true

    yourVoteTo.style.display = 'block'
    notice.style.display = 'block'
    numbers.innerHTML = ''
    label.innerHTML = `
      <div class="big-notice blink">VOTO EM BRANCO</div>
    `
  } else {
    alert('Para votar em branco, não digite nenhum número!')
  }
}

function mend() {
  startStage()
}

function confirm() {
  let stage = stages[currentStage]
  let confirmedVote = false

  if (whiteVote === true || number.length === stage.numbers) {
    confirmedVote = true
  }

  if (confirmedVote) {
    currentStage++
    if (stages[currentStage] !== undefined) {
      startStage()
    } else {
      yourVoteTo.style.display = 'none'
      notice.style.display = 'none'
      side.innerHTML = ''
      place.innerHTML = ''
      numbers.innerHTML = ''
      document.querySelector('.screen').innerHTML = '<div class="gig-notice blink">FIM!</div>'
    }
  }
}

startStage()
