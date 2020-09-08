const WIDTH = 10,
  BOARD_SIZE = 100,
  SQUARES = [], // Aquí guardamos todos los divs de cada uno de los SQUARES
  BOMB_AMOUNT = 20

const gameContainer = document.querySelector('.game-container')

let gameActive = true,
  flags = 0

function createBoard() {
  // Generamos bombas de forma aleatoria
  const bombsArr = Array(BOMB_AMOUNT).fill(true)
  const noBombsArr = Array(BOARD_SIZE - BOMB_AMOUNT).fill(false)
  const gameArr = [...noBombsArr, ...bombsArr].sort(() => Math.random() - 0.50)

  for(let i = 0; i < BOARD_SIZE; i++) {
    const square = document.createElement('div')
    square.setAttribute('id', i)
    square.className = (gameArr[i]) ? 'bomb': ''
    gameContainer.appendChild(square) 
    SQUARES.push(square)

    square.addEventListener('click', event => handleCellClick(event.target))
    square.addEventListener('contextmenu', event => {
      event.preventDefault()
      addFlag(event.target)
    })
  }

  // Agregamos los números que nos muestran la cantidad de bombas
  for(let i = 0; i < BOARD_SIZE; i++) {
    let total = 0
    const isInLeftSide = (i % WIDTH) === 0 // Esto nos ayuda a ver si esta en el principio del lado izquierdo. Por ejemplo: 0, 10, 20 etc.
    const isInRightSide = (i % WIDTH) === (WIDTH - 1) // Esta constante nos ayuda a ver si esta al final del lado derecho, ejemplo: 9, 19, 29 etc
    if(SQUARES[i].className === '') {
      if(i > 0 && !isInLeftSide && SQUARES[i - 1].classList.contains('bomb')) total++ // Izquierda
      if(i > 9 && !isInRightSide && SQUARES[i + 1 - WIDTH].classList.contains('bomb')) total++ // Esquina superior derecha
      if(i > 10 && SQUARES[i - WIDTH].classList.contains('bomb')) total++ // Arriba
      if(i > 11 && !isInLeftSide && SQUARES[i - 1 - WIDTH].classList.contains('bomb')) total++ // Esquina superior izquierda
      if(i < 98 && !isInRightSide && SQUARES[i + 1].classList.contains('bomb')) total++ // Derecha
      if(i < 90 && !isInLeftSide && SQUARES[i - 1 + WIDTH].classList.contains('bomb')) total++ // Esquina inferior izquierda
      if(i < 88 && !isInRightSide && SQUARES[i + 1 + WIDTH].classList.contains('bomb')) total++ // Esquina inferior derecha
      if(i < 89 && SQUARES[i + WIDTH].classList.contains('bomb')) total++ // Abajo
      SQUARES[i].setAttribute('data-total', total)
      console.log(SQUARES[i])
    }
  }
}

createBoard()

function handleCellClick(square) {
  if(!gameActive) return
  if(square.classList.contains('checked')) return
  if(square.classList.contains('bomb')) {
    gameOver(square)
  } else {
    let total = square.getAttribute('data-total')
    if(total != 0) {
      square.className = 'checked'
      square.innerText = total
      addColorText(square, total)
    } else {
      checkNeighbordSquares(square, square.id)
      square.className = 'checked'
    }
  }
}

function addColorText(square, total) {
  let color = ''
  if(total == 1) {
    color = 'txt-blue'
  } else if (total == 2) {
    color = 'txt-green'
  } else if (total == 3) {
    color = 'txt-red'
  } else if (total == 4) {
    color = 'txt-purple'
  }
  square.classList.add(color)
}

function checkNeighbordSquares(square, currentId) {
  const isInLeftSide = (currentId % WIDTH) === 0 // Esto nos ayuda a ver si esta en el principio del lado izquierdo. Por ejemplo: 0, 10, 20 etc.
  const isInRightSide = (currentId % WIDTH) === (WIDTH - 1) // Esta constante nos ayuda a ver si esta al final del lado derecho, ejemplo: 9, 19, 29 etc

  setTimeout(() => {
    if(currentId > 0 && !isInLeftSide ) {
      const newId = SQUARES[parseInt(currentId) - 1].id,
        newSquare = document.getElementById(newId)
        handleCellClick(newSquare)
    }
    if(currentId > 9 && !isInRightSide) {
      const newId = SQUARES[parseInt(currentId) + 1 - WIDTH].id
      newSquare = document.getElementById(newId)
      handleCellClick(newSquare)
    }
    if(currentId > 10) {
      const newId = SQUARES[parseInt(currentId) - WIDTH].id
      newSquare = document.getElementById(newId)
      handleCellClick(newSquare)
    }
    if(currentId > 11 && !isInLeftSide) {
      const newId = SQUARES[parseInt(currentId) - 1 - WIDTH].id
      newSquare = document.getElementById(newId)
      handleCellClick(newSquare)    }
    if(currentId < 98 && !isInRightSide) {
      const newId = SQUARES[parseInt(currentId) + 1].id
      newSquare = document.getElementById(newId)
      handleCellClick(newSquare)
    }
    if(currentId < 90 && !isInLeftSide) {
      const newId = SQUARES[parseInt(currentId) - 1 + WIDTH].id
      newSquare = document.getElementById(newId)
      handleCellClick(newSquare)
    }
    if(currentId < 88 && !isInRightSide) {
      const newId = SQUARES[parseInt(currentId) + 1 + WIDTH].id
      newSquare = document.getElementById(newId)
      handleCellClick(newSquare)
    }
    if(currentId < 89) {
      const newId = SQUARES[parseInt(currentId) + WIDTH].id
      newSquare = document.getElementById(newId)
      handleCellClick(newSquare)
    }
  }, 100)
}

function gameOver() {
  alert('Ooops... hay una bomba justo ahí.')
  gameActive = false
  for(const square of SQUARES) {
    if(square.classList.contains('bomb')) {
      square.innerHTML = '&#128163;'
    }
  }
}

function addFlag(square) {
  console.log('jejejeje')
  if(!gameActive) return
  if(!square.classList.contains('checked') && (flags < BOMB_AMOUNT)) {
    if(!square.classList.contains('flag')) {
      square.classList.add('flag')
      square.innerHTML = '&#9873;'
      flags++
      handleFlags()
    } else {
      square.classList.remove('flag')
      square.innerHTML = ''
      flags--
    }
  }
}

function handleFlags() {
  let matches = 0
  for(const square of SQUARES) {
    if(square.classList.contains('flag') && square.classList.contains('bomb')) {
      matches++
    }
    if(matches === BOMB_AMOUNT) {
      gameActive = false
      alert('Eres el ganador!!!!')
      break
    }
  }
}